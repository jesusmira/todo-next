'use client'
import Link from "next/link";
import { usePathname } from "next/navigation"


interface Props{
    icon: React.ReactNode,  
    title: string,
    path: string,

}

export const SidebarItem = ({ title, path, icon }: Props) => {

    const currentPath = usePathname();

    return (
        <li>            
            <Link href={path} className= {`${( currentPath === path ) ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400': ''} relative px-4 py-3 flex items-center space-x-4 rounded-xl text-gray-600 group-[
            hover:bg-gradient-to-r hover:bg-sky-600 hover:text-white
            ]`}>
                {icon}
                <span className="-mr-1 font-medium">{title}</span>  
            </Link>
        </li>
    )
}

