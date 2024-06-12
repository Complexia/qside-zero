"use client";

import { ChevronDownIcon } from "@radix-ui/react-icons"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/new-york/ui/avatar"
import { Button } from "@/registry/new-york/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/new-york/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/new-york/ui/popover"
import { useEffect, useState } from "react";
import { useAuth } from "../providers/authProvider";
import Link from "next/link";

export function Connections() {

  // @ts-ignore
  const { public_user, accessToken } = useAuth();
  const [connections, setConnections] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConnections = async () => {
      setLoading(true);
      let resp = await fetch(`/server/connections/${public_user?.username}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },

      })
      let response = await resp.json();
      setConnections(response);
      console.log(response)
      setLoading(false);


    }
    fetchConnections();

  }, [])

  if (loading) {
    return (
      <div className="card glass">
        <div className="card  shadow-xl p-2 indicator">
          <div className="skeleton w-full h-32 "></div>
        </div>
      </div>
    );
  }

  return (
    <div className="card glass">


      <Card className="border-0 text-primary ">
        <CardHeader>
          <CardTitle>Connections</CardTitle>
          <CardDescription>
            Search box - search for connections
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">

          {connections.map((connection) => (

            <div key={connection.id} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">

                <Link href={`/${connection.username}`}>
                  <div className="avatar">
                    <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={`${process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL_DP}/${connection?.image_info?.uuid}`} alt="avatar" />
                    </div>
                  </div>
                </Link>

                <div>
                  <Link href={`/${connection.username}`}>
                    <p className="text-sm font-medium leading-none">{connection.username}</p>
                  </Link>
                  <p className="text-sm text-muted-foreground">{connection.bio}</p>
                </div>
              </div>
              <button className="btn btn-primary ml-auto">
                message
              </button>
            </div>

          ))}
          {/* <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/avatars/02.png" />
                <AvatarFallback>JL</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">Jackson Lee</p>
                <p className="text-sm text-muted-foreground">p@example.com</p>
              </div>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Member {" "}
                  <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0" align="end">
                <Command>
                  <CommandInput placeholder="Select new role..." />
                  <CommandList>
                    <CommandEmpty>No roles found.</CommandEmpty>
                    <CommandGroup className="p-1.5">
                      <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                        <p>Viewer</p>
                        <p className="text-sm text-muted-foreground">
                          Can view and comment.
                        </p>
                      </CommandItem>
                      <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                        <p>Developer</p>
                        <p className="text-sm text-muted-foreground">
                          Can view, comment and edit.
                        </p>
                      </CommandItem>
                      <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                        <p>Billing</p>
                        <p className="text-sm text-muted-foreground">
                          Can view, comment and manage billing.
                        </p>
                      </CommandItem>
                      <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                        <p>Owner</p>
                        <p className="text-sm text-muted-foreground">
                          Admin-level access to all resources.
                        </p>
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div> */}
        </CardContent>
      </Card>
    </div>
  )
}