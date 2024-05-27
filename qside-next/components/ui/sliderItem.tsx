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
import { invoke } from "@tauri-apps/api/core";
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from "react";
interface SocialUser {
    type: string;
    image: string;
    title: string;
    url: string;
    description: string;
}

const SliderItem = ({ socialUser, fetchSocial }) => {
    const fetch = (type, url) => {
        // 
        console.log("fetch new social ", type);
    };
    // const [user, setUser] = useState<SocialUser | null>(socialUser);

    // const callScrapWeb = async (type: String, url: String) => {
    //     try {
    //         const x: MetaData = await invoke("scrap_web", { type, url });
    //         console.log("this is return from Rust-user", x);
    //         setMeta(x);
    //     } catch (error) {
    //         console.error("Error invoking greet:", error);
    //     }
    // };
    // const handleSignOut = async () => {

    //     const supabase = createClient();
    //     await supabase.auth.signOut();
    // }
    //@ts-ignore
    // const { user } = useAuth();
    return (
        // <div className="carousel-item">
        //     <div className="indicator">
        //         <div className="indicator-item indicator-middle indicator-center badge bg-0">
        //             <div className="avatar">
        //                 <div className=" w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
        //                     <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="card w-96 glass">

        //             <figure>
        //                 <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="car!" />
        //             </figure>


        //             <div className="card-body">
        //                 <h2 className="card-title">Life hack</h2>
        //                 {socialUser.description != "" ? (
        //                     <p>{socialUser.description}</p>
        //                 ) : (<p>How to park your car at your garage?</p>)
        //                 }
        //                 <div className="card-actions justify-end">
        //                     <button onClick={() => fetch("Git hub", "url")} className="btn btn-primary">Learn now!</button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div >

        <div className="carousel-item">
        <div className="card w-96 glass">
            <figure>
                <img className="w-full" src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="car!" />
            </figure>
            <div className="relative">
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                    <div className="avatar">
                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="avatar" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-body pt-16">
                <h2 className="card-title">Life hack</h2>
                {socialUser.description !== "" ? (
                    <p>{socialUser.description}</p>
                ) : (
                    <p>How to park your car at your garage?</p>
                )}
                <div className="card-actions justify-end">
                    <button onClick={() => fetch("Git hub", "url")} className="btn btn-primary">Learn now!</button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default SliderItem;