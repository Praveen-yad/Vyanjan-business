import React from 'react'
import { BiCopyright } from "react-icons/bi"

function Footer() {
  return (
    <div>
        <div className='mt-12 bg-neutral-700 h-[1px] '></div>
        <div className='flex items-center justify-between'>
          <div className='pt-6 pb-6 px-4 flex items-center text-white'>
              <BiCopyright className='mt-0.5'/>
              <div className='text-sm ml-1 '>2022 Vyanjan, inc</div>
          </div>
          <div className='mr-5 text-theme text-sm flex items-center'>
            <div className='text-lg'>🚩</div>
          </div>
        </div>
        
    </div>
  )
}

export default Footer