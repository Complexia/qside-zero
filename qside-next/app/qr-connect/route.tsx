import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    // The `/auth/callback` route is required for the server-side auth flow implemented
    // by the SSR package. It exchanges an auth code for the user's session.
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    const origin = process.env.NEXT_PUBLIC_APP_URL;
    const requestUrl = new URL(request.url);
    const sourceUsername: any = requestUrl.searchParams.get("sourceUsername");
    const username = requestUrl.searchParams.get("targetUsername");

    console.log("we here? entry", origin);

    if (username) {
        const supabase = createClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();



        const { data: public_user } = await supabase.from('public_users').select('*').eq('id', user?.id).single()

        let non_user: any = null;

        if (!user) {
            // get something session id from localstorage here (how....)
            let { data: non_user_resp } = await supabase.from('non_users').select('*').eq('username', sourceUsername).single();
            non_user = non_user_resp;
        }

        // let source_user_username = user?.id ? public_user?.username : non_user?.id;

        let targetUsername = username;
        // let sourceUsername = source_user_username;

        let usercon = [sourceUsername, targetUsername];

        usercon.sort((a, b) => a.localeCompare(b));

        let userconString = usercon.join('');

        console.log("we here?");

        try {
            const { data, error } = await supabase
                .from('connections')
                .insert({
                    usercon: userconString,
                    category: 'qr'
                }).select();

            
            console.log("we here?1");

            if (error) {
                // Handle error
                console.error('Error creating connection:', error.message);
                return NextResponse.redirect(`${origin}/${username}`);
            }

            if (data) {
                console.log("we here? 2");
                if (user) {
                    const { data: data1, error: error1 } = await supabase
                        .from('public_users')
                        .update({
                            connections: public_user?.connections ? [...public_user?.connections, data[0].id] : [data[0].id]
                        })
                        .eq('id', public_user?.id);

                    if (error) {
                        // Handle error
                        console.error('Error updating user:', error1);
                        return NextResponse.redirect(`${origin}/${username}`);
                    }

                    return NextResponse.redirect(`${origin}/${username}?non_user=false`);

                }
                else {
                    console.log("we here?3");
                    const { data: data1, error: error1 } = await supabase
                        .from('non_users')
                        .update({
                            connections: non_user?.connections ? [...non_user?.connections, data[0].id] : [data[0].id]
                        })
                        .eq('id', non_user?.id);

                    if (error) {
                        // Handle error
                        console.error('Error updating user:', error1);
                        return NextResponse.redirect(`${origin}/${username}`);
                    }

                    console.log(`${origin}/${username}?non_user=true&non_user_id=${non_user?.id}`)

                    return NextResponse.redirect(`${origin}/${username}?non_user=true&non_user_id=${non_user?.id}`);

                }


            }


        } catch (error) {
            console.error("Error..:", error);
        }


    }

    // URL to redirect to after sign up process completes
    return NextResponse.redirect(`${origin}/${username}`);
}