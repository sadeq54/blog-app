import Link from 'next/link';
import Image from 'next/image';
import {  Github } from 'lucide-react';

export default function Footer() {
    return (
        <div className="bg-gray-800 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center md:items-start">
                        <Link href="/" className="flex items-center mb-4">
                            <Image
                                src="/placeholder.svg?height=40&width=120"
                                alt="Blog Logo"
                                width={120}
                                height={40}
                                className="h-10 w-auto"
                            />
                        </Link>
                        <p className="text-gray-400 text-sm text-center md:text-left">
                            Simple Blog: Your source for industry news, insights, and resources.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-lg font-semibold mb-4">Explore</h3>
                        <ul className="space-y-2 text-gray-300 text-sm">
                            <li>
                                <Link href="/" className="hover:text-purple-400 transition">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="hover:text-purple-400 transition">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-purple-400 transition">
                                    About
                                </Link>
                            </li>
                            
                            
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">


                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 hover:text-purple-400 transition"
                            >
                                <Github className="h-6 w-6" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-8 border-t border-gray-700 text-center">
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} Simple Blog. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}