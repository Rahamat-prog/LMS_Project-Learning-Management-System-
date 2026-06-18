import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import HomeLayout from '../Layouts/HomeLayout';
import { createAccount } from '../Redux/slices/AuthSlice';
import { login } from '../Redux/slices/AuthSlice';


function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // state defined for the user input 
    const [signinData, setSigninData] = useState({
        email: "",
        password: "",
    })

    // to handel the user input 
    function handelUserInput(e) {
        const { name, value } = e.target;
        setSigninData({
            ...signinData,
            [name]: value
        })
    }



    // // handel login action 
    async function onLogin(event) {
        // to protect the page from the reload  
        event.preventDefault();
        if ( !signinData.email || !signinData.password ) {
            toast.error("Please fill all the details");
            return;
        }

         // dispatch login action 
        const response = await dispatch(login(signinData));
        console.log("response> ", response);

        if (response?.payload?.success) 
            navigate('/');

            setSigninData({
                email: "",
                password: "",
            });
        
        // after create accout make all the input default 
        setSigninData({
            email: "",
            password: "",
        })
   
    }
    
       
    return (
        <HomeLayout>
            <div className='flex items-center justify-center h-screen '>
                <form noValidate onSubmit={onLogin} className='flex flex-col gap-5 justify-center  p-4 rounded-lg text-white w-95 shadow-[0_0_10px_black]'>
                    <h1 className='text-center text-2xl font-bold'>Login form</h1>

                    <div className='flex flex-col gap-1'>
                        <label htmlFor="email" className='font-semibold'> Email </label>
                        <input
                            type="email"
                            required
                            name="email"
                            id="email"
                            placeholder="Enter your email.."
                            className="bg-transparent px-2 py-1 border"
                            value={signinData.email}
                            onChange={handelUserInput}

                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="password" className='font-semibold'> Password </label>
                        <input
                            type="password"
                            required
                            name="password"
                            id="password"
                            placeholder="Enter your password.."
                            className="bg-transparent px-2 py-1 border"
                            value={signinData.password}
                            onChange={handelUserInput}

                        />
                    </div>
                    <button type="submit" className='mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer'>
                        Login
                    </button>
                    <p className="text-center">
                       Do not have an account ? <Link to="/signup" className='link text-accent cursor-pointer'> Signup</Link>
                    </p>

                </form>
            </div>
        </HomeLayout>
    )
}

export default Login;