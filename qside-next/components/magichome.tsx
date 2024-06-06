"use client"

import ProfileCard from "@/components/profile/new-profile-card";
import WalletCard from "@/components/wallet/wallet-card";
import { useAuth } from "./providers/authProvider";
import { IconClose } from "./ui/icons";
import Slider from "./ui/slider";
import MobileMenu from "./ui/mobileMenu";
import { SetStateAction, useState } from "react";
import Connection from "./ui/connection";
import ActivityCard from "./activity/activity-card";

const Magic = () => {
    const [activeButton, setActiveButton] = useState(1);
    const [tab, setTab] = useState(1);
    const changeTab = (index: SetStateAction<number>) => {
        console.log("changing tab")
        setTab(index)
    };
    // @ts-ignore
    const { user } = useAuth();
    return (


        <div className="flex flex-col gap-20 items-center justify-center align-middle">
            <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
                <main className="flex-1 flex flex-col lg:flex-row gap-6">
                    <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
                        <ProfileCard  username="" />
                        <ActivityCard />
                    </div>
                </main>
            </div>
        </div>

    )
}

export default Magic;