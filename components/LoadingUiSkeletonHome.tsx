import { Search } from 'lucide-react'
import React from 'react'

export default function LoadingUiSkeletonHome() {
  return (
         <div className="min-h-screen bg-gray-50">

            <div className="container mx-auto px-4 py-12">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <div className="h-5 w-20 bg-gray-200 rounded mx-auto mb-2 animate-pulse"></div>
                    <div className="h-10 w-64 bg-gray-200 rounded mx-auto mb-4 animate-pulse"></div>
                    <div className="h-6 w-96 bg-gray-200 rounded mx-auto animate-pulse"></div>
                </div>

                {/* Search Bar */}
                <div className="max-w-md mx-auto mb-16 relative">
                    <div className="relative">
                        <div className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-md bg-gray-200 animate-pulse h-10"></div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Post Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse"
                        >
                            <div className="relative h-48 bg-gray-200"></div>
                            <div className="p-6">
                                <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
                                <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
                                <div className="h-4 w-full bg-gray-200 rounded mb-4"></div>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
                                    <div>
                                        <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
                                        <div className="h-3 w-16 bg-gray-200 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
  )
}
