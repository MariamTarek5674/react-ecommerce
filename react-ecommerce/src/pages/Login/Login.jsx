import { useFormik } from 'formik';
import image from '../../assets/familyShopping.png'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { useDispatch } from 'react-redux';
import { login } from '../../lib/authSlice';
import { useState } from 'react';

export default function Login(values) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setloading] = useState(false)

    async function handleLoginIn(values){  
        setloading(true)      
        let response = await dispatch(login(values))
        if(response?.meta?.requestStatus == 'fulfilled')
           navigate('/')    
        setloading(false)
    }

    const validationSchema = Yup.object().shape({
        userName: Yup.string()
        .matches(/^[a-zA-Z0-9._]{3,20}$/, "Username must be 3-20 characters and can only include letters, numbers, and underscores")
        .required("Username is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    })
    const formik = useFormik({
        initialValues:{
            userName:'',
            password:''
        },
        validationSchema,
        onSubmit: handleLoginIn
    })

  return (
    <div className="bg-gray-100 absolute top-0 left-0 right-0 leading-5 h-auto w-full overflow-hidden min-h-screen z-0">
    <div
      className="relative min-h-screen md:w-[80%] flex flex-col md:flex-row justify-center items-center m-auto gap-4 py-5">
      <div className=" w-full flex items-center justify-center md:h-80 lg:w-1/2">
        <img src={image} className='object-contain' alt=""/>
      </div>
     <div className="w-full md:w-1/2 flex justify-center items-center m-auto ">
      <div className="p-12 bg-white mx-auto rounded-3xl min-w-96 max-w-96">
        <div className="mb-7">
          <h3 className="font-semibold text-2xl text-gray-800">Sign In</h3>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-4">
            <div className="flex flex-col gap-4">
              <input
                className={`w-full text-sm px-4 py-3 bg-white  border border-gray-200 rounded-lg focus:outline-none ${formik.touched.userName && formik.errors.userName ? 'border-red-500':'focus:border-green-500'}`}
                type="text"
                id='username'
                name='userName'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userName}
                placeholder="Username"
              />
              <p className="text-red-500 text-xs text-left px-2 text-wrap">
                 {formik.touched.userName && formik.errors.userName ? formik.errors.userName : ""}
              </p>
            </div>
            <div className="relative flex flex-col gap-4">
              <input
                className={`text-sm px-4 py-3 rounded-lg w-full bg-white  border border-gray-200 focus:outline-none ${formik.touched.password && formik.errors.password ? 'border-red-500':'focus:border-green-500'}`}
                placeholder="Password"
                id='password'
                name='password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <p className="text-red-500 text-xs text-left px-2 ">
                {formik.touched.password && formik.errors.password ? formik.errors.password : ""}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm ml-auto">
                <Link to='/' className="text-red-700 hover:text-red-600 underline underline-offset-3">Continue as a Guest?</Link>
              </div>
            </div>
            <div>
              <button type="submit"
                className="w-full flex justify-center bg-red-800 hover:bg-red-700 text-gray-100 p-3 rounded-full tracking-wide font-semibold cursor-pointer transition ease-in duration-500"
                disabled={loading}>
                Sign in
              </button>
            </div>
          </div>
        </form>
      </div>
     </div>
  </div>
</div>
  )
}
