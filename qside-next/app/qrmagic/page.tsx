"use client"

import { useEffect, useRef } from 'react';
import QRCode from 'qrcode.react';
import { useAuth } from '@/components/providers/authProvider';

const QrMagic = () => {
    // @ts-ignore
    const { public_user } = useAuth();
    // const qrUrl = `${process.env.NEXT_PUBLIC_APP_URL}/qr-connect/connect?targetUsername=${public_user?.username}`;
    const qrUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${public_user?.username}?category=qr`;
    const qrContainerRef = useRef<any>(null);
    console.log(qrUrl)



    useEffect(() => {
        const centerQR = () => {
            if (qrContainerRef.current) {
                const containerWidth = qrContainerRef.current.offsetWidth;
                const containerHeight = qrContainerRef.current.offsetHeight;
                const qrSize = Math.min(containerWidth, containerHeight);
                qrContainerRef.current.style.width = `${qrSize}px`;
                qrContainerRef.current.style.height = `${qrSize}px`;
            }
        };

        centerQR();

        window.addEventListener('resize', centerQR);

        return () => {
            window.removeEventListener('resize', centerQR);
        };
    }, []);

    return (
        <div className="flex justify-center items-center h-screen">
            <div ref={qrContainerRef}>
                <QRCode value={qrUrl} size={256} />
            </div>
        </div>
    );
};

export default QrMagic;