"use client";

import React, { useEffect, useState } from 'react';
import { IconDiscord, IconInstagram, IconMail, IconTelegram, IconX } from '../ui/icons';
import "./style.css"
import { createClient } from '@/utils/supabase/client';
import { useAuth } from '../providers/authProvider';
import { v4 as uuidv4 } from 'uuid'

function ProfileCard() {

    // @ts-ignore
    let { public_user } = useAuth();

    
    let userFromResponse: any = null;

    useEffect(() => {
        let session_key = window.localStorage.getItem('session_key');
        const fetchUser = async () => {



            if (public_user) {
                userFromResponse = public_user;
            }
            else {
                const supabase = createClient();

                const { data: non_user_session } = await supabase.from('sessions').select('*').eq('session_key', session_key).single();
                const { data: non_user } = await supabase.from('non_users').select('*').eq('username', non_user_session?.username).single();

                userFromResponse = non_user;

            }

            setUser(userFromResponse);
            setUsername(userFromResponse?.username);
            setEmail(userFromResponse?.socials?.email?.username);
            setDiscord(userFromResponse?.socials?.discord?.username);
            setX(userFromResponse?.socials?.x?.username);
            setTelegram(userFromResponse?.socials?.telegram?.username);
            setInstagram(userFromResponse?.socials?.instagram?.username);

            setEmailUrl(userFromResponse?.socials?.email?.url);
            setDiscordUrl(userFromResponse?.socials?.discord?.url);
            setXUrl(userFromResponse?.socials?.x?.url);
            setTelegramUrl(userFromResponse?.socials?.telegram?.url);
            setInstagramUrl(userFromResponse?.socials?.instagram?.url);

            setImageSrc(`${process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL_DP}/${userFromResponse?.image_info?.uuid}`);

            setLoading(false);

        }

        fetchUser();

    }, [])

    // // @ts-ignore
    // // let { public_user } = useAuth();
    // // let user = public_user;
    // console.log("public_user", public_user)
    const [isFlipped, setIsFlipped] = useState(false);
    // const socials = user?.socials;
    const [user, setUser] = useState<any>();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState<any>();
    const [discord, setDiscord] = useState<any>();
    const [x, setX] = useState<any>();
    const [telegram, setTelegram] = useState<any>();
    const [instagram, setInstagram] = useState<any>();

    const [emailUrl, setEmailUrl] = useState<any>()
    const [discordUrl, setDiscordUrl] = useState<any>()
    const [xUrl, setXUrl] = useState<any>()
    const [telegramUrl, setTelegramUrl] = useState<any>()
    const [instagramUrl, setInstagramUrl] = useState<any>()

    const [alterMailUrl, setAlterMailUrl] = useState<any>(false);
    const [alterDiscordUrl, setAlterDiscordUrl] = useState<any>(false);
    const [alterXUrl, setAlterXUrl] = useState<any>(false);
    const [alterTelegramUrl, setAlterTelegramUrl] = useState<any>(false);
    const [alterInstagramUrl, setAlterInstagramUrl] = useState<any>(false);

    const [imageChanged, setImageChanged] = useState(false);
    const [file, setFile] = useState<any>(null);


    const [imageSrc, setImageSrc] = useState<any>(`${process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL_DP}/${user?.image_info?.uuid}`);



    const [loading, setLoading] = useState(false);

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
        }


    };

    const handleImageUpload = async () => {
        const uuid = uuidv4();
        const supabase = createClient();

        const old_image_url = user?.image_info?.uuid;

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
                .eq('id', user.id);

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

    // {
    //     "email": {
    //         "username": "complexia701@gmail.com",
    //             "url": "complexia701@gmail.com"
    //     },
    //     "discord": {
    //         "username": "ComplexiaSC",
    //             "url": "https://discord.com/ComplexiaSC"
    //     },
    //     "x": {
    //         "username": "@ComplexiaSC",
    //             "url": "https://x.com/ComplexiaSC"
    //     },
    //     "telegram": {
    //         "username": "@accelerateinfinity",
    //             "url": "https://t.me/accelerateinfinity"
    //     },
    //     "instagram": {
    //         "username": "@accelerateinfinity",
    //             "url": "https://instagram.com/accelerateinfinity"
    //     }
    // }




    // const { public_user } = useAuth();
    // const socials = public_user?.socials;



    const flipCard = () => {
        setIsFlipped(!isFlipped);
    };

    const handleSave = async () => {
        const supabase = createClient();
        let payload = {

            email: {
                username: email,
                url: emailUrl
            },
            discord: {
                username: discord,
                url: discordUrl
            },
            x: {
                username: x,
                url: xUrl
            },
            telegram: {
                username: telegram,
                url: telegramUrl
            },
            instagram: {
                username: instagram,
                url: instagramUrl
            }

        }


        try {
            const { data, error } = await supabase
                .from('public_users')
                .update({
                    socials: payload
                })
                .eq('id', user.id);

            if (error) {
                // Handle error
                console.error('Error updating user:', error.message);
                return;
            }

            if (imageChanged) {
                handleImageUpload();
            }


            setIsFlipped(false);
        } catch (error) {
            console.error("Error..:", error);
        }
    }




    return (
        <div>
            
            {!loading ? (


                <div className={`card ${isFlipped ? 'flipped' : ''} card-compact w-96 bg-base-100 shadow-xl border `} id="profileCard">
                    {isFlipped ? (
                        <div className="rounded-lg">


                            <figure className="back-content-image cursor-pointer" onClick={handleClick}>
                                <img src={imageSrc} alt="Profile" />
                            </figure>

                            {/* Hidden input field for file upload */}
                            <input type="file" id="fileInput" className="hidden" onChange={handleFileSelect} />
                            <div className="card-body">

                                <div className="card-flipped back-content">
                                    <div className="flex flex-row justify-between">
                                        <div className="">
                                            {/* <input type="text" defaultValue={username} className="card-title" onChange={(e) => setUsername(e.target.value)} /> */}
                                            <h2 className="card-title">{username}</h2>
                                        </div>
                                    </div>

                                    <div className="flex flex-col  ">
                                        <span className="text-primary hover:text-secondary mr-4">
                                            <div className="flex flex-row space-x-2 items-center align-middle">
                                                <div >
                                                    <button onClick={() => setAlterMailUrl(!alterMailUrl)}>
                                                        <IconMail />
                                                    </button>
                                                </div>
                                                <div>
                                                    {alterMailUrl ? (
                                                        <input type="text" defaultValue={user?.socials?.email?.url} className="m-0 p-0" onChange={(e) => setEmailUrl(e.target.value)} />
                                                    ) : (
                                                        <input type="text" defaultValue={user?.socials?.email?.username} className="m-0 p-0" onChange={(e) => setEmail(e.target.value)} />
                                                    )}

                                                </div>
                                            </div>
                                        </span>
                                        <span className="text-primary hover:text-secondary mr-4">
                                            <div className="flex flex-row space-x-2 items-center">
                                                <div >
                                                    <button onClick={() => setAlterDiscordUrl(!alterDiscordUrl)}>
                                                        <IconDiscord />
                                                    </button>
                                                </div>
                                                <div>
                                                    {alterDiscordUrl ? (
                                                        <div>

                                                            <input type="text" defaultValue={user?.socials?.discord?.url} className="m-0 p-0" onChange={(e) => setDiscordUrl(e.target.value)} />
                                                        </div>
                                                    ) : (
                                                        <input type="text" defaultValue={user?.socials?.discord?.username} className="m-0 p-0" onChange={(e) => setDiscord(e.target.value)} />
                                                    )}
                                                </div>
                                            </div>
                                        </span>
                                        <span className="text-primary hover:text-secondary mr-4 ">
                                            <div className="flex flex-row space-x-2 items-center">
                                                <div >
                                                    <button onClick={() => setAlterXUrl(!alterXUrl)}>
                                                        <IconX />
                                                    </button>
                                                </div>
                                                <div>
                                                    {alterXUrl ? (
                                                        <div>

                                                            <input type="text" defaultValue={user?.socials?.x?.url} className="m-0 p-0" onChange={(e) => setXUrl(e.target.value)} />
                                                        </div>
                                                    ) : (
                                                        <input type="text" defaultValue={user?.socials?.x?.username} className="m-0 p-0" onChange={(e) => setX(e.target.value)} />
                                                    )}
                                                </div>
                                            </div>
                                        </span>
                                        <span className="text-primary hover:text-secondary mr-4">
                                            <div className="flex flex-row space-x-2 items-center">
                                                <div >
                                                    <button onClick={() => setAlterTelegramUrl(!alterTelegramUrl)}>
                                                        <IconTelegram />
                                                    </button>
                                                </div>
                                                <div>
                                                    {alterTelegramUrl ? (
                                                        <div>
                                                            <input type="text" defaultValue={user?.socials?.discord?.url} className="m-0 p-0" onChange={(e) => setTelegramUrl(e.target.value)} />
                                                        </div>
                                                    ) : (
                                                        <input type="text" defaultValue={user?.socials?.telegram?.username} className="m-0 p-0" onChange={(e) => setTelegram(e.target.value)} />
                                                    )}
                                                </div>
                                            </div>
                                        </span>
                                        <span className="text-primary hover:text-secondary">
                                            <div className="flex flex-row space-x-2 items-center">
                                                <div >
                                                    <button onClick={() => setAlterInstagramUrl(!alterInstagramUrl)}>
                                                        <IconInstagram />
                                                    </button>
                                                </div>
                                                <div>
                                                    {alterInstagramUrl ? (
                                                        <div>
                                                            <input type="text" defaultValue={user?.socials?.instagram?.url} className="m-0 p-0" onChange={(e) => setInstagramUrl(e.target.value)} />
                                                        </div>
                                                    ) : (
                                                        <input type="text" defaultValue={user?.socials?.discord?.username} className="m-0 p-0" onChange={(e) => setInstagram(e.target.value)} />
                                                    )}
                                                </div>
                                            </div>
                                        </span>
                                    </div>
                                    <div className="flex justify-end text-primary" id="settings">
                                        <button onClick={() => handleSave()}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                            </svg>
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-lg">
                            <figure><img src={imageSrc} alt="Profile" /></figure>

                            <div className="card-body">
                                <div className="flex flex-row justify-between">
                                    <h2 className="card-title">{username}</h2>


                                </div>

                                <div className="flex flex-col space-y-4 justify-between mt-4">
                                    <a href="#" className="text-primary hover:text-secondary mr-4">
                                        <div className="flex flex-row space-x-2">
                                            <div >
                                                <IconMail />
                                            </div>
                                            <div>
                                                {user?.socials?.email?.username}
                                            </div>
                                        </div>
                                    </a>
                                    <a href={user?.socials?.discord?.url} className="text-primary hover:text-secondary mr-4">
                                        <div className="flex flex-row space-x-2">
                                            <div >
                                                <IconDiscord />
                                            </div>
                                            <div>
                                                {user?.socials?.discord?.username}
                                            </div>
                                        </div>
                                    </a>
                                    <a href={user?.socials?.x?.url} className="text-primary hover:text-secondary mr-4">
                                        <div className="flex flex-row space-x-2">
                                            <div >
                                                <IconX />
                                            </div>
                                            <div>
                                                {user?.socials?.x?.username}
                                            </div>
                                        </div>
                                    </a>
                                    <a href={user?.socials?.telegram?.url} className="text-primary hover:text-secondary mr-4">
                                        <div className="flex flex-row space-x-2">
                                            <div >
                                                <IconTelegram />
                                            </div>
                                            <div>
                                                {user?.socials?.telegram?.username}
                                            </div>
                                        </div>
                                    </a>
                                    <a href={user?.socials?.instagram?.url} className="text-primary hover:text-secondary">
                                        <div className="flex flex-row space-x-2">
                                            <div >
                                                <IconInstagram />
                                            </div>
                                            <div>
                                                {user?.socials?.instagram?.username}
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div className="flex justify-end text-primary" id="settings">
                                    <button onClick={() => setIsFlipped(true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                                            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
                                            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>



                    )}



                </div >
            ) : (
                <div>loading</div>
            )
            }
        </div>
    );
}

export default ProfileCard;
