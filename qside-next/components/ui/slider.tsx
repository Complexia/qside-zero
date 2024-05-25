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
interface MetaData {
    type: string;
    image: string;
    title: string;
    url: string;
    description: string;
}

const Slider = () => {
    const [meta, setMeta] = useState<MetaData | null>(null);
    // this is just for testing
    const [backend, setBackend] = useState("");
    const callGreet = async (name) => {
        try {
            const x: string = await invoke("greet", { name });
            setBackend(x);
        } catch (error) {
            console.error("Error invoking greet:", error);
        }
    };
    // end.
    const callScrapWeb = async (url) => {
        try {
            const x: MetaData = await invoke("scrap_web", { url });
            console.log("this is return from Rust-user", x);
            setMeta(x);
        } catch (error) {
            console.error("Error invoking greet:", error);
        }
    };
    const handleSignOut = async () => {

        const supabase = createClient();
        await supabase.auth.signOut();
    }
    //@ts-ignore
    const { user } = useAuth();
    return (
        <div className="flex carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box">
            <div className="carousel-item">
                <div className="card w-96 glass">
                    <figure>
                        <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="car!" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Life hack</h2>
                        {backend != "" ? (
                            <p>{backend}</p>
                        ) : (<p>How to park your car at your garage?</p>)
                        }
                        <div className="card-actions justify-end">
                            <button onClick={() => callGreet("Oh Dear")} className="btn btn-primary">Learn now!</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="carousel-item">
                <div className="card w-96 glass">
                    <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="car!" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Life hack</h2>
                        {meta != null ? (
                            <p>{JSON.stringify(meta)}</p>
                        ) : (<p>How to park your car at your garage?</p>)
                        }
                        <div className="card-actions justify-end">
                            <button onClick={() => callScrapWeb("https://www.tiktok.com/@eazyhomeiot")} className="btn btn-primary">Learn now!</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="carousel-item">
                <div className="card w-96 glass">
                    <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="car!" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Life hack</h2>
                        <p>How to park your car at your garage?</p>
                        <div className="card-actions justify-end">
                            <button onClick={() => callGreet("Oh Dear")} className="btn btn-primary">Learn now!</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="carousel-item">
                <div className="card w-96 glass">
                    <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="car!" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Life hack</h2>
                        <p>How to park your car at your garage?</p>
                        <div className="card-actions justify-end">
                            <button onClick={() => callGreet("Oh Dear")} className="btn btn-primary">Learn now!</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="carousel-item">
                <div className="card w-96 glass">
                    <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="car!" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Life hack</h2>
                        <p>How to park your car at your garage?</p>
                        <div className="card-actions justify-end">
                            <button onClick={() => callGreet("Oh Dear")} className="btn btn-primary">Learn now!</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="carousel-item">
                <div className="card w-96 glass">
                    <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="car!" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Life hack</h2>
                        <p>How to park your car at your garage?</p>
                        <div className="card-actions justify-end">
                            <button onClick={() => callGreet("Oh Dear")} className="btn btn-primary">Learn now!</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="carousel-item">
                <div className="card w-96 glass">
                    <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="car!" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Life hack</h2>
                        <p>How to park your car at your garage?</p>
                        <div className="card-actions justify-end">
                            <button onClick={() => callGreet("Oh Dear")} className="btn btn-primary">Learn now!</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // <div className="card w-96 glass">
        //     <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="car!" /></figure>
        //     <div className="card-body">
        //         <h2 className="card-title">Life hack</h2>
        //         <p>How to park your car at your garage?</p>
        //         <div className="card-actions justify-end">
        //             <button className="btn btn-primary">Learn now!</button>
        //         </div>
        //     </div>
        // </div>
    )
}

export default Slider;