import React,{useState} from 'react'
import { BiRupee } from 'react-icons/bi'
import { MdCurrencyRupee } from 'react-icons/md'
import { AnimatePresence, motion } from 'framer-motion'
import Url from '../Url'
import axios from 'axios'
import { MdExpandMore } from 'react-icons/md'
import { ToastContainer, toast } from 'react-toastify'

const OrderItems = ({item, setRecall}) => {
    const [toggle , setToggle ] = useState(false)
    const [status, setStatus ] = useState('')

    const SubmitHandler = async(id) => {
        await axios.post(`${Url}/upstatus`,{
            id:id,
            status:status,
        }).catch(err => {
            toast.error("Some Error Occoured")
        })
        setRecall(old => !old)
        setToggle(false)
    }

    const statusMenu = {
        hidden:{
            clipPath:"inset(0% 0% 100% 0%)"
        },
        visible:{
            clipPath:"inset(0% 0% 0% 0%)"
            
        }
    }


  return (
    <div>
        <div className='pl-7 pt-3 pb-6 text-lg'>
            <div className=' text-white w-fit md:flex md:flex-wrap space-y-2 md:space-y-0 space-x-0 md:space-x-5 max-w-[19rem] sm:max-w-none '>
                <div className='bg-neutral-800 shadow-black shadow-sm px-4 py-2 rounded-xl capitalize'>From: {item.name}</div>
                <div className='bg-neutral-800 shadow-black shadow-sm px-4 py-2 rounded-xl'>Location: {item.location}</div>
                <div className='bg-neutral-800 shadow-black shadow-sm px-4 py-2 rounded-xl'>Phone Number: {item.phone}</div>
                <div className='bg-neutral-800 shadow-black shadow-sm px-4 py-2 rounded-xl flex items-center'>Total: <MdCurrencyRupee/>{item.total}</div>
                <div className='relative w-[14rem]'>
                    <div className={`bg-theme text-black shadow-black shadow-sm px-4 py-2 rounded-xl flex items-center justify-center select-none`} 
                    onClick={() => {
                        setToggle(!toggle)
                        setStatus('')
                    }}
                    > Update Status<MdExpandMore className={`ml-2 ${toggle? 'rotate-180' : 'rotate-0'} transition-all duration-300 `} size={25} /> </div>
                    <AnimatePresence>
                        {toggle && 
                        <motion.div key="status" initial='hidden' animate='visible' exit='hidden' variants={statusMenu} transition={{duration:0.3, type:'spring'}} className=' z-20 absolute w-[14rem] h-[16.4rem] bg-neutral-800 overflow-hidden rounded-xl top-14 px-2 py-2 space-y-2'>
                            <div className={`w-full text-center py-2 cursor-pointer rounded-lg ${status === "Preparing" && 'bg-neutral-900'} transition-colors hover:bg-neutral-900`} onClick={() => setStatus('Preparing')}>🍳 Preparing</div>
                            <div className={`w-full text-center py-2 cursor-pointer rounded-lg ${status === "Arriving" && 'bg-neutral-900'} transition-colors hover:bg-neutral-900`} onClick={() => setStatus('Arriving')}>🛵 Out For Delivery</div>
                            <div className={`w-full text-center py-2 cursor-pointer rounded-lg ${status === "Delivered" && 'bg-neutral-900'} transition-colors hover:bg-neutral-900`} onClick={() => setStatus('Delivered')}>📦 Delivered</div>
                            <div className={`w-full text-center py-2 cursor-pointer rounded-lg ${status === "Rejected" && 'bg-red-600'} transition-colors hover:bg-red-600`} onClick={() => setStatus('Rejected')}>❌ Reject Order</div>
                            {!!status && <div className='flex justify-end'><motion.div whileHover={{scale:1.03}} whileTap={{scale:1}}  className='w-fit select-none bg-theme px-4 py-1 rounded-lg cursor-pointer' onClick={() => SubmitHandler(item._id)} >Confirm</motion.div></div>}
                        </motion.div>}
                    </AnimatePresence>
                </div>
            </div>
        </div>

        <div  className='w-[100%] flex flex-col items-center 2md:grid 2xl:grid-cols-3 2md:grid-cols-2 2md:gap-y-7 px-7 border-b border-dashed pb-12 border-neutral-600'>
            {item.items.map((data, indexes) => (
                <div className='-mb-10 xxs:mb-2 sm:mb-0 scale-[0.7] xxs:scale-[0.9] md:scale-[0.8] translate-x-0 md:-translate-x-9 lg:translate-x-0 lg:scale-100 h-[15rem] bg-neutral-900 text-white w-[29.5rem] rounded-3xl flex overflow-hidden shadow-[1px_1px_10px_0px] shadow-black' key={indexes}>
                <img alt='Not Found' src={data.img} className='w-[14rem] h-[15rem] object-cover' />
                <div className='flex-1 px-3 p-2 mt-3'>
                <div className='text-2xl text-theme font-[400] '>
                    {data.name}
                </div>
                <div className=' flex flex-col space-y-2'>
                    <div className='text-white mb-2'>{data.CategoryName}</div>
                    <div className='grid grid-cols-2 place-items-center scale-95 gap-x-4 gap-y-2.5 text-black'>
                    <div className='bg-neutral-800 text-white w-[7rem] text-center py-3 rounded-l-xl rounded-tr-xl'>Amount= {data.amount}</div>
                    <div className='bg-neutral-800 text-white w-[7rem] text-center py-3 rounded-tl-xl rounded-r-xl'>Size= {data.size}</div>
                    <div className='bg-neutral-800 text-white w-[7rem] text-center py-3 rounded-l-xl rounded-br-xl flex items-center justify-center'>Total=<BiRupee/>{(data.size === 'half')? data.options.half*data.amount : data.options.full*data.amount}</div>
                    <div className='bg-green-500 w-[7rem] text-center py-3 rounded-r-xl rounded-bl-xl flex items-center justify-center'>{(item.status)}</div>
                    </div>
                </div>
                </div>
            </div>
            ))}
        </div>
        <ToastContainer position='bottom-right' autoClose={500} />
    </div>
  )
}

export default OrderItems
