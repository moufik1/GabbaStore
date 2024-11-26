import {useState, useEffect} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLoginMutation } from '../../redux/api/usersApiSlice';
import { setCredientials } from '../../redux/features/auth/authSlice';
import {toast} from "react-toastify";
import Loader from '../../components/Loader';




const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, {isLoading}] = useLoginMutation();
    const {userInfo} = useSelector(state => state.auth);

    const {search} = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if(userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await login({email, password}).unwrap();
            console.log(res);
            dispatch(setCredientials({...res}));
            navigate(redirect);
        } catch (error) {
            toast.error(error?.data?.message);
        }
    };
    
  return (
    <div className='bg-gray'>
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <section className="bg-white/90 p-8 rounded-l shadow-lg  mx-4 rounded-[5rem]">
            <div className="mt-[5rem]">
                <h1 className="text-2xl font-semibold mb-4 text-center">Sing In</h1>
                <form onSubmit={submitHandler} className="container w-[40rem]">
                <div className="my-[2rem] relative w-full">
                    <label htmlFor="email" 
                    className="block text-sm font-medium text-black">
                        Email Address
                    </label>
                    <div className="relative">
                        <input
                        type="email"
                        id="email"
                        className="focus:bg-white/50 w-full mt-1 p-2 pl-10 font-bold bg-gray-200 outline-[gray] disabled:opacity-50 rounded-xl transition-all text-black disabled:pointer-events-none"
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
      id="hs-toggle-password"
      type={showPassword ? 'text' : 'password'}
      className="focus:bg-white/50 w-full mt-1 p-2 pl-10 font-bold bg-gray-200 outline-[gray] rounded-xl transition-all text-black"
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
      className="absolute inset-y-0 right-3 flex items-center px-1 cursor-pointer text-gray-600 rounded-md focus:outline-none focus:text-blue-600"
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


<button
  disabled={isLoading}
  type="submit"
  className="px-5 py-2.5 rounded-md border border-gray-600 text-center text-medium text-gray-800 hover:text-white transition-all shadow-md hover:shadow-lg focus:bg-gray-700 focus:shadow-none active:bg-gray-700 hover:bg-gray-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
>
  {isLoading ? (
    <>
      Sign In <Loader />
    </>
  ) : (
    "Sign In"
  )}
</button>
                    
                </form>

                <div className="mt-4">
                    <p className='text-gray-500 '>
                        New Customer ? {""}
                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className='text-white-600 hover:underline font-bold'> Register</Link>
                    </p>
                </div>
            </div>
        </section>
    </div>
    </div>
  )
}

export default Login