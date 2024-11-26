import { useState, useEffect } from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../components/Loader';
import {toast} from "react-toastify";
import {useRegisterMutation} from "../../redux/api/usersApiSlice";
import { setCredientials } from '../../redux/features/auth/authSlice';


const Register = () => {

  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, {isLoading}] = useRegisterMutation();
  const {userInfo} = useSelector(state => state.auth);
  const {search} = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/'

  useEffect(() => {
    if(userInfo) {
        navigate(redirect)
    }
}, [navigate, redirect, userInfo]);
const submitHandler = async (e) => {
  e.preventDefault();
  if(password != confirmPassword){
    toast.error('Password do not match ');
  }else {
    try {
      const res = await register({username, email, password}).unwrap();
      console.log(res);
      dispatch(setCredientials({...res}));
      navigate(redirect);
      toast.success('User successfuly registered!')
  } catch (error) {
      
      toast.error(error?.data?.message);
      
  }
  }
 
};
  return (
    <div className="font-[sans-serif] bg-white max-w-4xl flex items-center mx-auto md:h-screen p-4">
      <div className="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
        <div className="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-4 py-4">
          <div>
            <h4 className="text-white text-lg font-semibold">Create Your Account</h4>
            <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">Welcome to our registration page! Get started by creating your account.</p>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold">Simple & Secure Registration</h4>
            <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">Our registration process is designed to be straightforward and secure. We prioritize your privacy and data security.</p>
          </div>
        </div>
                <form onSubmit={submitHandler} className="md:col-span-2 w-full py-6 px-6 sm:px-16 ">
                <div className="my-[2rem] relative w-full">
                    <label htmlFor="name" className="block text-sm font-medium text-black">
                        Name
                    </label>
                    <div className="relative">
                        <input
                        type="username"
                        id="username"
                        className="focus:bg-white/50 w-full mt-1 p-2 pl-10 shadow-md hover:shadow-lg font-bold bg-gray-200 outline-[gray] disabled:opacity-50 rounded-xl transition-all text-black disabled:pointer-events-none"
                        placeholder="Enter your Name"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        />
                        <svg
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            height="1em"
                            width="1em"
                        >
                          <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z" />
                        </svg>
                    </div>
                </div>
                <div className="my-[2rem] relative w-full">
                    <label htmlFor="email" className="block text-sm font-medium text-black">
                        Email Address
                    </label>
                    <div className="relative">
                        <input
                        type="email"
                        id="email"
                        className="focus:bg-white/50 w-full mt-1 p-2 pl-10 shadow-md hover:shadow-lg font-bold bg-gray-200 outline-[gray] disabled:opacity-50 rounded-xl transition-all text-black text-sm disabled:pointer-events-none"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                        <svg
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        height="1em"
                        width="1em"
                        >
                        <path d="M20 8l-8 5-8-5V6l8 5 8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2z" />
                        </svg>
                    </div>
                </div>


                <div className="my-[2rem] relative w-full">
                  <label htmlFor="password" className="block text-sm font-medium text-black">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      className="focus:bg-white/50 w-full mt-1 p-2 pl-10 shadow-md hover:shadow-lg font-bold bg-gray-200 outline-[gray] rounded-xl transition-all text-black"
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <svg
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      height="1em"
                      width="1em"
                    >
                      <path d="M20 12c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7z" />
                    </svg>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center px-1 cursor-pointer text-gray-600 rounded-md focus:outline-none focus:text-gray-600"
                    >
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {showPassword ? (
                          // Eye-off icon
                          <>
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </>
                        ) : (
                          // Eye icon
                          <>

                            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                            <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                            <line x1="2" x2="22" y1="2" y2="22"></line>
                          </>
                        )}
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="my-[2rem] relative w-full">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-black">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="focus:bg-white/50 w-full mt-1 p-2 pl-10 shadow-md hover:shadow-lg font-bold bg-gray-200 outline-[gray] rounded-xl transition-all text-black"
                      placeholder="********"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <svg
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      height="1em"
                      width="1em"
                    >
                      <path d="M20 12c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7z" />
                    </svg>
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-3 flex items-center px-1 cursor-pointer text-gray-600 rounded-md focus:outline-none focus:text-gray-600"
                    >
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {showConfirmPassword  ? (
                          // Eye-off icon
                          <>
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </>
                        ) : (
                          // Eye icon
                          <>

                            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                            <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                            <line x1="2" x2="22" y1="2" y2="22"></line>
                          </>
                        )}
                      </svg>
                    </button>
                  </div>
                </div>



                    <button disabled={isLoading} type='submit' className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none">{isLoading ? (
                      <>
                        Register <Loader />
                      </>
                      ) : (
                        "Register"
                      )}
                    </button>
                
                    <p className='text-gray-800 text-sm mt-6 text-center justify-center'>
                        Already have an account  ? {""}
                        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className='text-gray-600 font-semibold underline ml-1'> Login</Link>
                    </p>
                    </form>
            </div>
    </div>
  )
}

export default Register;