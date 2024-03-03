'use client'
import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { SignInButton, SignOutButton, useUser } from '@clerk/clerk-react';
import { useConvexAuth } from 'convex/react';

export default function Home() {
    const { isLoading, isAuthenticated } = useConvexAuth();
    const { user } = useUser();
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {/* {isLoading && (
                <Spinner className='h-5 w-5 dark:text-white' />
            )}
            {isAuthenticated && !isLoading && (
                <div className='flex flex-col items-center justify-center'>
                    <div>hi <b>{user?.firstName}</b></div>
                    <Button variant="outline" asChild>
                        <SignOutButton />
                    </Button>
                </div>
            )}
            {!isAuthenticated && !isLoading && (
                <Button asChild>
                    <SignInButton redirectUrl='/' />
                </Button>
            )} */}
            hi
        </main>
    )
}
