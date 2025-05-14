'use client'

import { useSession } from "next-auth/react";
import { useEffect } from "react";


export default function ProfilePage() {

    const { data: session } = useSession();

    useEffect(() => {
      console.log('Client-side');
    }, [])
    


    return (
        <div>
        <h1>Page Profile</h1>
        <hr />
        <div className="flex flex-col gap-2">
            <span>Nombre: {session?.user?.name ?? 'No Name'}</span>
            <span>Email: {session?.user?.email ?? 'No Email'}</span>
            <span>Imagen: {session?.user?.image ?? 'No Image'}</span>
            <span>ID: {session?.user?.id ?? 'No ID'}</span>
            <span>Roles: {session?.user?.roles?.join(', ') ?? 'No Roles'}</span>
        </div> 
        </div>
    );
}