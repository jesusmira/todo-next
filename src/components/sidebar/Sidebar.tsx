import Image from 'next/image'
import Link from 'next/link'
import { IoBasketOutline, IoCalendarOutline, IoCheckboxOutline, IoCodeWorkingOutline, IoListOutline, IoPersonOutline } from 'react-icons/io5'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { SidebarItem } from './SidebarItem'
import { LogoutButton } from './LogoutButton'

const MenuItems = [
  { 
    icon: <IoCalendarOutline size={30} />,
    title: 'Dashboard',  
    path: '/dashboard' 
  },
  {
    icon: <IoCheckboxOutline size={30} />,
    title: 'Rest TODOS',  
    path: '/dashboard/rest-todos'
  },
  {
    icon: <IoListOutline size={30} />,
    title: 'Server Actions',  
    path: '/dashboard/server-todos' 
  },
  {
    icon: <IoCodeWorkingOutline size={30} />,
    title: 'Cookies',  
    path: '/dashboard/cookies' 
  },
  {
    icon: <IoBasketOutline size={30} />,
    title: 'Products',  
    path: '/dashboard/products' 
  },
  {
    icon: <IoPersonOutline size={30} />,
    title: 'Perfil',  
    path: '/dashboard/profile' 
  },
]

export const Sidebar = async () => {

  const session = await getServerSession(authOptions);
  // if (!session) {
  //     redirect('/api/auth/signin');
  // }
  const userAvatar = ( session?.user?.image ) 
  ? session?.user?.image 
  : "https://images.unsplash.com/photo-1728577740843-5f29c7586afe?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  
  const userName = session?.user?.name;
  const userRole = session?.user?.roles ?? ['client'];


  return (
          <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r border-gray-300 bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
            <div>
              <div className="-mx-6 px-6 py-4">
                <Link href="#" title="home">
                  {/* Next/Image */}
                  <Image src="https://raw.githubusercontent.com/Meschacirung/Tailus-website/f59a4b3ecc1ad9f6a2b0ad9e3fca6f957140cc4d/public/images/logo.svg" className="w-32" alt="tailus logo" width={32} height={32} priority={false}/>
                </Link>
              </div>
    
              <div className="mt-8 text-center">
                {/* Next/Image */}
                <Image src={userAvatar} alt="" className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28" width={1480} height={800}  quality={100} priority={false} />
                  <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{userName}</h5>
                  <span className="hidden text-gray-400 lg:block capitalize">
                    {userRole.join(', ')}
                  </span>
              </div>
    
              <ul className="space-y-2 tracking-wide mt-8">
                {
                    MenuItems.map((item, index) => (
                      <SidebarItem key={index} {...item} />
                    ))
                }
              </ul>
            </div>
    
            <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t border-gray-300">
              <LogoutButton />
            </div>
          </aside>
  )
}
