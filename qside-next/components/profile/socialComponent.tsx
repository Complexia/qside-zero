"use client"

import { useState } from "react";
import { IconCheck, IconGitHub, IconInstagram, IconLinkedIn, IconPlus, IconTick, IconX } from "../ui/icons";

import { useAuth } from "../providers/authProvider";
import Link from "next/link";

// Mapping entity names to icon components
const iconComponents = {
    "x": IconX,
    "github": IconGitHub,
    "linkedin": IconLinkedIn,
    "instagram": IconInstagram,
    "plus": IconPlus,
    // Add other mappings as needed
};

const SocialComponent = ({ social, isYourPage }) => {

    //@ts-ignore
    const { public_user } = useAuth();

    const [updating, setUpdating] = useState(false);
    const [socialUrl, setSocialUrl] = useState<any>(social.social_url);



    const handleSave = async () => {
        setUpdating(true);
        let socials = public_user.socials;
        console.log(socials)
        socials.social_url = socialUrl;



        let resp = await fetch(`/server/users/update-socials/${social.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(socials),
        })
        let response = await resp.json();


        setEdit(false);
        setUpdating(false);
        setDropdownVisible(false);
    }


    const [dropdownVisible, setDropdownVisible] = useState(false);


    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);

    };

    const goToLink = (url) => {
        setDropdownVisible(!dropdownVisible);
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const [edit, setEdit] = useState(false);

    const IconComponent = iconComponents[social.svg_key];

    return IconComponent ? (
        <div key={social.id} className="flex items-center space-x-2 border rounded-lg px-2 py-2 relative">
            {edit ? (
                <label className="flex items-center gap-2 h-6 w-full">
                    <IconComponent className="w-6 h-6" />
                    <input
                        type="text"
                        className="grow"
                        placeholder={social.social_url}
                        defaultValue={social.social_url}
                        onChange={(e) => setSocialUrl(e.target.value)}
                    />
                    <button onClick={() => handleSave()}>
                        <IconTick />
                    </button>
                </label>
            ) : (
                <>
                    {!isYourPage ? (
                        <Link href={social.social_url} className="flex items-center w-full" rel="noopener noreferrer" target="_blank">
                            <IconComponent className="w-6 h-6" />
                            <span className="mx-auto">{social.social_type}</span>
                        </Link>
                    ) : (
                        <>
                            <button
                                onClick={toggleDropdown}
                                rel="noopener noreferrer"
                                className="flex items-center w-full"
                            >
                                <IconComponent className="w-6 h-6" />
                                <span className="mx-auto">{social.social_type}</span>
                            </button>
                            {dropdownVisible && (
                                <div className="text-black absolute right-0 mt-2 w-48 bg-primary rounded-lg shadow-lg z-10">
                                    <button
                                        onClick={() => goToLink(social.social_url)}
                                        className="block w-full text-left px-4 py-2 hover:bg-secondary rounded-lg"
                                    >
                                        Go to link
                                    </button>
                                    <button
                                        onClick={() => setEdit(true)}
                                        className="block w-full text-left px-4 py-2 hover:bg-secondary rounded-lg"
                                    >
                                        Edit
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </div>


    ) : null;

}

export default SocialComponent;