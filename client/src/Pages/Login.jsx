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

    // for handeling the loading while login 
    const [isLoading, setIsLoading] = useState(false);

    // state defined for the user input 
    const [signinData, setSigninData] = useState({
        email: "",
        password: "",
    })

    // to handel the user input 
    function handelUserInput(e) {
        // const { name, value } = e.target; || anather way destructure
        setSigninData({
            ...signinData,
            [e.target.name]: e.target.value  //  JavaScript converts [name] to "email" or "password" ||If the user is typing in the email field, e.target.name is "email" | You must use the    square brackets [name] because you want to use the value stored inside the name variable as the object key, rather than the literal string "name".
        })
    }

    // to handel the login form 
    async function onLogin(event) {
        // to protect the page from the reload  
        event.preventDefault();

        if (!signinData.email || !signinData.password) {
            toast.error("Please fill all the details");
            return;
        }
        try {
            // handel login action 
            setIsLoading(true)
            // dispatch login action 
            //This sends the user's input (email and password stored in signinData) to your login asynchronous action (thunk). This action talks to your backend API.
            const response = await dispatch(login(signinData));
            // console.log("response> ", response);

            if (response?.payload?.success) {
                // clear the input filed of the login
                setSigninData({
                    email: "",
                    password: "",
                });

                //navigate to the home page 
                navigate('/');
            } else {
                toast.error(error?.response?.payload?.message || "Login failed, please try again");

            }
        } catch (error) {
            // Catches truly unexpected failures — not API errors (those are
            // already handled by the thunk's rejectWithValue), but things like
            // a dispatch-level crash or network failure that throws instead of rejecting.
            console.error("Unexpected error during login:", err);
            toast.error("Something went wrong. Please try again.");

        } finally {
            setIsLoading(false);
        }
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
                        {isLoading ? "Logging..." : "Login"}
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