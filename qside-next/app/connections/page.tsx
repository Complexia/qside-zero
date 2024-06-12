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
        <div className="w-screen px-16 ">
            <Connections />
        </div>
    )
}

export default ConnectionsPage;