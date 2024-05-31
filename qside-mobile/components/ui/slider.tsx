"use client";



import { IconDiscord, IconHamburger, IconSidebar } from '@/components/ui/icons'
import Link from 'next/link';
import { LoginButtonGoogle } from '@/components/auth/googleLogin';
import { useAuth } from '@/components/providers/authProvider';
import { invoke } from "@tauri-apps/api/core";
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from "react";
import SliderItem from './sliderItem';
import { stringify } from 'querystring';

interface MetaData {
    type: String;
    image: String;
    url: String;
    description: String;
    icon: String;
}

const Slider = () => {
    // array of user.social will be fetch from server
    const [meta, setMeta] = useState<MetaData[]>([
        {
            type: "Github",
            url: "https://github.com/vanha777",
            image: "https://avatars.githubusercontent.com/u/107760796?v=4?s=400",
            description: "An enigmatic Australian dev with an unconventional journey, obsessed with tech, transparency, and integrity. - vanha777",
            icon: "https://github.com/fluidicon.png"
        },
        {
            type: "Linkedin",
            url: "https://www.linkedin.com/in/copycodervanjiro",
            image: "https://media.licdn.com/dms/image/D5603AQH3OOu-vOLBwA/profile-displayphoto-shrink_200_200/0/1697969298484?e=2147483647&v=beta&t=PxSbFbcn0UiUGcknfYE3uVgFV9pd84-irlg58dySBEQ",
            description: "Meet the enigmatic Australian developer who&amp;#39;s making waves in the tech industry 🌊. With… · Experience: StrongRoom AI · Location: Hawthorn East · 102 connections on LinkedIn. View Patrick Ha’s profile on LinkedIn, a professional community of 1 billion members.",
            icon: "https://static.licdn.com/aero-v1/sc/h/al2o9zrvru7aqj8e1x2rzsrca"
        },
        {
            type: "Tiktok",
            url: "https://www.tiktok.com/@eazyhomeiot",
            image: "https://scontent.cdninstagram.com/v/t51.2885-19/364294734_799278335206685_8611054097134129291_n.jpg?stp=dst-jpg_s100x100&_nc_cat=104&ccb=1-7&_nc_sid=3fd06f&_nc_ohc=HiogzKidWqcQ7kNvgEKV5ZT&_nc_ht=scontent.cdninstagram.com&oh=00_AYB5gjsE1DgLDgMy0tXKgOAR8uUecYq_ytxwBfv2Tvqo8Q&oe=665AFE37",
            description: "@eazyhomeiot 49 Followers, 79 Following, 1177 Likes - Watch awesome short videos created by Eazy Home",
            icon: "http://localhost:3000/twitter-image.png"
        },
        {
            type: "Instagram",
            url: "https://www.instagram.com/eazyhomeiot",
            image: "https://scontent.cdninstagram.com/v/t51.2885-19/364294734_799278335206685_8611054097134129291_n.jpg?stp=dst-jpg_s100x100&_nc_cat=104&ccb=1-7&_nc_sid=3fd06f&_nc_ohc=HiogzKidWqcQ7kNvgEKV5ZT&_nc_ht=scontent.cdninstagram.com&oh=00_AYB5gjsE1DgLDgMy0tXKgOAR8uUecYq_ytxwBfv2Tvqo8Q&oe=665AFE37",
            description: "151 Followers, 260 Following, 372 Posts - See Instagram photos and videos from Van Ha (&#064;eazyhomeiot)",
            icon: "https://static.cdninstagram.com/rsrc.php/v3/yB/r/-7Z_RkdLJUX.png"
        },
        // {
        //     type: "My page",
        //     url: "https://master--stellular-stroopwafel-36ea55.netlify.app",
        //     image: "",
        //     description: "",
        //     icon: ""
        // },
    ]);
    // Function to update meta by type
    const updateMetaByType = (type: String, newData: Partial<MetaData>) => {
        setMeta(prevMeta => prevMeta.map(item => item.type === type ? { ...item, ...newData } : item));
    };
    // let socialUser = [
    //     {
    //         type: "Github",
    //         url: "https://github.com/vanha777",
    //         image: "https://avatars.githubusercontent.com/u/107760796?v=4?s=400",
    //         description: "An enigmatic Australian dev with an unconventional journey, obsessed with tech, transparency, and integrity. - vanha777",
    //         icon: "https://github.com/fluidicon.png"
    //     },
    //     {
    //         type: "Linkedin",
    //         url: "https://www.linkedin.com/in/copycodervanjiro",
    //         image: "",
    //         description: "",
    //         icon: "https://static.licdn.com/aero-v1/sc/h/al2o9zrvru7aqj8e1x2rzsrca"
    //     },
    //     {
    //         type: "Tiktok",
    //         url: "https://www.tiktok.com/@eazyhomeiot",
    //         image: "",
    //         description: "",
    //         icon: "http://localhost:3000/twitter-image.png"
    //     },
    //     {
    //         type: "Instagram",
    //         url: "https://www.instagram.com/eazyhomeiot",
    //         image: "",
    //         description: "",
    //         icon: ""
    //     },
    //     {
    //         type: "My page",
    //         url: "https://master--stellular-stroopwafel-36ea55.netlify.app",
    //         image: "",
    //         description: "",
    //         icon: ""
    //     },
    // ];
    //end.
    const fetchSocial = async (type, url) => {
        console.log("fetching user from top level", type, url)
        await callScrapWeb(type, url);
    }
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
            updateMetaByType(type, {
                description: x.description,
                url: x.url,
                image: x.image,
            });
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
            {meta.map((user) => (
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