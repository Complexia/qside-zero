"use client"

import { useState } from "react";
import { IconCheck, IconGitHub, IconInstagram, IconLinkedIn, IconPlus, IconTick, IconX } from "../ui/icons";
import { createClient } from "@/utils/supabase/client";
import { useAuth } from "../providers/authProvider";

// Mapping entity names to icon components
const iconComponents = {
    "x": IconX,
    "github": IconGitHub,
    "linkedin": IconLinkedIn,
    "instagram": IconInstagram,
    "plus": IconPlus,
    // Add other mappings as needed
};

const SocialComponent = ({ socialKey, socialValue }) => {

    //@ts-ignore
    const { public_user } = useAuth();

    const [updating, setUpdating] = useState(false);
    const [socialUrl, setSocialUrl] = useState<any>(socialValue.url);

    

    const handleSave = async () => {
        setUpdating(true);
        const supabase = createClient();
        let socials = public_user.new_socials;
        console.log(socials)
        socials[socialKey].url = socialUrl;
        

        const { data, error } = await supabase
            .from('public_users')
            .update({
                new_socials: socials,
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

    const IconComponent = iconComponents[socialKey];
    const social = socialValue as any;
    return IconComponent ? (
        <div key={socialKey} className="flex items-center space-x-2 border rounded-lg px-2 py-2 relative">
            {edit ? (

                <label className=" flex items-center gap-2 h-6 w-full">
                    <IconComponent className="w-6 h-6" />
                    <input type="text" className="grow" placeholder={socialValue.url} defaultValue={socialValue.url} onChange={(e) => setSocialUrl(e.target.value)}/>
                    <button onClick={() => handleSave()}>


                        <IconTick />
                    </button>
                </label>
            ) : (
                <>
                    <button
                        onClick={toggleDropdown}
                        rel="noopener noreferrer"
                        className="flex items-center w-full"
                    >
                        <IconComponent className="w-6 h-6" />
                        <span className="mx-auto">{social.name}</span>
                    </button>
                    {dropdownVisible && (
                        <div className="text-black absolute right-0 mt-2 w-48 bg-primary rounded-lg shadow-lg z-10">
                            <button
                                onClick={() => goToLink(socialValue.url)}
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
        </div>

    ) : null;

}

export default SocialComponent;