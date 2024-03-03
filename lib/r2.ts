import { S3Client } from "@aws-sdk/client-s3";

// todo: add creds to env file
export const S3 = new S3Client({
    region: "auto",
    endpoint: process.env.CLOUDFLARE!,
    credentials: {
        accessKeyId: process.env.CF_ACCESS_KEY!,
        secretAccessKey: process.env.CF_SECRET_ACCESS_KEY!,
    },
});