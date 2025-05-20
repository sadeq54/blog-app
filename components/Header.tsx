import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Header() {
    return (
        <header className="bg-white border-b border-gray-100">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/logo.jpg"
                            alt="Blog Logo"
                            width={120}
                            height={40}
                            className="h-10 w-auto"
                        />
                    </Link>
                    <nav className="hidden md:flex space-x-8">

                        <Link href="/" className="text-purple-600 font-medium">
                            Blog
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}
