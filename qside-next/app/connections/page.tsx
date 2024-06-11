"use client";
import { Metadata } from "next"
import Image from "next/image"
import { Connections } from "@/components/connections/connections"

import { useAuth } from "@/components/providers/authProvider";
import { cn } from "@/utils/general/utils";


  
const ConnectionsPage = () => {
    // @ts-ignore
    const { public_user } = useAuth();
    return (
        <div className="flex flex-col gap-20 items-center justify-center align-middle">
            <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
                <main className="flex-1 flex flex-col lg:flex-row gap-6">
                    <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
                        <Connections />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default ConnectionsPage;