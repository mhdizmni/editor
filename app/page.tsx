'use client'

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

import { SignInButton, useAuth, useUser } from '@clerk/clerk-react';

import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import JsonView from "@uiw/react-json-view";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
// import Editor from "@/components/@editor/core/editor";

export default function Home() {
    const Editor = useMemo(() => dynamic(() => import("@/components/@editor/core/editor"), { ssr: false }), []);

    const { isSignedIn, isLoaded } = useAuth();
    const { user } = useUser();
    const [content, setContent] = useState<JSON | null>(null);
    return (
        <main
            className={`flex min-h-screen md:flex-row flex-col items-center md:items-start justify-start md:justify-center gap-2 mt-32 mb-10 m-4 p-2 rounded ${isSignedIn && isLoaded && "border shadow"}`}
        >
            <div className="md:flex-1 w-full min-h-96">
                    <Editor
                        initialContent="<p>Hello World! 🌎️</p>"
                        // editable={false}
                        onChange={(value) => {
                            setContent(JSON.parse(value))
                        }}
                    />
                </div>
                <Separator orientation="vertical" />
                <Separator orientation="horizontal" className="md:hidden" />
                <div className="md:flex-1 w-full min-h-96 bg-neutral-100/50">
                    {content ? (
                        <JsonView value={content} />
                    ): "👈 Write something to see the final JSON output!"}
                </div>
            {/* {!isLoaded && (
                <Spinner className='h-5 w-5 dark:text-white' />
            )}
            {isSignedIn && isLoaded && (
                <>
                <div className="md:flex-1 w-full min-h-96">
                    <Editor
                        onChange={(value) => {
                            setContent(JSON.parse(value))
                        }}
                    />
                </div>
                <Separator orientation="vertical" />
                <Separator orientation="horizontal" className="md:hidden" />
                <div className="md:flex-1 w-full min-h-96 bg-neutral-100/50">
                    {content ? (
                        <JsonView value={content} />
                    ): "👈 Write something to see the final JSON output!"}
                </div>
                </>
            )}
            {!isSignedIn && isLoaded && (
                <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-muted-foreground">
                        Please sign in to view the editor
                    </p>
                    <Button asChild>
                        <SignInButton redirectUrl='/' />
                    </Button>
                </div>
            )} */}
        </main>
    )
}
