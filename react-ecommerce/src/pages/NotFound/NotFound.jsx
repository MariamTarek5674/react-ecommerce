import { faBan,faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function NotFound() {
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
      <div  className=" py-30 flex flex-col items-center gap-6 justify-center">
        <FontAwesomeIcon icon={faBan} className="text-red-800 text-3xl" />
        <h1 className="text-3xl font-bold text-red-800">Page Not Found</h1>
      </div>
    </>
  )
}
