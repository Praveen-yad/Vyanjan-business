import React, { useState } from 'react'
import { change } from '../store/ToggleSlice'
import { AnimatePresence, motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import Url from '../Url'
import { MetroSpinner } from 'react-spinners-kit'

const Card = ({item}) => {
    const dispatch = useDispatch()
    const [modal, setModal] = useState(false)
    const [loading, setloading ] = useState(false)

    const RemoveHandler = async(id) => {
        setloading(true)
        await axios.post(`${Url}/remove`, {
           id:id
        }) 
        dispatch(change()) 
        setloading(false)
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
    <div className='w-[90vw] sm:w-[27.5rem] p-3 bg-neutral-900 rounded-3xl flex flex-col  items-center shadow-black shadow-[0px_1px_4px_2px] relative overflow-hidden'>
        <div className='w-full ' >
            <img alt="failed" src={item.img} className='rounded-2xl w-full h-[14rem] object-cover' />
        </div>
        <div className='w-full h-auto sm:h-[13rem] flex flex-col text-white'>
            <div className='text-[2rem] font-medium text-theme'>{item.name}</div>
            <div className='text-lg'>{item.CategoryName}</div>
            <textarea readOnly={true} value={item.description.slice(0,100)} className='bg-transparent h-[5rem] py-1 w-full outline-none mt-2'/>
            <div className='flex justify-between sm:justify-start space-x-0 sm:space-x-4 mt-3'>
                <div className='bg-neutral-800 px-4 py-1 rounded-bl-xl rounded-md' >Half:{item.options.half}</div> 
                <div className='bg-neutral-800 px-4 py-1 rounded-md'>Full: {item.options.full}</div>
                <motion.div whileTap={{scale:0.97}} className='bg-red-500 px-4 py-1 rounded-md cursor-pointer rounded-br-xl sm:rounded-br-md' onClick={() => setModal(!modal)} >Remove</motion.div>
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
                className='h-[14rem] w-[84vw] sm:w-[26rem] bg-neutral-200 absolute left-3 rounded-2xl flex flex-col items-center justify-center'>
                    <div className='text-center text-lg px-2'>Are You sure You want to remove this item?</div>
                    <div className='flex space-x-3'>
                        <motion.div whileHover={{scale:1.04}} whileTap={{scale:0.97}} className='bg-red-600 text-white px-5 py-1 rounded-lg cursor-pointer mt-3' onClick={() => RemoveHandler(item._id)}>
                            {loading ? <MetroSpinner size={20} /> : 'Yes'}    
                        </motion.div>
                        <motion.div whileHover={{scale:1.04}} whileTap={{scale:0.97}} className='bg-black text-white px-5 py-1 rounded-lg cursor-pointer mt-3' onClick={() => setModal(false)}>No</motion.div>
                    </div>

                </motion.div> : <div></div>}
        </AnimatePresence>
    </div>
  )
}

export default Card
