'use client'

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

import { SignInButton, SignOutButton, useUser } from '@clerk/clerk-react';
import { useConvexAuth } from 'convex/react';

import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';

export default function Home() {
    const Editor = useMemo(() => dynamic(() => import("@/components/editor/editor"), { ssr: false }), []);

    const { isLoading, isAuthenticated } = useConvexAuth();
    const { user } = useUser();
    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between mt-24 mb-10 m-4 p-2 rounded ${isAuthenticated && !isLoading && "border shadow"}`}
        >
            {isLoading && (
                <Spinner className='h-5 w-5 dark:text-white' />
            )}
            {isAuthenticated && !isLoading && (
                <Editor
                    onChange={() => {}}
                />
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
