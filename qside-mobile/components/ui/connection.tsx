"use client";


import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet'
import { IconDiscord, IconHamburger, IconSidebar } from '@/components/ui/icons'
import Link from 'next/link';
import { LoginButtonGoogle } from '@/components/auth/googleLogin';
import { useAuth } from '@/components/providers/authProvider';

import { createClient } from '@/utils/supabase/client';
import { useState } from 'react';
import { motion } from "framer-motion"

const Connection = () => {
    // const [activeButton, setActiveButton] = useState(0);
    // const handleButtonClick = (buttonIndex: number) => {
    //     setActiveButton(buttonIndex);
    // };
    // const handleSignOut = async () => {

    //     const supabase = createClient();
    //     await supabase.auth.signOut();
    // }
    //@ts-ignore
    // const { user } = useAuth();
    return (
        <div className='flex-row pb-10'>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1.5 }}
            >
                <div className="chat chat-start">
                    <div className="chat-bubble chat-bubble-primary">
                        What kind of nonsense is this
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1.5 }}
            >
                <div className="chat chat-start">
                    <div className="chat-bubble chat-bubble-secondary">
                        Put me on the Council and not make me a Master!?
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4, duration: 1.5 }}
            >
                <div className="chat chat-start">
                    <div className="chat-bubble chat-bubble-accent">
                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <div className="avatar online">
                                    <div className="w-16 rounded-full">
                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                    </div>
                                </div>
                            </div>
                            <div className="stat-value">86%</div>
                            <div className="stat-title">Tasks done</div>
                            <div className="stat-desc text-secondary">38 minutes ago</div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 5.5, duration: 1.5 }}
            >
                <div className="chat chat-end">
                    <div className="chat-bubble chat-bubble-info">
                        Calm down, Anakin.
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 7, duration: 1.5 }}
            >
                <div className="chat chat-end">
                    <div className="chat-bubble chat-bubble-success">
                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <div className="avatar online">
                                    <div className="w-16 rounded-full">
                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                    </div>
                                </div>
                            </div>
                            <div className="stat-value">50%</div>
                            <div className="stat-title">Tasks done</div>
                            <div className="stat-desc text-secondary">1 hours ago</div>
                        </div>
                    </div>
                </div>
            </motion.div>


            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 8.5, duration: 1.5 }}
            >
                <div className="chat chat-end">
                    <div className="chat-bubble chat-bubble-warning">
                        To be on the Council at your age.
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 10, duration: 1.5 }}
            >
                <div className="chat chat-end">
                    <div className="chat-bubble chat-bubble-error">
                        It's never happened before.
                    </div>
                </div>
            </motion.div>


        </div>
    );
}

export default Connection;