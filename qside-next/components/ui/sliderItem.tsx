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
const getUsernameFromUrl = (url) => {
    if (!url) return "";
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1];
};

const getBaseUrl = (url) => {
    if (!url) return "";
    const urlParts = url.split('/');
    if (url.includes("linkedin.com")) {
        return urlParts.slice(0, 4).join('/') + '/';
    } else if (url.includes("github.com")) {
        return urlParts.slice(0, 3).join('/') + '/';
    } else {
        return urlParts.slice(0, 3).join('/') + '/';
    }
};

const SliderItem = ({ socialUser, fetchSocial }) => {
    // let username = getUsernameFromUrl(socialUser.url);
    const [edit, setEdit] = useState(false);
    const [username, setUsername] = useState(getUsernameFromUrl(socialUser.url));
    // const [inputValue, setInputValue] = useState(username || "");
    const [inputValue, setInputValue] = useState("");

    const fetch = (type) => {
        if (edit == false) {
            setEdit(true);
            return;
        } else if (edit == true) {
            let url = getBaseUrl(socialUser.url) + inputValue;
            console.log("input value", inputValue);
            console.log("fetch new social ", type);
            console.log("url ", url);
            fetchSocial(type, url)
            setEdit(false);
        }
    };

    useEffect(() => {
        setUsername(getUsernameFromUrl(socialUser.url));
    }, [socialUser.url]);
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
                    <img className="w-full" src="http://localhost:3000/opengraph-image.png" alt="car!" />
                </figure>
                <div className="relative">
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                        <div className="avatar">
                            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                {socialUser.image !== "" ? (
                                    <a href={socialUser.url}>
                                        <img src={socialUser.image} alt="avatar" />
                                    </a>
                                ) : (
                                    <div className="skeleton w-32 h-32"></div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body pt-16">
                    <div className=' flex flex-row justify-between items-center'>
                        {edit == false ? (
                            <a href={socialUser.url} className="link link-primary">@{username}</a>
                        ) : (
                            <input value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)} type="text" placeholder={username} className="input input-bordered input-primary w-full max-w-xs" />
                        )}
                        <img src={socialUser.icon} alt="icon" className="w-12 h-12" />
                    </div>

                    {socialUser.description !== "" ? (
                        <textarea className="flex textarea" placeholder={socialUser.description}></textarea>

                    ) : (
                        <div className="flex flex-col gap-4">
                            <div className="skeleton h-4 w-20"></div>
                            <div className="skeleton h-4 w-28"></div>
                        </div>
                    )}
                    <div className="card-actions justify-end">
                        {edit == true ? (
                            <button onClick={() => fetch(socialUser.type)} className="btn btn-primary">Sync</button>
                        ) : (
                            <button onClick={() => fetch(socialUser.type)} className="btn btn-primary">Edit</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SliderItem;