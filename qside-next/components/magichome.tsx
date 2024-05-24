"use client"

import ProfileCard from "@/components/profile/profile-card";
import WalletCard from "@/components/wallet/wallet-card";
import { useAuth } from "./providers/authProvider";
import { IconClose } from "./ui/icons";
import Slider from "./ui/slider";
import MobileMenu from "./ui/mobileMenu";
import { useState } from "react";
import Connection from "./ui/connection";

const Magic = () => {
    const [activeButton, setActiveButton] = useState(0);
    // @ts-ignore
    const { user } = useAuth();
    return (
        <div>
            <MobileMenu activeButton={activeButton} setActiveButton={setActiveButton} />
            {activeButton === 1 &&
                <div className="h-screen w-screen flex items-center justify-center">
                    <Slider />
                </div>
            }
            {activeButton === 2 &&
                <div className="h-screen w-screen flex items-center justify-center">
                    <WalletCard />
                </div>
            }
               {activeButton === 3 &&
                <div className="h-screen w-screen flex items-center justify-center">
                    <Connection />
                </div>
            }
            {/* {!user && (
                <div role="alert" className="alert alert-info">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>Claim your account so that you don't lose your stuff!</span>
                    <div className="flex flex-row space-x-2">

                        <button className="btn btn-sm btn-primary">Sign up!</button>
                        <button className="btn btn-sm">
                            <IconClose />
                        </button>
                    </div>
                </div>

            )} */}

            {/* <div className="flex flex-col lg:flex-row gap-20 items-center justify-center align-middle">
                <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
                    <main className="flex-1 flex flex-col lg:flex-row gap-6">
                        <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4"> */}
            {/* <ProfileCard /> */}
            {/* <WalletCard /> */}
            {/* </div>
                    </main>
                </div>
            </div> */}

        </div>

    )
}

export default Magic;