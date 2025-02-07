import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ProductDetailsSkeleton from './components/ProductDetailsSkeleton.jsx/ProductDetailsSkeleton';
import RatingStar from '../../components/Products/components/RatingStar/RatingStar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../lib/cartSlice';

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);
    const {isAuthanticated} = useSelector((state) => state.auth);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    async function fetchProductById(){
      try{
        setLoading(true)
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        if(response.status==200)
        setProduct(response.data);
        setLoading(false)
      }catch(error){
        console.log(error);
        setLoading(true)
      }
    }
    useEffect(()=>{
      fetchProductById();
    },[])
    if  (loading){
      return <ProductDetailsSkeleton/>
    }

    function handleAddToCart(){
      if(isAuthanticated){
        dispatch(addToCart(product))
      }else{
        navigate('/login')
      }
    }

  return (
    <>
    <div className='w-40 relative top-8'>
      <Link to='/'>
        <button className="flex gap-2 items-center justify-center rounded-full text-md w-full border-2 border-gray-500 text-gray-700 font-light whitespace-nowrap py-[.5rem] transition-all duration-300 hover:bg-gray-700 hover:border-gray-700 hover:text-white cursor-pointer">
          <FontAwesomeIcon icon={faCaretLeft}/>
          <span>Back to home</span>
        </button>
      </Link>
    </div>
    <section className="px-6 md:px-28 py-30 flex flex-col items-center justify-center">
        <div className='lg:flex gap-6 h-full items-center justify-center'>
            <div className="lg:w-1/3 h-80 p-2">
                <img src={product.image} alt={product.title} className="object-contain h-full w-full" />
            </div>
            <div className="lg:w-2/3 md:p-6 flex flex-col gap-4 text-left">
                <h2 className="text-3xl font-bold">{ product?.title }</h2>
                <p className="text-lg font-thin">{ product?.description }</p>
                <RatingStar productRate={product?.rating?.rate}/>
                <p className="text-lg">{ product?.price } EGP</p>
                <button className="text-lg w-full border-2 border-black font-bold whitespace-nowrap py-[.5rem] px-[1rem] transition-all duration-300 hover:bg-gray-700 hover:text-white cursor-pointer"
                  onClick={()=>handleAddToCart()}>
                  Add To Cart +
                </button>
            </div>
        </div>
    </section>
    </>
  )
}
