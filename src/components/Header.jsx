import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowRight, faArrowRotateRight, faAtom, faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from '../assets/image/logo.avif';
export default function Header() {
    const [menu, setMenu] = useState("hidden")
    const toggleMenu = () => {
        if (menu === "hidden") {

            setMenu('block')
        } else {
            setMenu('hidden')
        }
    }
    return (
        <header className="shadow sticky z-50 top-0">
            <nav className=" max-h-[70px] bg-[#fdfdfd] flex shadow-xl items-center justify-between w-full px-3 py-6">

                <Link id="logo" className="flex gap-1 items-center">
                    <img src={logo} alt="" />
                    <span className="text-[25px] font-semibold">Patna Library</span>
                </Link>
                <ul id="nav-menu" className="hidden md:flex items-center justify-center gap-[30px]">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "font-semibold text-[20px] text-blue-700 hover:text-blue-800"
                                : "font-semibold text-[20px] text-black hover:text-blue-700"
                        }
                    >
                        Home
                    </NavLink>
                    <li>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                isActive
                                    ? "font-semibold text-[20px] text-blue-700 hover:text-blue-800"
                                    : "font-semibold text-[20px] text-black hover:text-blue-700"
                            }
                        >
                            About
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/blog"
                            className={({ isActive }) =>
                                isActive
                                    ? "font-semibold text-[20px] text-blue-700 hover:text-blue-800"
                                    : "font-semibold text-[20px] text-black hover:text-blue-700"
                            }
                        >
                            Blog
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/contact"
                            className={({ isActive }) =>
                                isActive
                                    ? "font-semibold text-[20px] text-blue-700 hover:text-blue-800"
                                    : "font-semibold text-[20px] text-black hover:text-blue-700"
                            }
                        >
                            Contact
                        </NavLink>
                    </li>

                </ul>
                <Link to='/admin' className="hidden  border-2 rounded-lg border-gray-500 px-4 py-2 md:flex gap-1 justify-between items-center">
                <FontAwesomeIcon icon={faAtom} />
                    <span >Student Login</span>
                    <FontAwesomeIcon icon={faArrowRight} />
                </Link>
                <button className="block md:hidden">

                    <FontAwesomeIcon icon={faBars} className="text-2xl" onClick={toggleMenu} />
                </button>

                <div id="responsiveNav" className={`${menu} fixed inset-0 z-10 bg-white`}>

                    <div className="max-h-[70px] bg-[#fdfdfd] flex shadow-xl items-center justify-between w-full px-3 py-6">
                        <Link id="logo" className="flex gap-1 items-center">
                            <img src="./assets/asset 0.png" alt="" />
                            <span className="text-[25px] font-semibold">Tailwind</span>
                        </Link>
                        <button className="block md:hidden">
                            <FontAwesomeIcon icon={faClose} className="text-2xl" onClick={toggleMenu} />
                        </button>
                    </div>
                    <ul id="nav-menu" className="flex flex-col justify-evenly px-1 min-h-[50vh]">
                        <li className="hover:bg-slate-100 px-3 py-2 rounded-md mx-1">
                            <Link className="font-semibold text-[20px] hover:cursor-pointer text-black" to="/" onClick={toggleMenu}>Home</Link>
                        </li>
                        <li className="hover:bg-slate-100 px-3 py-2 rounded-md mx-1">
                            <Link className="font-semibold text-[20px] hover:cursor-pointer text-black" to="/about" onClick={toggleMenu} >About</Link>
                        </li>
                        <li className="hover:bg-slate-100 px-3 py-2 rounded-md mx-1">
                            <Link className="font-semibold text-[20px] hover:cursor-pointer text-black" to="/blog" onClick={toggleMenu} >Blog</Link>
                        </li>
                        <li className="hover:bg-slate-100 px-3 py-2 rounded-md mx-1">
                            <Link className="font-semibold text-[20px] hover:cursor-pointer text-black" to="/contact" onClick={toggleMenu}>Contact</Link>
                        </li>
                    </ul>
                    <Link to='/admin'
                        className="mx-12 my-6 flex border-2 rounded-lg border-gray-500 px-4 py-2 md:hidden gap-1 justify-between items-center">

                        <span onClick={toggleMenu} className="text-center mx-auto">Student Login</span>
                    </Link>
                </div>
            </nav>
        </header>
    );
}

