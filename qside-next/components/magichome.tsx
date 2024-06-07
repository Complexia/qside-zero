

import ProfileCard from "@/components/profile/new-profile-card";

import ActivityCard from "./activity/activity-card";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const Magic = async () => {

    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }
    
    
    return (


        <div className="flex flex-col gap-20 items-center justify-center align-middle">
            <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
                <main className="flex-1 flex flex-col lg:flex-row gap-6">
                    <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
                        <ProfileCard  username="" category=""/>
                        <ActivityCard />
                    </div>
                </main>
            </div>
        </div>

    )
}

export default Magic;