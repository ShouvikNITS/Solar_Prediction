'use client'

import Link from "next/link";
import {MdMenu} from "react-icons/md";
import {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";

export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="h-20 w-full bg-amber-300 flex items-center justify-between font-semibold px-4 lg:px-12">
            <div>
                <h2 className="text-2xl lg:text-3xl">Solar Forecast</h2>
            </div>

            <div className="lg:flex">
                <button className="flex lg:hidden" onClick={toggleMenu}>
                    <MdMenu size={26} />
                </button>

                <div className="hidden lg:flex gap-6 text-gray-800 text-[18px] font-medium">
                    <Link href="/">Home</Link>
                    <Link href="/predictions">Predictions</Link>
                    <Link href="/about">About</Link>
                    <Link href="/contact">Contact</Link>
                </div>
            </div>

            <AnimatePresence>
                {
                    isOpen && (
                        <>
                            <motion.div
                                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={toggleMenu}/>

                            <motion.div
                                className="fixed top-0 left-0 h-full w-[70%] bg-amber-300 z-50 p-6 flex flex-col gap-8 shadow-lg"
                                initial={{ x: "-100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "-100%" }}
                                transition={{ type: "tween", duration: 0.3 }}
                            >
                                <button className="self-end text-xl" onClick={toggleMenu}>✕</button>
                                <Link href="/" onClick={toggleMenu}>Home</Link>
                                <Link href="/predictions" onClick={toggleMenu}>Predictions</Link>
                                <Link href="/about" onClick={toggleMenu}>About</Link>
                                <Link href="/contact" onClick={toggleMenu}>Contact</Link>
                            </motion.div>
                        </>
                    )
                }
            </AnimatePresence>
        </div>
    )
}