import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";


export default function Footer() {
    // create current year variable
    const newDate = new Date();
    const year = newDate.getFullYear();


    return (
        <div>
            {/* footer copy right section  */}
            <footer className="relative left-0 bottom-0 h-[10vh] py-5 flex flex-col sm:flex-row items-center justify-between sm:px-20 text-white bg-gray-800">
                <section className="text-lg">
                    Copyright {year} | All rights reserved
                </section>

                {/* icon section */}
                <section className="flex items-center justify-center gap-5 text-white">
                    <a href="#" className="hover:text-yellow-500 transition-all ease-in-out duration-300">
                        <BsFacebook />
                    </a>
                    <a href="#" className="hover:text-yellow-500 transition-all ease-in-out duration-300">
                        <BsInstagram />
                    </a>
                    <a href="#" className="hover:text-yellow-500 transition-all ease-in-out duration-300">
                        <BsLinkedin />
                    </a>
                    <a href="#" className="hover:text-yellow-500 transition-all ease-in-out duration-300">
                        <BsTwitter />
                    </a>

                </section>
            </footer>
        </div>
    )
}
