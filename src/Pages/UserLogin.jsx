import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faUser, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const UserLogin = () => {
  const [type, setType] = useState("password");
  const [password, setPassword] = useState("")
  const [id, setId] = useState("")
  const toggleEye = () => {
    console.log(type)
    if (password && type === "password") {
      setType("text")
    }
    else {
      setType("password")
    }
    console.log(type)
  }


  return (
    <div className="bg-slate-200 min-h-[100vh] w-full flex items-center justify-center">
      <div className='relative flex flex-col md:flex-row items-stretch min-h-[80vh] overflow-hidden justify-center w-[90%] lg:w-[70%] shadow-2xl'>
        <div id="circle" className="hidden md:block absolute h-48 w-48 border-[20px] rounded-full bottom-20 border-white">

        </div>
        <div id="circle" className="hidden md:block absolute h-48 w-48 border-[20px] rounded-3xl rotate-[45deg] -right-20 -top-20 z-20 border-white">

        </div>
        <div id='left' className="flex-1 rounded-s-2xl bg-gradient-to-br from-blue-700 to-blue-500 flex items-center justify-center flex-col gap-5">
          <div className='w-[80%]'>
            <h1 className="text-white mb-8  relative text-3xl font-bold after:content-[''] after:block after:w-[30%] after:h-[2px] after:bg-white after:mt-2 after:mx-auto after:absolute after:left-0">
              Welcome to Patna Library User Login
            </h1>
          </div>
        </div>

        <div id='right' className="z-10 bg-gray-100 rounded-e-2xl  flex-1  flex items-center justify-center flex-col gap-5">
          <form className="text-gray-700 flex items-center justify-center  w-[80%] flex-col gap-5">
            <h1 className="text-2xl font-bold ">Signin</h1>
            <div className="flex items-center w-full justify-center gap-4 border text-gray-900 border-gray-200 rounded-3xl px-4 p-2 outline-none shadow-2xl bg-white ">
              <FontAwesomeIcon icon={faUser} className="w-1/12" />
              <input type="text" value={id} onChange={(e) => setId(e.target.value)} className="outline-none w-11/12 bg-transparent" placeholder="Enter your Id" />
            </div>
            <div className="flex items-center w-full justify-center gap-4 border text-gray-900 border-gray-200 rounded-3xl px-4 p-2 outline-none bg-white shadow-2xl ">
              <FontAwesomeIcon icon={faKey} className="w-1/12" />
              <input type={type} value={password} onChange={(e) => setPassword(e.target.value)} className="outline-none w-10/12 bg-transparent" placeholder="Enter your password" />
              {
                type === "password" ? <FontAwesomeIcon icon={faEye} onClick={toggleEye} className="w-1/12 cursor-pointer" /> : <FontAwesomeIcon icon={faEyeSlash} onClick={toggleEye} className="w-1/12 cursor-pointer" />
              }
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-700 to-blue-500 w-full py-2 rounded-3xl text-white text-xl mt-5 hover:bg-blue-800 hover:shadow-lg active:scale-95 transition duration-300"
            >
              Login
            </button>



          </form>
        </div>



      </div>

    </div>

  )
}


export default UserLogin