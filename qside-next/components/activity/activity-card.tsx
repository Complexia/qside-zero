"use client"

import Link from "next/link";


const ActivityCard = () => {



    const activityItems = [
        { type: 'Connection', description: 'Connected with user @van', url: '/activity/1', date: '2024-05-28 14:32' },
        { type: 'Transfer', description: 'Transferred 1.2ETH to @sam', url: '/activity/2', date: '2024-05-27 09:15' },
        { type: 'Receive', description: 'Received 0.5ETH from @alex', url: '/activity/3', date: '2024-05-26 16:45' },
        { type: 'Swap', description: 'Swapped 0.3ETH for 300 USDC', url: '/activity/4', date: '2024-05-25 11:22' },
        { type: 'Stake', description: 'Staked 1ETH in protocol XYZ', url: '/activity/5', date: '2024-05-24 10:10' },
    ];

    const maxItemsToShow = 4;
    const itemsToShow = activityItems.slice(0, maxItemsToShow);
    const showViewMore = activityItems.length > maxItemsToShow;


    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl border">
            <div className="card-body">
                <div className="stats stats-vertical ">
                    <div className="stat">
                        <div className="stat-figure text-secondary"></div>
                        <div className="stat-value text-primary">Activity</div>
                        <div className="stat-title">Activity history for @Complexia</div>
                    </div>
                </div>
                <div className="flex flex-col space-y-4 mt-4 mx-6 my-2">
                    {itemsToShow.map((item, index) => (
                        <Link href={item.url} key={index}>
                            <span className="activity-item block">
                                <div className="text-base">{item.description}</div>
                                <div className="text-sm text-gray-500">{item.date}</div>
                            </span>
                        </Link>
                    ))}
                </div>
                {showViewMore && (
                    <div className="card-actions flex-row-reverse  mx-auto mt-auto">
                        <Link href="/activity">
                            <span className="text-primary">View more...</span>
                        </Link>
                    </div>
                )}
                <div className="card-actions flex items-center px-6 mt-auto">
                    <button className="btn btn-primary w-full">Claim wallet</button>
                </div>
            </div>
        </div>

    )
}

export default ActivityCard