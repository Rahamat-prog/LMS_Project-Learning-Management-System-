import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { BsPersonCircle } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import HomeLayout from '../Layouts/HomeLayout';
import { createAccount } from '../Redux/slices/AuthSlice';

function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // to state for store the avatar if image is uploaded so img will be show otherwise the circle icon will be show 
    const [previewImage, setPreviewImage] = useState("");

    // state defined for the user input 
    const [signupData, setSignupData] = useState({
        fullName: "",
        email: "",
        password: "",
        avatar: "",
    })

    // to handel the user input 
    function handelUserInput(e) {
        const { name, value } = e.target;
        setSignupData({
            ...signupData,
            [name]: value
        })
    }
    // handle upload image 
    function getImage(event) {
        event.preventDefault();
        //getting the image 
        const uploadImage = event.target.files[0];

        if (uploadImage) {
            setSignupData({
                ...signupData,
                avatar: uploadImage
            });
            // create reader object to read the image
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadImage);
            fileReader.addEventListener('load', function () {
                // console.log("result > ", this.result);
                setPreviewImage(this.result)
            })
        }
    }

    // // handel create new account 
    async function createNewAccount(event) {
        // to protect the page from the reload  
        event.preventDefault();
        if (!signupData.fullName || !signupData.email || !signupData.password || !signupData.avatar) {
            toast.error("Please fill all the details");
            return;
        }
        // validate for name 
        if (signupData.fullName.length < 5) {
            toast.error("Name should be atleast of 5 character");
            return;
        }
        // validate for email id
        if (!signupData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            toast.error("Please enter the valid email id")
            return;
        }
        // validation for password 
        if (!signupData.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
            toast.error("Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character (like @, $, !, or %).")
            return;
        }

        // To append data to a FormData object in React,
        const formData = new FormData();
        formData.append("fullName", signupData.fullName);
        formData.append("email", signupData.email);
        formData.append("password",signupData.password);
        formData.append("avatar", signupData.avatar);

        // dispatch create account action 
        const response = await dispatch(createAccount(formData));
        console.log("response> ", response);

        // if success is ture so reset the input filed 
        if (response?.payload?.success){
            setSignupData({
                fullName: "",
                email: "",
                password: "",
                avatar: "",
            });

            // navigate to the home page 
             navigate('/');

        }else{
            return toast.error(response?.payload?.message || "Signup is failed please try again");
        }
           

            
    }

    return (
        <HomeLayout>
            <div className='flex items-center justify-center h-screen '>
                <form noValidate onSubmit={createNewAccount} className='flex flex-col gap-5 justify-center  p-4 rounded-lg text-white w-95 shadow-[0_0_10px_black]'>
                    <h1 className='text-center text-2xl font-bold'>Registration Form </h1>

                    <label htmlFor="image_uploads">
                        {
                            previewImage ? (
                                <img src={previewImage} className='w-24 h-24 rounded-full m-auto' />
                            ) : (
                                <BsPersonCircle className='w-24 h-24 rounded-full m-auto' />
                            )
                        }
                    </label>
                    <input
                        onChange={getImage}
                        type="file"
                        className='hidden'
                        name="image_uploads"
                        id='image_uploads'
                        accept='.jpg, .jpeg, .png, .svg'
                    />
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="fullName" className='font-semibold'> Name </label>
                        <input
                            type="text"
                            required
                            name="fullName"
                            id="fullName"
                            placeholder="Enter your name.."
                            className="bg-transparent px-2 py-1 border"
                            value={signupData.fullName}
                            onChange={handelUserInput}

                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="email" className='font-semibold'> Email </label>
                        <input
                            type="email"
                            required
                            name="email"
                            id="email"
                            placeholder="Enter your email.."
                            className="bg-transparent px-2 py-1 border"
                            value={signupData.email}
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
                            value={signupData.password}
                            onChange={handelUserInput}

                        />
                    </div>
                    <button type="submit" className='mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer'>
                        Create account
                    </button>
                    <p className="text-center">
                        Already have an account ? <Link to="/login" className='link text-accent cursor-pointer'> Login</Link>
                    </p>

                </form>
            </div>
        </HomeLayout>
    )
}

export default SignUp;