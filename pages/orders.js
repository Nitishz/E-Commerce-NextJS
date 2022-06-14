import { React, useEffect } from 'react'
import { useRouter } from 'next/router'
import Order from '../models/Order'
import mongoose from 'mongoose'


const orders = () => {
    const router = useRouter();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push('/')
        }
    }, [])

    return (
        <div>
            <h1 className='font-semibold text-center text-2xl p-8'>My Orders</h1>
            <div className="container mx-auto">
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-center">
                                    <thead className="border-b bg-gray-800">
                                        <tr>
                                            <th scope="col" className="text-sm font-medium text-white px-6 py-4">#</th>
                                            <th scope="col" className="text-sm font-medium text-white px-6 py-4">First</th>
                                            <th scope="col" className="text-sm font-medium text-white px-6 py-4">Last</th>
                                            <th scope="col" className="text-sm font-medium text-white px-6 py-4">Handle</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">Mark</td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">Otto</td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">@mdo</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }

    let orders = await Order.find()

    return {
        props: { orders: orders }
    }
}


export default orders