"use client"

import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from '@/components/providers/authProvider';
import { LoginButtonGoogle } from "../auth/googleLogin";

const Navbar = () => {
    const handleSignOut = async () => {

        const supabase = createClient();
        await supabase.auth.signOut();
    }
    //@ts-ignore
    const { user } = useAuth();

    return (

        <nav className="w-full flex justify-center bg-base-600">
            <div className="w-screen flex justify-between items-center p-3 ml-4 text-sm">
                <Link className="" href="/">
                    <div className="w-full flex flex-row justify-center items-center">

                        <Image height="200" width="200" src="/assets/qsidelogo.png"
                            alt="logo">

                        </Image>


                    </div>
                </Link>

                <div className="flex flex-row  space-x-8">
                    <button className="py-2 hover:bg-btn-background-hover rounded-md px-2 ">
                        Connections
                    </button>

                    <button className="py-2 hover:bg-btn-background-hover rounded-md px-2 ">
                        Activity
                    </button>



                    
                        {/* <div>
                            hello

                        </div> */}
                        {!user ? (

                            <LoginButtonGoogle />


                        ) : (

                            <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover" onClick={() => handleSignOut()}>Sign out</button>

                        )}
                    






                </div>
            </div>
        </nav>

    );
}

export default Navbar