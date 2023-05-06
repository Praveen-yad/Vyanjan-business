import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Url from '../Url'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useSelector } from 'react-redux'
import { MdClose, MdExpandMore } from 'react-icons/md'
import { FcAddImage } from 'react-icons/fc'
import Card from '../components/Card'
import { AnimatePresence, motion } from 'framer-motion'
import { ToastContainer, toast } from 'react-toastify'
import { change } from '../store/ToggleSlice'
import { useDispatch } from 'react-redux'
import { MetroSpinner } from 'react-spinners-kit'

const Items = () => {
    const dispatch = useDispatch()
    const [data, setdata] = useState([])
    const toggle = useSelector(state => state.toggle)
    const [add, setAdd ] = useState(false)
    const [newadd, setNewadd ] = useState(false)
    const [category, setCategory ] = useState(false)
    const [verify, setVerify ] = useState()
    
    const [name, setName] = useState('')
    const [categories, setCategories] = useState('')
    const [description, setDescription] = useState('')
    const [half, sethalf] = useState()
    const [full, setfull] = useState()
    const [imageurl, setImageurl] = useState('')
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const ApiCall = async() => {
            const json = await axios.post(`${Url}/allFood`,{
                token: localStorage.getItem('token')
            })
            if(json.data.verify){
                setdata(json.data.item)
                setVerify(json.data.verify)
            }
        }
        ApiCall();
    },[toggle])

    const animate ={
        hidden:{
            scale:0.2,
            y:-200,
            clipPath: "inset(0% 50% 100% 50%)"
        },
        visible:{
            scale:1,
            y:0,
            clipPath: "inset(0% 0% 0% 0%)"
        }
    }

    const menu = {
        hidden:{
            clipPath:"inset(0% 0% 100% 0%)"
        },
        visible:{
            clipPath:"inset(0% 0% 0% 0%)"
        }
    }

    const HandelFile = (e) => {
        const file = e.target.files[0]
        Next(file)    
    }

    const Next = (file) => {
        const reader = new FileReader()
        if(file){
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                setImageurl(reader.result)
            }
        }
    }

    const SubmitForm = async(e) => {
        e.preventDefault();
        setLoading(true)
        await axios.post(`${Url}/items`,{
            name:name,
            CategoryName:categories,
            description:description,
            img:imageurl,
            options:{
                half:half,
                full:full
            }
        }).then(res => {
            setLoading(false)
            dispatch(change())
            toast.success("Item Added")
            setAdd(false)
            setTimeout(()=>{
                setNewadd(false)
            },300)
            setName('')
            setCategories('')
            sethalf()
            setfull()
            setDescription('')
        }).catch(err => {
            toast.error("Error Occoured")
            setLoading(false)
        })
    }

  return (
    <div className='relative w-full min-h-screen font-poppins bg-neutral-900 flex flex-col'>
        <Navbar/>
        <div className='flex items-center justify-between px-7'>
            <div className='text-neutral-300 mt-4 text-[2.4rem] font-medium'>All Items</div>
            <motion.div whileHover={{scale:1.018}} whileTap={{scale:0.985}} onClick={() =>{
                setAdd(!add)
                setNewadd(!newadd)
            }}
            className={`text-lg mt-4  text-white bg-theme px-3 py-1 rounded-lg cursor-pointer`}>Add New Item</motion.div>
            {verify && newadd && 
                <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 backdrop-blur-sm z-30 '>
                    <div className='w-full sticky top-0 h-[100vh] flex items-center justify-center' >
                        <AnimatePresence>
                            {add && 
                            <motion.div key='some'
                             initial="hidden" 
                             animate="visible" 
                             exit='hidden'
                             variants={animate} 
                             transition={{type:'spring', duration:0.5}} 
                             className='w-[36rem] rounded-3xl h-[30.3rem] bg-neutral-200 mt-20 p-3 flex flex-col z-40'>
                                <div className='flex justify-end'><MdClose size={30} className='hover:bg-black hover:bg-opacity-25 rounded-full p-1 scale-110' onClick={() => {
                                    setAdd(false)
                                    setTimeout(()=>{
                                        setNewadd(false)
                                    },300)
                                    }}/></div>
                                <form onSubmit={SubmitForm} className='space-y-4 mx-3'>
                                    <div>
                                        <label>Dish Name</label>
                                        <input value={name} required onChange={(e) => setName(e.target.value)} placeholder='Name' className='w-full outline-none bg-transparent border border-black py-1 px-3 rounded-lg' />
                                    </div>
                                    <div>
                                        <div className='flex justify-between pr-1'>
                                            <label>Description</label>
                                            {(description.length <= 99) ? 
                                            <div className='flex items-center'><div className='w-2 h-2 mr-1 bg-green-500 rounded-full'></div>{description.length}</div>
                                            : 
                                            <div className='flex items-center'><div className='w-2 h-2 mr-1 bg-red-500 rounded-full'></div>{description.length}</div>}
                                        </div>
                                        <textarea value={description} required onChange={(e) => setDescription(e.target.value)} maxLength={100} placeholder='Describe it a Bit' className='w-full h-[4.4rem] outline-none bg-transparent border border-black py-2 px-3 rounded-lg' />
                                    </div>
                                    <div className='flex justify-between'>
                                        <div className='relative w-fit mt-1'>
                                            <input required value={categories} onChange={console.log()} className='absolute py-2 w-[12rem] rounded-lg bg-transparent -z-10 outline-none' />
                                            <motion.div className='z-10 bg-theme w-[12rem] justify-center py-2 flex items-center rounded-lg cursor-pointer select-none' onClick={() => setCategory(!category)} whileHover={{scale:1.02}} whileTap={{scale:0.99}}>Category <MdExpandMore size={23} className={` ml-2 ${category ? 'rotate-180' : 'rotate-0'} transition-all duration-300 `}/></motion.div>
                                            <div className='absolute right-1 translate-y-1'>{categories}</div>
                                            <AnimatePresence>
                                            {category && 
                                                <motion.div key={'category'} animate='visible' initial="hidden" exit="hidden" variants={menu} transition={{type:"spring", duration:0.3, }} className=' z-50 w-[12rem] text-white bg-neutral-800 top-12 absolute overflow-hidden rounded-xl space-y-1 p-1'>
                                                    <div className={`w-full text-lg py-2 flex items-center justify-center hover:bg-theme ${categories === "Indian" && 'bg-theme'} transition-colors rounded-lg cursor-pointer`} onClick={() => {
                                                        setCategories('Indian')
                                                        setCategory(false)
                                                    }}>Indian</div>
                                                    <div className={`w-full text-lg py-2 flex items-center justify-center hover:bg-theme ${categories === "Italian" && 'bg-theme'} transition-colors rounded-lg cursor-pointer`} onClick={() => {
                                                        setCategories('Italian')
                                                        setCategory(false)
                                                    }}>Italian</div>
                                                    <div className={`w-full text-lg py-2 flex items-center justify-center hover:bg-theme ${categories === "Mexican" && 'bg-theme'} transition-colors rounded-lg cursor-pointer`} onClick={() => {
                                                        setCategories('Mexican')
                                                        setCategory(false)
                                                    }}>Mexican</div>
                                                </motion.div>}
                                            </AnimatePresence>
                                        </div>
                                        <div className='w-[16rem] flex items-center justify-between'>
                                            <div className='flex items-center'>Half
                                                <input type='number' onChange={(e) => sethalf(e.target.value)} required value={half} placeholder='Price' className='w-[5rem] ml-2 bg-transparent outline-none border border-black px-2 py-1 rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' /></div>
                                            <div className='flex items-center'>Full
                                                <input value={full} onChange={(e) => setfull(e.target.value)} required type='number' placeholder='Price' className='w-[5rem] ml-2 bg-transparent outline-none border border-black px-2 py-1 rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' /></div>
                                        </div>
                                    </div>
                                    <div className='flex justify-between'>
                                        <div className='w-[12rem] flex flex-col justify-center space-y-3 items-center '>
                                            <div className='group flex flex-col items-center relative w-full'>
                                                <input required type='file' className='outline-none absolute top-[5px] rounded-lg scale-y-[1.3] w-full z-20 opacity-0 bg-red-500' onChange={(e) => HandelFile(e)} />
                                                <motion.div className='cursor-pointer bg-theme group-hover:scale-[1.02] transition-transform duration-200 ease-in-out  w-full text-center py-2 rounded-lg select-none'>Upload Image</motion.div>
                                            </div>
                                            <motion.button whileHover={{scale:1.02}} whileTap={{scale:1}} className='w-full py-2 rounded-lg h-[2.5rem] bg-sky-500 flex justify-center text-center'>{loading ? <MetroSpinner size={25} color="#fff"/> : 'Submit'  }</motion.button>
                                        </div>
                                        <div className='w-[16rem] mt-2 h-[10rem] border-2 border-dashed border-theme flex flex-col items-center justify-center rounded-2xl text-lg p-1'>
                                            {imageurl ? 
                                            <img src={imageurl} className=' h-full w-full rounded-xl object-cover' />
                                            :
                                            <FcAddImage size={50}/>
                                            }
                                            
                                        </div>
                                    </div>
                                </form>
                            </motion.div>}
                        </AnimatePresence>
                    </div>
                </div>
            }
        </div>
        <div className=' grid grid-cols-1 md:grid-cols-2 gap-10 mt-3 mb-5 mx-8'>
            {data.slice(0).reverse().map((item, index) => (
                <Card item={item} key={index} />
                ))}
        </div>
        <ToastContainer position='bottom-right' />
        <Footer/>
    </div>
  )
}

export default Items
