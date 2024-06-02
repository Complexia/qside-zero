"use client";

import "./style.css"
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IconDiscord, IconGitHub, IconInstagram, IconLinkedIn, IconSpinner, IconTelegram, IconX } from "../ui/icons";
import { createClient } from "@/utils/supabase/client";
import { useAuth } from "../providers/authProvider";
import { v4 as uuidv4 } from 'uuid';
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

// Mapping entity names to icon components
const iconComponents = {
    "x": IconX,
    "github": IconGitHub,
    "linkedin": IconLinkedIn,
    "instagram": IconInstagram,
    // Add other mappings as needed
};

const ProfileCard = ({ username }) => {

    // @ts-ignore
    const { public_user } = useAuth();

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
    const [socialUser, setSocialUser] = useState<any>(null);
    const [edit, setEdit] = useState(false);
    const [social_username, setSocialUsername] = useState(getUsernameFromUrl(socialUser?.url));
    // const [inputValue, setInputValue] = useState(username || "");
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [displaySocial, setDisplaySocial] = useState(public_user.primary_social);
    const [bio, setBio] = useState(public_user.bio);
    const [updating, setUpdating] = useState(false);

    const [imageChanged, setImageChanged] = useState(false);
    const [file, setFile] = useState<any>(null);


    const [imageSrc, setImageSrc] = useState<any>(`${process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL_DP}/${public_user?.image_info?.uuid}`);

    const [isInputVisible, setInputVisible] = useState(false);
    const [socialInputValue, setSocialInputValue] = useState('');
    const [socialType, setSocialType] = useState('');

    const toggleInput = (socialType) => {
        setSocialType(socialType);
        setInputVisible(!isInputVisible);
    };

    const handleInputChange = (e) => {
        setSocialInputValue(e.target.value);
    };

    const saveInput = () => {
        handleSave(socialInputValue);
        setInputVisible(false); // Hide the input field after saving
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            saveInput();
        }
    };

    const handleSave = async (url) => {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('public_users')
            .update({
                new_socials: {
                    ...public_user.new_socials,
                    [socialType]: {
                        ...public_user.new_socials[socialType],
                        url: url,
                    },
                },
            })
            .eq('id', public_user.id)
            .single();

        if (error) {
            console.error('Error updating user:', error);
            return;
        }
        console.log('Data:', data);
    };




    const handleClick = () => {
        document.getElementById('fileInput')?.click();
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event: any) {
                setImageSrc(event?.target?.result);
            };

            setFile(file);
            reader.readAsDataURL(file);
            setImageChanged(true);
            handleImageUpload();
        }


    };

    const handleImageUpload = async () => {
        const uuid = uuidv4();
        const supabase = createClient();

        const old_image_url = public_user?.image_info?.uuid;

        if (file) {


            const { data, error } = await supabase
                .storage
                .from('profile-pictures')
                .upload(`${uuid}.png`, file, {
                    cacheControl: '3600',
                    upsert: true
                })

            if (error) {
                return false
            }

            let image_info = {
                "uuid": uuid + ".png",
            }

            const { data: data1, error: error1 } = await supabase
                .from('public_users')
                .update({
                    image_info: image_info
                })
                .eq('id', public_user.id);

            if (error1) {
                // Handle error
                console.error('Error updating user:', error1);
                return;
            }

            const { data: one, error: two } = await supabase
                .storage
                .from('profile-pictures')
                .remove([`${old_image_url}`])

        }

    }




    // const fetchSocial = async (type, url) => {
    //     let payload = {
    //         entity: type,
    //         url: url,
    //     };

    //     let resp = await fetch("/server/scrape", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(payload),
    //     })
    //     let response = await resp.json();
    //     setSocialUser(response);
    //     console.log("response", response)


    // }

    const saveBio = async () => {
        setUpdating(true);
        const supabase = createClient();
        const { data, error } = await supabase
            .from('public_users')
            .update({
                bio: bio,
            })
            .eq('id', public_user.id)
            .single();

        if (error) {
            console.log("error", error);
        } else {
            console.log("data", data);
        }
        setEdit(false);
        setUpdating(false);
    }

    // useEffect(() => {

    //     const fetchSocialUse = async (type, url) => {
    //         setLoading(true);
    //         let payload = {
    //             entity: type,
    //             url: url,
    //         };

    //         let resp = await fetch("/server/scrape", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(payload),
    //         })
    //         let response = await resp.json();
    //         setSocialUser(response);
    //         setLoading(false);
    //         console.log("response", response)


    //     }

    //     console.log(public_user.new_socials[public_user.primary_social]?.url);

    //     fetchSocialUse(displaySocial, public_user.new_socials[displaySocial]?.url);
    // }, [displaySocial]);

    // const fetchStuff = (type) => {
    //     if (edit == false) {
    //         setEdit(true);
    //         return;
    //     } else if (edit == true) {
    //         let url = getBaseUrl(socialUser.url) + inputValue;
    //         console.log("input value", inputValue);
    //         console.log("fetch new social ", type);
    //         console.log("url ", url);
    //         fetchSocial(type, url)
    //         setEdit(false);
    //     }
    // };

    // const icon = {
    //     hidden: {
    //         opacity: 0,
    //         pathLength: 0,
    //         fill: "rgba(255, 255, 255, 0)"
    //     },
    //     visible: {
    //         opacity: 1,
    //         pathLength: 1,
    //         fill: "rgba(255, 255, 255, 1)"
    //     }
    // };

    // useEffect(() => {
    //     setSocialUsername(getUsernameFromUrl(socialUser.url));
    // }, [socialUser.url]);



    // const [iconInputValue, setIconInputValue] = useState(social_username || "");


    if (loading) {
        return (
            <div className="card w-96 glass">
                <div className="card w-96 shadow-xl p-2 indicator">
                    <div className="skeleton h-32 w-96"></div>
                </div>
            </div>
        );
    }


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

                                <span className="indicator-item indicator-top indicator-start mt-4 ml-10">
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
                                <input type="file" id="fileInput" className="hidden" onChange={handleFileSelect} />
                                <a onClick={handleClick} className="cursor-pointer">
                                    <img src={imageSrc} alt="avatar" />
                                </a>



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

                        <a href="#" className="link link-primary">@{public_user.username}</a>


                        <div className="flex flex-row space-x-2">
                            {Object.entries(public_user.new_socials).map(([key, value]) => {
                                const IconComponent = iconComponents[key];
                                return IconComponent ? (
                                    <div key={key}>
                                        <button
                                            className={edit ? 'subtleRotate' : ''}
                                            onClick={() => {
                                                setDisplaySocial(key);
                                                toggleInput(key);
                                            }}
                                            rel="noopener noreferrer"
                                        >
                                            <IconComponent className="w-6 h-6" />
                                        </button>
                                        {isInputVisible && (
                                            <div className="mt-2 flex items-center">
                                                <input
                                                    type="text"
                                                    // @ts-ignore
                                                    placeholder={value.url}
                                                    value={socialInputValue}
                                                    onChange={handleInputChange}
                                                    onKeyPress={handleKeyPress}
                                                    className="border p-1 mr-2"
                                                />
                                                <button onClick={() => saveInput()}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : null;
                            })}
                        </div>
                    </div>


                    <div className="">
                        {edit == false ? (
                            <h3 className="mt-6 text-sm font-medium text-primary">{bio}</h3>

                        ) : (
                            <textarea
                                value={public_user.bio}
                                onChange={(e) => setBio(e.target.value)}
                                placeholder={public_user.bio}
                                className="flex textarea min-h-24 w-full max-w-xs mt-2 resize-none text-primary bg-base-100 border border-base-200 rounded-md p-2 focus:border-primary focus:bg-base-200 focus:text-primary"
                            />


                        )}

                    </div>


                    <div className="flex justify-end text-primary">
                        {edit == true ? (
                            updating ? (
                                <IconSpinner className="w-6 h-6 animate-spin" />
                            ) : (
                                <button onClick={() => saveBio()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                    </svg>
                                </button>

                            )

                        ) : (
                            <div className="flex justify-end mt-auto text-primary" id="settings">
                                <button onClick={() => setEdit(true)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                                        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
                                        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard;