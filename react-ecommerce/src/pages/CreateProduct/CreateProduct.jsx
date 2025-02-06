import React, { useEffect, useState } from 'react'
import  * as Yup from 'yup'
import { useFormik } from "formik";
import axios from 'axios';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload,faChevronDown,faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

export default function CreateProduct() {
    const [sumbitLoading, setSumbitLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [isCategoriesLoading, setIsCategoriesLoading] = useState(false)

    async function handleCreateProduct(values,{ resetForm }){
        try{            
            setSumbitLoading(true)
            let response = await axios.post('https://fakestoreapi.com/products',{
                body:values
            })
            if(response.status==200){
                toast.success('Product created successfully!')
                resetForm()
            }
            setSumbitLoading(false)
        }catch(error){
            console.log(error);
            setSumbitLoading(false)
            toast.error(error.message)
        }
    }
    async function fetchCategories() {
        try {
            setIsCategoriesLoading(true)
            let response = await axios.get('https://fakestoreapi.com/products/categories')
            setCategories(response.data)
            setIsCategoriesLoading(false)            
        }catch(error){
            console.log(error);
            setIsCategoriesLoading(false)
            toast.error(error.message)
        }
    }

    let validationSchema= Yup.object().shape({
        title: Yup.string()
          .min(3,'Title must be at least 3 characters')
          .max(100,'Title must not exceed 100 characters')
          .required('Title is required'),
        description: Yup.string()
          .min(10, 'Description must be at least 10 characters')
          .max(500, 'Description must not exceed 500 characters')
          .required('Description is required'),
        price: Yup.number()
          .typeError('Price must be a number')
          .positive('Price must be a positive value')
          .min(1, 'Price must be at least 1')
          .required('Price is required'),
        category: Yup.string()
          .required('Category is required'),
        image: Yup.string()
          .trim()
          .url("Must be a valid URL")
          .required("Image URL is required")
    })
    let formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            price: '',
            category: '',
            image: ''
        },
        validationSchema,
        onSubmit: (values,{ resetForm })=>handleCreateProduct(values,{ resetForm })
    })

    useEffect(()=>{
        fetchCategories()
    },[])

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
    <div className='flex flex-col p-12 gap-4 w-[95%] md:w-[70%] mx-auto'>
        <div className='py-5 text-2xl font-semibold text-black font-sans font-stretch-expanded'>
            Create Product
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-6">
            <div className="flex flex-col gap-4">
              <input
                className={`text-sm px-4 py-3 rounded-lg w-full  focus:bg-white  border border-gray-200 focus:outline-none ${formik.touched.title && formik.errors.title ? 'focus:border-red-500 border-red-500' : 'focus:border-green-500 border-gray-400'}`}
                type="text"
                name="title"
                id="title"
                placeholder="Title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
              <p className="text-red-500 text-xs text-left px-2 text-wrap"> 
                 {formik.touched.title && formik.errors.title ? formik.errors.title : ""}
              </p>
            </div>
            <div className="relative flex flex-col gap-4">
              <textarea
                className={`text-sm px-4 py-3 rounded-lg w-full focus:bg-white border border-gray-200 focus:outline-none ${formik.touched.description && formik.errors.description ? 'focus:border-red-500 border-red-500' : 'focus:border-green-500 border-gray-400'}`}
                type='text'
                name="description"
                id="description"
                placeholder="Description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                rows={4}
              />
              <p  className="text-red-500 text-xs text-left px-2">
              {formik.touched.description && formik.errors.description ? formik.errors.description : ""}
              </p>
            </div>
            <div className="relative flex flex-col gap-4">
              <input
                className={`text-sm px-4 py-3 rounded-lg w-full focus:bg-white border border-gray-200 focus:outline-none ${formik.touched.price && formik.errors.price ? 'focus:border-red-500 border-red-500' : 'focus:border-green-500 border-gray-400'}`}
                type='number'
                name="price"
                id="name"
                placeholder="Price"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
              />
              <p  className="text-red-500 text-xs text-left px-2">
              {formik.touched.price && formik.errors.price ? formik.errors.price : ""}
              </p>
            </div>
            <div className="relative flex flex-col gap-4">
              <select
                className={`appearance-none text-sm px-4 py-3 rounded-lg w-full focus:bg-white  border border-gray-200 focus:outline-none ${formik.touched.category && formik.errors.category ? 'focus:border-red-500 border-red-500' : 'focus:border-green-500 border-gray-400'}`}
                type='text'
                name="category"
                id="category"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.category}
              >
                <option value="" disabled>Select Category</option>
                   {isCategoriesLoading ? (
                     <option>Loading categories...</option>
                    ) : (
                    categories.map((category, index) => (
                       <option key={index} value={category}>{category}</option>
                    ))
                    )}
                </select>
                <div className="absolute right-5 transform  top-1/5 pointer-events-none text-sm">
                   <FontAwesomeIcon icon={faChevronDown} className="text-gray-500 text-xs" />
                </div>
                <p  className="text-red-500 text-xs text-left px-2">
                   {formik.touched.category && formik.errors.category ? formik.errors.category : ""}
                </p>
            </div>
            <div className="relative flex flex-col gap-4">
              <input
                className={`text-sm px-4 py-3 rounded-lg w-full  focus:bg-white border border-gray-200 focus:outline-none ${formik.touched.image && formik.errors.image ? 'focus:border-red-500 border-red-500' : 'focus:border-green-500 border-gray-400'}`}
                type='text'
                name="image"
                id="image"
                placeholder="Image"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.image}
              />
              <p  className="text-red-500 text-xs text-left px-2">
              {formik.touched.image && formik.errors.image ? formik.errors.image : ""}
              </p>
            </div>
            <div>
              <button type="submit"
                disabled={sumbitLoading}
                className={`w-1/2 md:w-1/5 rounded-full flex justify-center text-gray-100 p-3 tracking-wide font-semibold transition ease-in duration-500
                   ${sumbitLoading ? "bg-red-500 hover:cursor-not-allowed" : "bg-red-800 hover:bg-red-700 cursor-pointer"}`}>
                  {sumbitLoading?
                     <span> loading  <FontAwesomeIcon icon={faUpload} className="fa-beat-fade" /> </span>
                    : "Create"
                   }
              </button>
            </div>
          </div>
        </form>
    </div>
    </>
    
  )
}
