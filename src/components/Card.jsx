import React, { useState } from 'react'
import { change } from '../store/ToggleSlice'
import { AnimatePresence, Variants, motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import Url from '../Url'

const Card = ({item}) => {
    const dispatch = useDispatch()
    const [modal, setModal] = useState(false)
    const RemoveHandler = async(id) => {
        await axios.post(`${Url}/remove`, {
           id:id
        }) 
        dispatch(change()) 
        setModal(false)
    }
    const Animate = {
        hidden:{
            clipPath: "inset(0% 100% 100% 0% round 0px)",
        },
        visible:{
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            transition:{
                duration:0.5,
                type:'spring',
            }
        },
        
    }
  return (
    <div className='p-3 bg-neutral-900 rounded-3xl flex items-center shadow-black shadow-[0px_1px_4px_2px] relative overflow-hidden'>
        <img src={item.img} className='w-[14rem] rounded-2xl h-[12rem] object-cover' />
        <div className='h-[12rem] pl-4 flex flex-col text-white'>
            <div className='text-[2rem] font-medium text-theme'>{item.name}</div>
            <div className='text-lg'>{item.CategoryName}</div>
            <textarea readOnly={true} value={item.description.slice(0,100)} className='bg-transparent overflow-hidden py-1 w-[27rem] outline-none mt-2'/>
            <div className='flex space-x-5 mt-3'>
                <div className='bg-theme px-4 py-1 rounded-md' >Half:{item.options.half}</div> 
                <div className='bg-theme px-4 py-1 rounded-md'>Full: {item.options.full}</div>
                <motion.div whileTap={{scale:0.97}} className='bg-red-500 px-4 py-1 rounded-md cursor-pointer' onClick={() => setModal(!modal)} >Remove Item</motion.div>
            </div>
        </div>
        <AnimatePresence>
            {modal ? 
            <motion.div 
                key={'modal'} 
                initial="hidden" 
                animate="visible" 
                exit='hidden'
                transition={{type:'spring', duration:0.5}} 
                variants={Animate} 
                className='h-[12rem] w-[14rem] bg-neutral-200 absolute left-3 rounded-2xl flex flex-col items-center justify-center'>
                    <div className='text-center text-lg px-2'>Are You sure You want to remove this item?</div>
                    <div className='flex space-x-3'>
                        <motion.div whileHover={{scale:1.04}} whileTap={{scale:0.97}} className='bg-red-600 text-white px-5 py-1 rounded-lg cursor-pointer mt-3' onClick={() => RemoveHandler(item._id)}>Yes</motion.div>
                        <motion.div whileHover={{scale:1.04}} whileTap={{scale:0.97}} className='bg-black text-white px-5 py-1 rounded-lg cursor-pointer mt-3' onClick={() => setModal(false)}>No</motion.div>
                    </div>

                </motion.div> : <div></div>}
        </AnimatePresence>
    </div>
  )
}

export default Card
