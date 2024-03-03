'use client'
import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { SignInButton, SignOutButton, useAuth, useUser } from '@clerk/clerk-react';

export const UserBox = () => {
    const { isSignedIn, isLoaded } = useAuth();
    const { user } = useUser();

    return (
        <>
            {!isLoaded && (
                <Spinner className='h-5 w-5 dark:text-white' />
            )}
            {isSignedIn && isLoaded && (
                <div className='flex items-center justify-center gap-2'>
                    <div>hi <b>{user?.firstName}</b></div>
                    <Button variant="outline" asChild>
                        <SignOutButton />
                    </Button>
                </div>
            )}
            {!isSignedIn && isLoaded  && (
                <Button asChild>
                    <SignInButton redirectUrl='/' />
                </Button>
            )}
        </>
    );
}