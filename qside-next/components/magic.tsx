"use client";

import ProfileCard from "./profile/new-profile-card";
import { useAuth } from "./providers/authProvider";
import WalletCard from "./wallet/wallet-card";

const Magic = ({ username }) => {

    // @ts-ignore
    const { public_user } = useAuth();
    const isYourPage = public_user?.username === username;
    return (
        <div className="flex flex-col lg:flex-row gap-20 items-center justify-center align-middle">

            <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">

                <main className="flex-1 flex flex-col lg:flex-row gap-6">
                    <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4">
                        <ProfileCard username={username} />
                        {isYourPage && (
                            <WalletCard />
                        )}
                    </div>
                </main>
            </div>

        </div>

        // <div className="flex flex-col lg:flex-row gap-20 items-center justify-center align-middle">
        //     <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        //         <main className="flex-1 flex flex-col lg:flex-row gap-6">
        //             <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4">
        //                 <ProfileCard />
        //                 <WalletCard />
        //             </div>
        //         </main>
        //     </div>
        // </div>
    )
}

export default Magic