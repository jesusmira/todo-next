'use client'

import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";


interface Props {
    currentTab?: number;
    tabOptions?: number[];
}


export const TabBar = ({ currentTab = 1, tabOptions = [1, 2, 3, 4] }: Props) => {
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState(currentTab);

    const onTabSelected = (tab: number) => {
      setSelectedTab( tab );
      setCookie('selectedTab', tab.toString());
      router.refresh();
    }
    console.log( typeof tabOptions.length);

    return (
      <div className={`
        grid  grid-cols-4 w-full  space-x-2 rounded-xl bg-gray-200 p-2 
        `}>
      {/* <div className={`
        grid  grid-cols-${tabOptions.length.toLocaleString()} w-full  space-x-2 rounded-xl bg-gray-200 p-2 
        `}> */}
        
        {
            tabOptions.map((tab) => (
                <div key={tab}>
                <input 
                checked={selectedTab === tab}
                onChange={() => {}}
                type="radio" 
                id={ tab.toString() } 
                name="tabs" 
                className="peer hidden" />
                <label 
                onClick={() => onTabSelected(tab)}
                className="transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
                   {tab}
                </label>
                </div>
            ))
        }
  
        
      </div>
    )
  }
