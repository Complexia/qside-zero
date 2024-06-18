"use client"
import "./style.css"

import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "../providers/authProvider";

const formatTime = (timestamp) => {
    // Sample timestamp from your database
    // let timestamp = "2024-06-07T07:17:56.878634+00:00";

    // Convert the timestamp to a Date object
    let date = new Date(timestamp);

    // Define options for the date part
    let dateOptions = {
        weekday: 'short',   // Abbreviated weekday name, e.g., 'Thu'
        day: '2-digit',     // Two-digit day, e.g., '07'
        month: '2-digit',   // Two-digit month, e.g., '06'
        year: 'numeric'     // Full numeric year, e.g., '2024'
    };

    // Define options for the time part
    let timeOptions = {
        hour: '2-digit',    // Two-digit hour, e.g., '07'
        minute: '2-digit',  // Two-digit minute, e.g., '17'
        hour12: false       // 24-hour format
    };

    // Format the date and time
    //@ts-ignore
    let formattedDate = date.toLocaleDateString('en-GB', dateOptions);
    //@ts-ignore
    let formattedTime = date.toLocaleTimeString('en-GB', timeOptions);

    // Combine the formatted date and time
    let humanReadable = `${formattedDate}, ${formattedTime}`;

    console.log(humanReadable); // Output: "Fri, 07/06/2024, 07-17"
    return humanReadable;

}

const ActivityCard = () => {
    const [loading, setLoading] = useState(true);
    const [activity, setActivity] = useState<any>([]);
    // @ts-ignore
    const { public_user } = useAuth();

    useEffect(() => {
        const fetchActivity = async () => {
            // Fetch activity data
            setLoading(true);
            const supabase = createClient();

            const { data, error } = await supabase.from('activity').select('*').eq('user_id', public_user.id).order('created_at', { ascending: false });
            if (error) {
                console.error('Error fetching activity:', error.message);
                return null;
            }
            setActivity(data);
            setLoading(false);

        }
        fetchActivity();


    }, []);



    const activityItems = [
        { type: 'Connection', description: 'Connected with user @van', url: '/activity/1', date: '2024-05-28 14:32' },
        { type: 'Transfer', description: 'Transferred 1.2ETH to @sam', url: '/activity/2', date: '2024-05-27 09:15' },
        { type: 'Receive', description: 'Received 0.5ETH from @alex', url: '/activity/3', date: '2024-05-26 16:45' },
        { type: 'Swap', description: 'Swapped 0.3ETH for 300 USDC', url: '/activity/4', date: '2024-05-25 11:22' },
        { type: 'Stake', description: 'Staked 1ETH in protocol XYZ', url: '/activity/5', date: '2024-05-24 10:10' },
    ];

    const maxItemsToShow = 4;
    const itemsToShow = activity.slice(0, maxItemsToShow);
    const showViewMore = activity.length > maxItemsToShow;

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
        <div className="card w-96 glass">



            <div className="card-body">

                <h1 className="text-primary font-bold">Activity for @{public_user?.username}</h1>
                <div className="flex flex-col space-y-4 mt-4">
                    {itemsToShow.map((item, index) => (

                        <div key={index} className="chat chat-start">
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="Tailwind CSS chat bubble component" src="/assets/qside-katana.png" />
                                </div>
                            </div>
                            <div className="chat-header">
                                {item.type}
                                <time className="text-xs opacity-50 ml-2">{formatTime(item.created_at)}</time>
                            </div>
                            <Link href={`/${item.other_user_username}`} key={index}>
                                <div className="chat-bubble">{item.description}</div>
                            </Link>
                            <div className="text-success chat-footer opacity-50">
                                {item.action}
                            </div>
                        </div>

                    ))}
                </div>
                {showViewMore && (
                    <div className="card-actions flex-row-reverse  mx-auto mt-auto">
                        <Link href="/activity">
                            <span className="text-primary">View more...</span>
                        </Link>
                    </div>
                )}
                {/* <div className="card-actions flex items-center px-6 mt-auto">
                    <button className="btn btn-primary w-full">Claim wallet</button>
                </div> */}
            </div>

        </div >

    )
}

export default ActivityCard