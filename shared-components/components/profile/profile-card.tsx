"use client";


import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IconDiscord, IconGitHub, IconInstagram, IconTelegram, IconX } from "../ui/icons";
import { createClient } from "@/utils/supabase/client";
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

const SliderItem = () => {

    // const public_user = useAuth();

    // const socialUser = {

    //     type: "Github",
    //     url: "https://github.com/vanha777",
    //     image: "https://avatars.githubusercontent.com/u/107760796?v=4?s=400",
    //     description: "An enigmatic Australian dev with an unconventional journey, obsessed with tech, transparency, and integrity. - vanha777",
    //     icon: "https://github.com/fluidicon.png"

    // }

    // let username = getUsernameFromUrl(socialUser.url);

    // useEffect(() => {
    //     const supabase = createClient();
        
    // }, []);
    const [socialUser, setSocialUser] = useState({

        type: "Github",
        url: "https://github.com/vanha777",
        image: "https://avatars.githubusercontent.com/u/107760796?v=4?s=400",
        description: "An enigmatic Australian dev with an unconventional journey, obsessed with tech, transparency, and integrity. - vanha777",
        icon: "https://github.com/fluidicon.png"

    });
    const [edit, setEdit] = useState(false);
    const [username, setUsername] = useState(getUsernameFromUrl(socialUser.url));
    // const [inputValue, setInputValue] = useState(username || "");
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);




    const fetchSocial = async (type, url) => {
        let payload = {
            entity: type,
            url: url,
        };

        let resp = await fetch("/server/scrape", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
        let response = await resp.json();
        setSocialUser(response);
        console.log("response", response)


    }

    const fetchStuff = (type) => {
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

    const icon = {
        hidden: {
            opacity: 0,
            pathLength: 0,
            fill: "rgba(255, 255, 255, 0)"
        },
        visible: {
            opacity: 1,
            pathLength: 1,
            fill: "rgba(255, 255, 255, 1)"
        }
    };

    useEffect(() => {
        setUsername(getUsernameFromUrl(socialUser.url));
    }, [socialUser.url]);



    const [iconInputValue, setIconInputValue] = useState(username);

    
    return (

        <div className="carousel-item">

            {/* <div style={{ perspective: 1000 }}>
                <motion.div
                    style={{
                        width: 300,
                        height: 150,
                        backgroundColor: 'white',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '8px',
                        fontSize: '1.5rem',
                        color: '#333',
                    }}
                    initial={{
                        opacity: 1,
                        rotateX: 0,
                        rotateY: -7,
                    }}
                    animate={{
                        opacity: 1,
                        rotateX: 0,
                        rotateY: 7,
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: 'mirror',
                        // ease: 'easeInOut',
                    }}
                >
                    Your Business Card
                </motion.div>
            </div> */}

            {/* <div className="container">
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    className="item"
                >
                    <motion.path
                        d="M0 100V0l50 50 50-50v100L75 75l-25 25-25-25z"
                        variants={icon}
                        initial="hidden"
                        animate="visible"
                        transition={{
                            default: { duration: 2, ease: "easeInOut" },
                            fill: { duration: 2, ease: [1, 0, 0.8, 1] }
                        }}
                    />
                </motion.svg>
            </div> */}

            <div className="card w-96 glass">



                <figure className='px-3 pt-3'>
                    <div className="card w-96 shadow-xl p-2 indicator">

                        <div style={{ perspective: 1000 }}>
                            <motion.div
                                style={{
                                    // width: 300,
                                    // height: 150,
                                    // backgroundColor: 'white',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '8px',
                                    fontSize: '1.5rem',
                                    color: '#333',
                                }}
                                initial={{
                                    opacity: 1,
                                    rotateX: -3,
                                    rotateY: -7,
                                }}
                                animate={{
                                    opacity: 1,
                                    rotateX: 3,
                                    rotateY: 7,
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    repeatType: 'mirror',
                                    // ease: 'easeInOut',
                                }}
                            >

                                <span className="indicator-item indicator-top indicator-start">
                                    <img className="" src="qside-logo-trans.png" alt="car!" style={{ width: '100px', height: '25px' }} />
                                </span>

                                <img className=" card w-full" src="http://localhost:3000/opengraph-image.png" alt="car!" />
                                {/* <img className=" card w-full" src="qside-logo.png" alt="car!" /> */}


                            </motion.div>
                        </div>
                    </div>
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
                    {/* <div className=' flex flex-row justify-between items-center'>
                        {edit == false ? (
                            <a href={socialUser.url} className="link link-primary">@{username}</a>
                        ) : (
                            <input value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)} type="text" placeholder={username} className="input input-bordered input-primary w-full max-w-xs" />
                        )}
                        <img src={socialUser.icon} alt="icon" className="w-12 h-12" />
                    </div> */}

                    <div className='flex flex-row justify-between items-center'>
                        {edit === false ? (
                            <a href={socialUser.url} className="link link-primary">@{username}</a>
                        ) : (
                            <input
                                value={iconInputValue}
                                onChange={(e) => setIconInputValue(e.target.value)}
                                type="text"
                                placeholder={username}
                                className="input input-bordered input-primary w-full max-w-xs"
                            />
                        )}
                        <div className="flex flex-row space-x-2">

                            <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                                <IconGitHub className="w-6 h-6" />
                            </a>

                            <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                                <IconDiscord className="w-6 h-6" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <IconInstagram className="w-6 h-6" />
                            </a>
                            <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
                                <IconTelegram className="w-6 h-6" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <IconX className="w-6 h-6" />
                            </a>





                            {/* {menuOpen && (
                                <div className="absolute top-0 translate-x-full flex flex-row space-x-2 bg-white border border-gray-300 rounded-lg shadow-lg p-2">

                                    <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                                        <IconDiscord className="w-12 h-12" />
                                    </a>
                                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                        <IconInstagram className="w-12 h-12" />
                                    </a>
                                    <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
                                        <img src="/path/to/telegram-icon.png" alt="Telegram" className="w-8 h-8" />
                                    </a>
                                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                        <img src="/path/to/twitter-icon.png" alt="Twitter" className="w-8 h-8" />
                                    </a>
                                </div>
                            )} */}
                        </div>
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
                            <button onClick={() => fetchStuff(socialUser.type)} className="btn btn-primary">Sync</button>
                        ) : (
                            <button onClick={() => fetchStuff(socialUser.type)} className="btn btn-primary">Edit</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SliderItem;