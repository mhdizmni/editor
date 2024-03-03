import { S3 } from "@/lib/r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { name, size, type, gate, id, section } = body;

    if (!name || !size || !type || !gate) {
        return new NextResponse("پارامترهای ارسالی صحیح نمی\u200Cباشد", {status: 400});
    }

    // todo: return error for id and section

    // todo: send request to api and return the permission along with the path
    const signableHeaders = new Set<string>();
    signableHeaders.add('content-length');
    const url = await getSignedUrl(S3, new PutObjectCommand(
            {
                Bucket: 'core',
                Key: name, // todo: add "path" from above
                ContentLength: size // chears: Set exact size in bytes to avoid overusage, it let us prevent users from sending for examlple a request to upload 100kb but upload 200kb

            }
        ),
        { 
            expiresIn: 3600,
            signableHeaders
        }
    );
    return NextResponse.json({
        url: url,
        durl: `https://file.mitism.link/${name}` // todo: hardcode the url in env
    }, {status: 200});
}