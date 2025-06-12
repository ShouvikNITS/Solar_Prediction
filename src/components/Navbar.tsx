'use client'

import { usePathname } from "next/navigation";
import Link from "next/link";
import {FaBars} from "react-icons/fa";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import {useState} from "react";

export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    const pathname = usePathname();

    const isActive = (path : string) => pathname=== path

    const navItems = [
    { path: '/', label: 'Home' },
    { path: '/Dashboard', label: 'Dashboard' },
    { path: '/Forecasting', label: 'Forecasting' },
    { path: '/Analytics', label: 'Analytics' },
    { path: '/About', label: 'About' },
  ];

    return (
        <div className = "bg-gray-900 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl">
                            <AiOutlineThunderbolt className="text-[24px] text-white"/>
                        </div>
                    </Link>
                    <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-blue-600 bg-clip-text text-transparent">Energy Tracker</span>

                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map((items) => (
                            <Link 
                            key={items.path}
                            href={items.path}
                            className={`transition-colors duration-200 font-medium ${
                                isActive(items.path)
                                ? 'text-emerald-300 dark:text-emerald-300'
                                : 'text-gray-400 dark:text-gray-300 hover:text-emerald-300 dark:hover:text-emerald-300'
                            }`}>{items.label}</Link>
                        ))}
                    </nav>



                    <div className="hidden md:flex items-center space-x-4">
                        <button className="px-4 py-2 text-emerald-400 hover:text-emerald-300 duration-200 font-medium">Sign In</button>
                        <button className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-lg hover:from-emerald-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl">Get Started</button>
                    </div>

                    <div className="md:hidden flex items-center space-x-2">
                        <button className="p-2 rounded-lg text-gray-400 hover:text-emerald-400 hover:bg-gray-800 duration-200" onClick={toggleMenu}>
                            <FaBars />
                        </button>
                    </div>

                    <AnimatePresence>
                        {isOpen && (
                            <>
                                {/* Backdrop */}
                                <motion.div
                                    className="fixed inset-0 bg-black bg-opacity-70 z-40"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={toggleMenu}
                                />

                                {/* Sidebar */}
                                <motion.div
                                    initial={{ x: "-100%" }}
                                    animate={{ x: 0 }}
                                    exit={{ x: "-100%" }}
                                    transition={{ type: "tween", duration: 0.3 }}
                                    className="fixed top-0 left-0 h-screen w-[70%] bg-gray-900/95 backdrop-blur-md z-50 p-6 flex flex-col gap-6 shadow-lg"
                                >
                                    <button className="self-end text-white text-2xl" onClick={toggleMenu}>
                                        ✕
                                    </button>
                                    <Link href="/" onClick={toggleMenu} className="font-medium text-emerald-400">Home</Link>
                                    <Link href="/predictions" onClick={toggleMenu} className="font-medium text-gray-300 hover:text-emerald-400">Predictions</Link>
                                    <Link href="/about" onClick={toggleMenu} className="font-medium text-gray-300 hover:text-emerald-400">About</Link>
                                    <Link href="/contact" onClick={toggleMenu} className="font-medium text-gray-300 hover:text-emerald-400">Contact</Link>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}