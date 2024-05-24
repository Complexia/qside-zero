import { GeistSans } from "geist/font/sans";
import "./globals.css";
import AuthProvider from "@/components/providers/authProvider";
import { createClient } from "@/utils/supabase/server";
import { cookies } from 'next/headers'
import Sidebar from "@/components/ui/sidebar";
import MobileMenu from "@/components/ui/mobileMenu";
import { LoginButtonGoogle } from "@/components/auth/googleLogin";

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

          {/* <Sidebar /> */}
          <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
              {/* Navbar */}
              <div className="w-full navbar">
                <div className="flex-none lg:hidden fixed">
                  <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </label>
                </div>
                {/* <div className="flex-1 px-2 mx-2">Navbar Title</div> */}
                <div className="flex-none hidden lg:block">
                  <ul className="menu menu-horizontal">
                    {/* Navbar menu content here */}
                    <li><a>Navbar Item 1</a></li>
                    <li><a>Navbar Item 2</a></li>
                  </ul>
                </div>
              </div>

              <main className="min-h-screen flex flex-row ">
                {children}
              </main>

            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
              <ul className="menu p-4 w-80 min-h-full bg-base-200">
                {/* Sidebar content here */}
                <li><LoginButtonGoogle /></li>
                <li><button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover" >Sign out</button></li>
              </ul>
            </div>
          </div>

        </AuthProvider>
      </body>
    </html>
  );
}
