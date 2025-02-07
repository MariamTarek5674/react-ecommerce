import React, { useEffect } from 'react';
import ProductCard from './components/ProductCard/ProductCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import EmptyState from './components/EmptyState/EmptyState';
import { fetchAllProducts,fetchPageProducts,setSortOption, loadMoreProducts ,sortProducts} from '../../lib/productsSlice';
import toast from 'react-hot-toast';
import ProductsLoadingSkeleton from './components/ProductsLoadingSkeleton/ProductsLoadingSkeleton';
import { useDispatch,useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Products() {
    const dispatch = useDispatch()
    const { allProductsCount, loadedProducts, currentPage, sortOption, loading, error,sortedProducts } = useSelector((state) => state.products);
    const {isAuthanticated} = useSelector((state)=>state.auth)
    const handleSortOptionChange=(option)=>{
        dispatch(setSortOption(option))
        dispatch(sortProducts())
    }
    useEffect(() => {
        dispatch(fetchAllProducts());
        dispatch(fetchPageProducts(1));
      }, []);
    
    useEffect(() => {
        setTimeout(()=>{
            dispatch(fetchPageProducts(currentPage));
        },300) // dummy timeout before fetching that take very slight time to show infinite scroll loading but not needed in real app
    }, [currentPage]);

    useEffect(()=>{ 
        dispatch(sortProducts())
    },[loadedProducts])

  if(error){
    toast.error(message);
  }

  if (loading) {
    return <ProductsLoadingSkeleton/>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className={`flex items-center pt-8 ${isAuthanticated? 'justify-between' : 'justify-end' }`}>
        {
          isAuthanticated && (
            <Link to='/create/product'>
               <button className='flex gap-2 items-center justify-center text-gray-700 text-sm font-semibold rounded-full cursor-pointer border-2 border-gray-700 whitespace-nowrap py-[.5rem] px-[1rem] hover:bg-gray-700 hover:text-white transition-all duration-300'>
                 <FontAwesomeIcon icon={faPlus}/> <span>Create Product</span> 
               </button>
            </Link>
          )
        }
        <div className="relative">
          <select
            className="appearance-none cursor-pointer bg-white border-2 border-black text-black font-semibold rounded-full text-sm py-2.5 pl-5 pr-8 focus:border-black outline-0 relative"
            value={sortOption}
            onChange={(e) => handleSortOptionChange(e.target.value)}
          >
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="category">Category</option>
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-sm">
            <FontAwesomeIcon icon={faChevronDown} className="text-black" />
          </div>
        </div>
      </div>
      {
        !loading && allProductsCount==0 ? <EmptyState/> : (
            <InfiniteScroll
               dataLength={sortedProducts.length}
               next={()=>dispatch(loadMoreProducts())}
               hasMore={loadedProducts.length < allProductsCount}
               loader={<div className="flex justify-center h-22 py-4"><span className="infinite-scroll-loader"></span></div>}
            >
               <div className="grid grid-cols-1 gap-10 md:gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                   {sortedProducts.map((product) => <ProductCard product={product} key={product.id} />)}
                </div>
            </InfiniteScroll>
        )
      }
    </div>
    
  );
}
