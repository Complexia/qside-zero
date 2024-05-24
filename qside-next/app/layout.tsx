import { GeistSans } from "geist/font/sans";
import "./globals.css";
import AuthProvider from "@/components/providers/authProvider";
import { createClient } from "@/utils/supabase/server";
import { cookies } from 'next/headers'
import Sidebar from "@/components/ui/sidebar";
import MobileMenu from "@/components/ui/mobileMenu";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const supabase = createClient();

  const { data: { session } } = await supabase.auth.getSession();
  const accessToken = session?.access_token || null;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase.from('public_users').select('*').eq('id', user?.id).single()

  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
      <AuthProvider accessToken={accessToken} user={user} public_user={data}>
       
        <Sidebar />
        <main className="min-h-screen flex flex-row ">
          {children}
        </main>
        {/* <MobileMenu/> */}
      </AuthProvider>
      </body>
    </html>
  );
}
