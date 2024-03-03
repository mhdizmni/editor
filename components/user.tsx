'use client'
import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { SignInButton, SignOutButton, useUser } from '@clerk/clerk-react';
import { useConvexAuth } from 'convex/react';

export const UserBox = () => {
    const { isLoading, isAuthenticated } = useConvexAuth();
    const { user } = useUser();

    return (
        <>
            {isLoading && (
                <Spinner className='h-5 w-5 dark:text-white' />
            )}
            {isAuthenticated && !isLoading && (
                <div className='flex items-center justify-center gap-2'>
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
            )}
        </>
    );
}