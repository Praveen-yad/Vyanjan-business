import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import Footer from '../components/Footer'
import Url from '../Url'
import OrderItems from '../components/OrderItems'
import { MetroSpinner } from 'react-spinners-kit'


const Home = () => {
    const [ array, setArray ] = useState([])
    const [token, setToken ] = useState()
    const [recall, setRecall ] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const apiCall = async() => {
            setLoading(true)
            const response = await axios.post(`${Url}/allOrders`,{
                token: localStorage.getItem('token')
            })
            console.log(array)
            setArray(response.data.json)
            setToken(response.data.sucess)
            setLoading(false)
        }
        apiCall();
    }, [recall])

  return (
    <div className='min-h-screen bg-neutral-900 font-poppins'>
    <Navbar/>
    <div className='text-4xl text-white pt-4 pl-3 pb-6 font-medium'>Orders</div>
    {loading ? 
    <div className=' flex flex-col justify-center items-center w-full h-[70vh] text-white space-y-2'>
        <MetroSpinner size={50} color="#fff"/>
        <div>Loading..</div>
    </div> 
        :
    <div>
    {token && <div className='space-y-6 pb-10 min-h-screen relative'>
        {array  && array.slice(0).reverse().map((item) =>(
            item.status !== 'Delivered' && <OrderItems item={item} key={item._id} setRecall={setRecall}/>
        ))}
        </div>
    }
    </div>
    }
  <Footer/>
</div>
  )
}

export default Home
