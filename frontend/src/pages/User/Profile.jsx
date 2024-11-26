import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredientials } from "../../redux/features/auth/authSlice";
import { useProfileMutation } from "../../redux/api/usersApiSlice";

const Profile = () => {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const {userInfo} = useSelector(state => state.auth);
    const [updatProfile, {isLoading: loadingUpdateProfile}] = useProfileMutation();
    useEffect(() => {
        setUsername(userInfo.username);
        setEmail(userInfo.email);
    }, [userInfo.email, userInfo.username]);
    
    const dispatch = useDispatch();
    const submitHandler = async (e) => {
      e.preventDefault();

     if (password != confirmPassword) {
      toast.error('Password do not match')
     }else {
      try {
        const res = await updatProfile({_id: userInfo._id, username, email, password}).unwrap();
            console.log(res);
            dispatch(setCredientials({...res}));
            toast.success('Profile Updated successfully')
      } catch (error) {
        toast.error(error?.data?.message);
      }
     }
    }
  return (
    <div className="container mx-auto p-4 mt-[6rem] w-[50rem] bg-[#333] shadow-xl	 rounded-md">
      <form onSubmit={submitHandler}>
          <div className="border-b border-gray-900/10 ">
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold text-white">Update Profile</h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label for="first-name" className="block text-sm/6 font-medium text-white">Name</label>
                <div className="mt-2">
                  <input 
                  type="text" 
                  name="username" 
                  id="username" autocomplete="username" 
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div class="label py-1">
                  <span class="label-text-alt text-white">Please write your name</span>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label for="email" className="block text-sm/6 font-medium text-white">Email Adresse</label>
                <div className="mt-2">
                  <input name="email"
                  id="email" 
                  placeholder="E-Mail"
                  autocomplete="email" 
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:px-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div class="label py-1">
                  <span class="label-text-alt text-white">Please write your e-mail</span>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label for="email" className="block text-sm/6 font-medium text-white">Password</label>
                <div className="mt-2">
                  <input id="password" 
                  name="password" 
                  type="password" 
                  placeholder="Password" 
                  autocomplete="password" 
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:px-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}/>
                </div>
              </div>

                <div className="sm:col-span-3">
                <label for="confirmPassword" className="block text-sm/6 font-medium text-white">Confirm Password</label>
                <div className="mt-2">
                  <input id="ConfirmPassword" 
                  name="ConfirmPassword" 
                  placeholder="Confirm Password" 
                  type="password" 
                  autocomplete="ConfirmPassword" 
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:px-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}/>
                </div>
              </div>
            </div>
          </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link to={'/'} className="text-white hover:text-red-400">
            Cancel
          </Link>
          <button type="submit" variant="filled" className="group relative h-12 w-40 overflow-hidden rounded-2xl bg-white/50 text-lg font-bold text-white hover:bg-green-400 hover:text-green-900 transition-all duration-300 ease-in-out">Update</button>
          
        </div>
      </form>
      {loadingUpdateProfile && <Loader/>}
        </div>
  );
}

export default Profile