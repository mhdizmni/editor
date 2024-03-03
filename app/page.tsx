'use client'

import dynamic from "next/dynamic";
import { use, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

import { SignInButton, SignOutButton, useUser } from '@clerk/clerk-react';
import { useConvexAuth } from 'convex/react';

import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import JsonView from "@uiw/react-json-view";
import { Separator } from "@/components/ui/separator";

export default function Home() {
    const Editor = useMemo(() => dynamic(() => import("@/components/editor/editor"), { ssr: false }), []);

    const { isLoading, isAuthenticated } = useConvexAuth();
    const { user } = useUser();
    const [content, setContent] = useState<JSON | null>(null);
    return (
        <main
            className={`flex min-h-screen md:flex-row flex-col items-center md:items-start justify-start md:justify-center gap-2 mt-24 mb-10 m-4 p-2 rounded ${isAuthenticated && !isLoading && "border shadow"}`}
        >
            {isLoading && (
                <Spinner className='h-5 w-5 dark:text-white' />
            )}
            {isAuthenticated && !isLoading && (
                <>
                <div className="md:flex-1 w-full">
                    <Editor
                        onChange={(value) => {
                            setContent(JSON.parse(value))
                        }}
                    />
                </div>
                <Separator orientation="vertical" />
                <Separator orientation="horizontal" className="md:hidden" />
                <div className="md:flex-1 w-full bg-neutral-100/50">
                    {content ? (
                        <JsonView value={content} />
                    ): "👈 write something!"}
                </div>
                </>
            )}
            {!isAuthenticated && !isLoading && (
                <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-muted-foreground">
                        Please sign in to view the editor
                    </p>
                    <Button asChild>
                        <SignInButton redirectUrl='/' />
                    </Button>
                </div>
            )}
        </main>
    )
}
