import React, {useState} from 'react'
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'
import { BsFillBagCheckFill } from 'react-icons/bs'
import Link from 'next/link'
import Head from 'next/head'
import Script from 'next/script'

const checkout = ({ cart, subTotal, addToCart, removeFromCart }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [pincode, setPincode] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [disabled, setDisabled] = useState(true)

  const handleChange = (e) => {
    if (e.target.name == 'name') setName(e.target.value)
    else if (e.target.name == 'email') setEmail(e.target.value)
    else if (e.target.name == 'phone') setPhone(e.target.value)
    else if (e.target.name == 'address') setAddress(e.target.value)
    else if (e.target.name == 'pincode') setPincode(e.target.value)

    if (name && email && phone && address && pincode) setDisabled(false)
    else setDisabled(true)
  }

  const initiatePayment = async () => {
    let oid = Math.floor(Math.random() * Date.now());
    /* Get a transaction token */
    const data = { cart, subTotal, oid, email: "email" }
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    let txnRes = await a.json()
    console.log(txnRes);
    let txnToken = txnRes.txnToken;

    var config = {
      "root": "",
      "flow": "DEFAULT",
      "data": {
      "orderId": oid, /* update order id */
      "token": txnToken, /* update token value */
      "tokenType": "TXN_TOKEN",
      "amount": subTotal /* update amount */
      },
      "handler": {
        "notifyMerchant": function(eventName,data){
          console.log("notifyMerchant handler function called");
          console.log("eventName => ",eventName);
          console.log("data => ",data);
        } 
      }
    };

    // initialze configuration using init method 
    window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
        // after successfully updating configuration, invoke JS Checkout
        window.Paytm.CheckoutJS.invoke();
    }).catch(function onError(error){
        console.log("error => ",error);
    });
  }


  return (
    <div className='container px-2 sm:m-auto'>
      <Head><meta name='viewport' content='width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0'/></Head>
      <Script type='application/javascript' crossOrigin='anonymous' src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchant/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`} />
      <h1 className='font-bold text-3xl my-8 text-center'>Checkout</h1>
      <h2 className='font-semibold text-xl'>1. Delivery Details</h2>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor='name' className='leading-7 text-sm text-gray-600'>Name</label>
            <input onChange={handleChange} value={name} type='text' id='name' name='name' className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'/>
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor='email' className='leading-7 text-sm text-gray-600'>Email</label>
            <input onChange={handleChange} value={email} type='email' id='email' name='email' className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'/>
          </div>
        </div>
      </div>
      <div className="px-2 w-full">
        <div className="mb-4">
          <label htmlFor='address' className='leading-7 text-sm text-gray-600'>Address</label>
          <textarea onChange={handleChange}  value={address} id='address' name='address' className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' style={{'resize': 'none'}}></textarea>
        </div>
      </div>

      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor='phone' className='leading-7 text-sm text-gray-600'>Phone</label>
            <input onChange={handleChange} value={phone} type='phone' id='phone' name='phone' className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'/>
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor='pincode' className='leading-7 text-sm text-gray-600'>Pincode</label>
            <input onChange={handleChange} value={pincode} type='text' id='pincode' name='pincode' className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'/>
          </div>
        </div>
      </div>

      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor='state' className='leading-7 text-sm text-gray-600'>State</label>
            <input value={state} type='text' id='state' name='state' className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' readOnly/>
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor='city' className='leading-7 text-sm text-gray-600'>City</label>
            <input value={city} type='text' id='city' name='city' className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' readOnly/>
          </div>
        </div>
      </div>

      <h2 className='font-semibold text-xl'>2. Review Cart Items & Pay</h2>

      <div className="sidecart p-6 m-2">
            <ol className='list-decimal font-semibold'>
                {Object.keys(cart).length === 0 && <div className='my-4 font-semibold'>Cart is Empty</div>}
                {Object.keys(cart).map((k)=> { return (<li key={k}>
                    <div className="item flex my-5">
                        <div className='font-semibold'>{cart[k].name} ({cart[k].size}/{cart[k].variant})</div>
                        <div className='flex items-center justify-center w-1/3 font-semibold text-lg'><AiFillMinusCircle onClick={() => {removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)}} className='cursor-pointer text-indigo-500' /><span className='mx-2 text-sm'>{cart[k].qty}</span><AiFillPlusCircle onClick={() => {addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)}} className='cursor-pointer text-indigo-500' /></div>
                    </div>
                </li>)})}
            </ol>
            <span className="font-bold">Subtotal: ₹{ subTotal }</span>
        </div>
        <div className="mx-4">
        <Link href={'/checkout'}><button disabled={disabled} onClick={initiatePayment} className="disabled:bg-indigo-300 flex mr-2 text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm font-semibold"><BsFillBagCheckFill className='m-1' />Pay ₹{subTotal}</button></Link>
        </div>
    </div>
  )
}

export default checkout