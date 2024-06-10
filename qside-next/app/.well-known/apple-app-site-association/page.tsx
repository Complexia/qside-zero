"use server";
import { NextResponse } from "next/server";

export default async function Apple(request: Request) {
    const aasa = {
        applinks: {
            details: [
                {
                    appIDs: ["$DEVELOPMENT_TEAM_ID.com.qside.dev"],
                    components: [
                        {
                            "/": "/open/*",
                            comment: "Matches any URL whose path starts with /open/"
                        }
                    ]
                }
            ]
        }
    };

    // URL to redirect to after sign up process completes
    return NextResponse.json(aasa);
}