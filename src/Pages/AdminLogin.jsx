import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faUser, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth"; // Import this function
import { useNavigate } from "react-router-dom"; // To redirect after login
import { auth } from "../Firebase"; // Import the auth object

const AdminLogin = () => {
  const [type, setType] = useState("password");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // Change id to email
  const [error, setError] = useState(""); // For error messages
  const [loading, setLoading] = useState(false); // For loading state
  const navigate = useNavigate();

  const toggleEye = () => {
    if (password && type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true); // Start loading state

    try {
      // Sign in with email and password
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to dashboard after successful login
      navigate("/admin");
    } catch (error) {
      // Handle errors (e.g., incorrect credentials)
      console.log(error)
      setError("Invalid email or password.");
    } finally {
      setLoading(false); // Stop loading state after the login attempt
    }
  };

  return (
    <div className="bg-slate-200 min-h-[100vh] w-full flex items-center justify-center">
      <div className='flex flex-col md:flex-row items-stretch min-h-[80vh] justify-center w-[90%] md:w-[80%] lg:w-[60%] shadow-2xl'>
        <div id='left' className="flex-1 rounded-s-2xl bg-gradient-to-r from-blue-700 to-blue-500 flex items-center justify-center flex-col gap-5">
          <div className='w-[80%] '>
            <h1 className="text-white mb-8  relative text-3xl font-bold after:content-[''] after:block after:w-[30%] after:h-[2px] after:bg-white after:mt-2 after:mx-auto after:absolute after:left-0">
              Welcome to Patna Library Admin Login
            </h1>
          </div>
        </div>

        <div id='right' className="bg-gray-100 rounded-e-2xl flex-1 flex items-center justify-center flex-col gap-5">
          <form onSubmit={handleLogin} className="text-gray-700 flex items-center justify-center w-[80%] flex-col gap-5">
            <h1 className="text-2xl font-bold ">Signin</h1>
            

            <div className="flex items-center w-full justify-center gap-4 border text-gray-900 border-gray-200 rounded-3xl px-4 p-2 outline-none shadow-2xl bg-white">
              <FontAwesomeIcon icon={faUser} className="w-1/12" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="outline-none w-11/12 bg-transparent"
                placeholder="Enter your Email"
                required
                autoComplete="email"
              />
            </div>

            <div className="flex items-center w-full justify-center gap-4 border text-gray-900 border-gray-200 rounded-3xl px-4 p-2 outline-none bg-white shadow-2xl">
              <FontAwesomeIcon icon={faKey} className="w-1/12" />
              <input
                type={type}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="outline-none w-10/12 bg-transparent"
                placeholder="Enter your password"
                required
                autoComplete="password"
              />
              {type === "password" ? (
                <FontAwesomeIcon icon={faEye} onClick={toggleEye} className="w-1/12 cursor-pointer" />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} onClick={toggleEye} className="w-1/12 cursor-pointer" />
              )}
            </div>

            {/* Show loading spinner or message while the login process is ongoing */}
            <button
            type="submit"
            className="bg-gradient-to-r from-blue-700 to-blue-500 w-full py-2 rounded-3xl text-white text-xl mt-5 hover:bg-blue-800 hover:shadow-lg active:scale-95 transition duration-300 flex items-center justify-center"
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-6 h-6 animate-spin">
                <circle fill="white" stroke="white" strokeWidth="15" r="15" cx="40" cy="65">
                  <animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4" />
                </circle>
                <circle fill="white" stroke="white" strokeWidth="15" r="15" cx="100" cy="65">
                  <animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2" />
                </circle>
                <circle fill="white" stroke="white" strokeWidth="15" r="15" cx="160" cy="65">
                  <animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0" />
                </circle>
              </svg>
            ) : (
              "Login"
            )}
          </button>
          {error ? <div className="text-red-500">{error}</div> : <div className="text-red-500 invisible"> errror is here</div>} {/* Show error message */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
