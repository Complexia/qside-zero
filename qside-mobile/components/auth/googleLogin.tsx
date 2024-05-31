'use client'

import * as React from 'react'



import { cn } from '@/utils/general/utils'

import { IconGoogle, IconSpinner } from '@/components/ui/icons'
import { createClient } from '@/utils/supabase/client'



export function LoginButtonGoogle({
  text = 'Login with Google',
  showGoogleIcon = true,
  ...props
}) {
  const [isLoading, setIsLoading] = React.useState(false)
  // Create a Supabase client configured to use cookies
  const supabase = createClient()

  if (process.env.NEXT_PUBLIC_AUTH_GOOGLE !== 'true') {
    return null
  }

  return (
    <button
      className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover w-full "
      onClick={async () => {
        setIsLoading(true)
        await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${location.origin}/auth/callback`, 
            queryParams: {
              access_type: 'offline',
              prompt: 'consent',
            },
          }
        })
      }}
      disabled={isLoading}
      
      {...props}
    >
        <div className="flex flex-row justify-center">
      {isLoading ? (
        <IconSpinner className="mr-2 animate-spin" />
      ) : showGoogleIcon ? (
        <IconGoogle className="mr-2" />
      ) : null}
      {text}
      </div>
    </button>
  )
}
