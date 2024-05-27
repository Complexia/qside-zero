"use client";



import { IconDiscord, IconHamburger, IconSidebar } from '@/components/ui/icons'
import Link from 'next/link';
import { LoginButtonGoogle } from '@/components/auth/googleLogin';
import { useAuth } from '@/components/providers/authProvider';
import { invoke } from "@tauri-apps/api/core";
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from "react";
import SliderItem from './sliderItem';
interface MetaData {
    type: string;
    image: string;
    title: string;
    url: string;
    description: string;
}

const Slider = () => {
    // array of user.social will be fetch from server
    let socialUser = [
        {
            type: "Github",
            url: "https://github.com/vanha777",
            image: "https://avatars.githubusercontent.com/u/107760796?v=4?s=400",
            description: "An enigmatic Australian dev with an unconventional journey, obsessed with tech, transparency, and integrity. - vanha777",
            icon: "https://github.com/fluidicon.png"
        },
        {
            type: "Linkedin",
            url: "https://www.linkedin.com/in/copycodervanjiro/",
            image: "",
            description: "",
            icon: "https://static.licdn.com/aero-v1/sc/h/al2o9zrvru7aqj8e1x2rzsrca"
        },
        {
            type: "Tiktok",
            url: "https://www.tiktok.com/@eazyhomeiot",
            image: "",
            description: "",
            icon: ""
        },
        {
            type: "Instagram",
            url: "https://www.instagram.com/eazyhomeiot",
            image: "",
            description: "",
            icon: ""
        },
        {
            type: "My page",
            url: "https://master--stellular-stroopwafel-36ea55.netlify.app",
            image: "",
            description: "",
            icon: ""
        },
    ];
    //end.
    const fetchSocial = async () => {
        console.log("fetching user from top level")
    }
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
    const callScrapWeb = async (type: String, url: String) => {
        try {
            const x: MetaData = await invoke("scrap_web", { type, url });
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
            {socialUser.map((user) => (
                <SliderItem socialUser={user} fetchSocial={fetchSocial} />
            ))}
            {/* <div className="carousel-item">
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
                            <button onClick={() => callScrapWeb("tiktok", "https://www.tiktok.com/@eazyhomeiot")} className="btn btn-primary">Learn now!</button>
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
                            <button onClick={() => callScrapWeb("ing", "https://www.instagram.com/eazyhomeiot")} className="btn btn-primary">Learn now!</button>
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
                            <button onClick={() => callScrapWeb("Linkedin", "https://www.linkedin.com/in/copycodervanjiro/")} className="btn btn-primary">Learn now!</button>
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
                            <button onClick={() => callScrapWeb("git", "https://github.com/vanha777")} className="btn btn-primary">Learn now!</button>
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
            </div> */}
        </div>
    )
}

export default Slider;