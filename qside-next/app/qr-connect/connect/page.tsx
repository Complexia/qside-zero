"use client";

import { LoginButtonGoogle } from "@/components/auth/googleLogin";
import ProfileCard from "@/components/profile/profile-card-1";
import { useAuth } from "@/components/providers/authProvider";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const Connect = (context) => {



    const target_username = context.searchParams.targetUsername;
    console.log(context.searchParams.targetUsername);

    let session: any = null;

    if (typeof window !== "undefined") {
        console.log("we here?443")
        session = window.localStorage.getItem('session_key');

        console.log("weeee", session)

    }


    // @ts-ignore
    const { public_user } = useAuth();
    const [non_user, setNonUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [chosenUsername, setChosenUsername] = useState('');

    // useEffect(() => {
    //     const continueToPage = async () => {
    //         if (public_user || non_user) {
    //             console.log("we boooo?11s")
    //             let source_user_name = public_user ? public_user.username : non_user.username;
    //             const resp = await fetch(`/qr-connect?sourceUsername=${source_user_name}&targetUsername=${target_username}`, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },

    //             });

    //             if (resp.redirected) {
    //                 window.location.href = resp.url;
    //             }

                

    //         }

    //     }
    //     continueToPage();

    // }, []);


    useEffect(() => {
        // fetch non user
        async function fetchFromSupabase() {
            let non_user_response: any = null;

            if (!public_user) {
                let supabase = createClient();
                if (session) {
                    console.log("431")
                    let { data: non_user_session } = await supabase.from('sessions').select('*').eq('session_key', session).single();
                    if (non_user_session) {
                        let { data: non_user_resp } = await supabase.from('non_users').select('*').eq('username', non_user_session?.username).single();
                        non_user_response = non_user_resp;
                    }
                }

            }
            setNonUser(non_user_response);
            console.log("non user!", non_user_response);
            setLoading(false);



            if (public_user || non_user_response) {

                let source_user_name = public_user ? public_user.username : non_user_response.username;
                const resp = await fetch(`/qr-connect?sourceUsername=${source_user_name}&targetUsername=${target_username}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },

                });

                if (resp.redirected) {
                    window.location.href = resp.url;
                }

                // let source_user_name = public_user ? public_user.username : non_user.username;
                // fetch(`/qr-connect?sourceUsername=${source_user_name}&targetUsername=${target_username}`, {
                //     method: 'GET',
                //     headers: {
                //         'Content-Type': 'application/json'
                //     },

                // }).then(res => res.json()).then(data => {
                //     console.log(data);
                // }).catch(err => {
                //     console.error(err);
                // });

            }

        }

        fetchFromSupabase();

    }, []);

    const handleContinue = async () => {

        const supabase = createClient();

        let randomUuid = uuidv4();
        let randomUuid2 = uuidv4();

        const session_key = randomUuid + randomUuid2;


        console.log("session key: ", session_key)
        const payload = {
            session_key: session_key,
            username: chosenUsername
        }

        localStorage.setItem('session_key', session_key);
        await supabase.from('sessions').insert(payload);

        await supabase.from('non_users').insert({ username: chosenUsername });


        console.log("we here?", chosenUsername, target_username)

        const response = await fetch(`/qr-connect?sourceUsername=${chosenUsername}&targetUsername=${target_username}`, {
            method: 'GET',
        })


        if (response.redirected) {
            window.location.href = response.url;
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (!loading && !public_user && !non_user) {
        return (
            <div className="card w-96 bg-base-100 shadow-xl">

                <div className="card-body items-center">
                    <h2 className="card-title mb-2">Choose username or login...</h2>

                    <label className="form-control w-full max-w-xs">

                        <input
                            type="text"
                            placeholder="username"
                            className={`input input-bordered w-full max-w-xs ${chosenUsername.length >= 3 ? 'border-success focus:border-success' : ''}`}
                            onChange={(e) => setChosenUsername(e.target.value)}
                        />
                        <div className="label">
                            <span className="label-text-alt">You can change this later</span>

                        </div>
                    </label>


                    <div className="mt-2 w-full space-y-2">


                        <div className="card-actions w-full min-w-full">
                            <button
                                className={`py-2 px-4 rounded-md no-underline bg-btn-background  w-full ${chosenUsername.length >= 3 ? 'bg-success focus:bg-success hover:bg-green-500' : 'hover:bg-btn-background-hover'}`}
                                onClick={() => handleContinue()}
                                disabled={!(chosenUsername.length >= 3)}>
                                Continue
                            </button>
                        </div>
                        <div className="card-actions w-full min-w-full">
                            <LoginButtonGoogle />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    
    // if (public_user || non_user) {
    //     const response = await fetch(`/qr-connect?sourceUsername=${chosenUsername}&targetUsername=${target_username}`, {
    //         method: 'GET',
    //     })


    //     if (response.redirected) {
    //         window.location.href = response.url;
    //     }
    // }



    
}

export default Connect;