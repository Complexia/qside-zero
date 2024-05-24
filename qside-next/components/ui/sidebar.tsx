"use client";


import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet'
import { IconDiscord, IconHamburger, IconSidebar } from '@/components/ui/icons'
import Link from 'next/link';
import { LoginButtonGoogle } from '@/components/auth/googleLogin';
import { useAuth } from '@/components/providers/authProvider'; 

import { createClient } from '@/utils/supabase/client';

const Sidebar = () => {

    const handleSignOut = async () => {
        
        const supabase = createClient();
        await supabase.auth.signOut();
    }
    //@ts-ignore
    const { user } = useAuth();
    return (
        <div className="">

            <Sheet>
                <SheetTrigger asChild>
                    <button className=" p-0">
                        <IconHamburger className="h-12 w-12" />
                        <span className="sr-only">Toggle Sidebar</span>
                    </button>
                </SheetTrigger>
                <SheetContent className="inset-y-0 flex h-auto w-[300px] flex-col p-0">
                    <Link href="/">
                        <SheetHeader className="p-4">
                            <SheetTitle className="text-sm">Home</SheetTitle>
                        </SheetHeader>
                    </Link>

                    <Link href="/qrmagic">
                        <SheetHeader className="p-4">
                            <SheetTitle className="text-sm">Connect</SheetTitle>
                        </SheetHeader>
                    </Link>

                    <Link href="/connections">
                        <SheetHeader className="p-4">
                            <SheetTitle className="text-sm">Connections</SheetTitle>
                        </SheetHeader>
                    </Link>

                    {!user ? (
                        <SheetHeader className="p-4">
                            <SheetTitle className="text-sm">
                                <LoginButtonGoogle />
                            </SheetTitle>
                        </SheetHeader>

                    ):(
                        <SheetHeader className="p-4">
                            <SheetTitle className="text-sm">
                                <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover" onClick={() => handleSignOut()}>Sign out</button>
                            </SheetTitle>
                        </SheetHeader>
                    )}





                </SheetContent>

            </Sheet>
        </div>
    )
}

export default Sidebar;