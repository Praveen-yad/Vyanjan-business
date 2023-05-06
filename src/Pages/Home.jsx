import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import Footer from '../components/Footer'
import Url from '../Url'
import OrderItems from '../components/OrderItems'

const Home = () => {
    const [ array, setArray ] = useState([])
    const [token, setToken ] = useState()
    const [recall, setRecall ] = useState(false)

    useEffect(() => {
        const apiCall = async() => {
            const response = await axios.post(`${Url}/allOrders`,{
                token: localStorage.getItem('token')
            })
            setArray(response.data.json)
            setToken(response.data.sucess)
        }
        apiCall();
    }, [recall])

  return (
    <div className='min-h-screen bg-neutral-900 font-poppins'>
    <Navbar/>
    {token && <div className=''>
        <div className='text-4xl text-white pt-4 pl-3 pb-6 font-medium'>Orders</div>
    </div>}
    {token && <div className='space-y-6 pb-10 min-h-screen relative'>
        {array  && array.slice(0).reverse().map((item, index) =>(
            item.status !== 'Delivered' && <OrderItems item={item} key={index} setRecall={setRecall}/>
        ))}
    </div>
    }
  <Footer/>
</div>
  )
}

export default Home
