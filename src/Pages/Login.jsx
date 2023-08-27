import React,{ useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { RxCross2 } from 'react-icons/rx'
import { motion } from 'framer-motion'
import Url from '../Url'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MetroSpinner } from 'react-spinners-kit'

function Login() {
  const navigate = useNavigate()
  const [ password, setPassword ] = useState('')
  const [toggle, setToggle] = useState(false)
  const [loading, setLoading ] = useState(false)

  useEffect(() => {
    localStorage.getItem('token') && navigate('/orders')
  },[])

  const SubmitHandler = async(e) => {
    e.preventDefault();
    setLoading(true)
    const response = await fetch(`${Url}/login`,{
      method:"POST",
      headers:{
        "Content-Type":'application/json'
      },
      body:JSON.stringify({
        email:'business@gmail.com',
        password:password
      })
    });
    // console.log(response)
    const data = await response.json();

    if(data.sucess){
      setLoading(false)
      localStorage.setItem('token', data.token)
      navigate('/orders')
    }else{
      setLoading(false)
      toast.error("Invalid Key, Try Again")
    }
  }

  
  return (
    <div className="w-full min-h-screen flex flex-col items-center lg:items-start lg:flex-row overflow-hidden py-5 md:pl-16 bg-neutral-900 font-poppins relative ">
      <div className="w-[90%] md:w-[60%] lg:w-[35%] xl:w-[45%] lg:h-[100vh] flex items-center translate-x-0 md:-translate-x-20 lg:translate-x-0">
        <div className="bg-theme -translate-x-7 md:translate-x-0 scale-[0.7] md:scale-[0.95] rounded-full shadow-lg shadow-black">
          <img alt="" src="https://res.cloudinary.com/de2rges3m/image/upload/v1681362581/gofood/anh-nguyen-kcA-c3f_3FE-unsplash-PhotoRoom.png-PhotoRoom_zzg0qr.png" className="scale-[1.45]  md:scale-[1.4] -translate-y-1 translate-x-24 md:translate-x-32 lg:translate-x-40 rounded-full" />
        </div>
      </div>
      <div className="lg:h-[100vh] flex flex-col items-center lg:justify-center lg:ml-44">
        <div className=" text-[30px] lg:text-[42px] xl:text-[50px] mb-8 lg:mb-6 font-medium text-white text-center w-full mt-0 md:mt-12 lg:mt-0">
          Login to <span className="text-theme">Vyanjan-B</span>
        </div>
        <form onSubmit={SubmitHandler} className="flex flex-col text-white w-[21rem] lg:w-[24rem] xl:w-[25rem] space-y-4">
          <div className="relative bg-theme rounded-full  flex justify-center "> 
            <input required className="group py-2 px-3 bg-neutral-800 rounded-full w-full outline-none focus:w-[20rem]  lg:focus:w-[23rem] xl:focus:w-[24rem] duration-300 text-center transition-all scale-x-[1.015]" placeholder="Key" type={`${!toggle? 'password': 'text'}`} onChange={(e) => setPassword(e.target.value)} />
            <span className={`absolute right-3 bottom-0 top-2.5`} onClick={() => setToggle(!toggle)}><div className={`-mt-0.5 ${toggle && 'text-red-500' } cursor-pointer transition-colors duration-200`}>👁️</div></span>
          </div>
          <div className="flex justify-between">
            <div className="text-[12px]">Visit the Client side?{' '}
            <a href='https://vyanjan.vercel.app/' target='_blank'>
             <span className="text-theme underline cursor-pointer">Vyanjan</span>
            </a>
            </div>
            <motion.div whileTap={{scale:0.97}}><button className="bg-theme flex justify-center py-2 rounded-full cursor-pointer hover:outline w-[7rem] outline-[2px] h-[2.5rem]">{loading ? <MetroSpinner size={25} color="#fff"/> :'Proceed'}</button></motion.div>
          </div>
        </form>
        <ToastContainer
            position='bottom-right'
            theme='light'
            closeOnClick={true}
            icon="🧨"
        />
      </div>
    </div>
  )
}

export default Login