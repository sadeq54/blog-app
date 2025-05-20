import { ArrowLeft, Calendar, Clock } from 'lucide-react';

export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-50">
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Back to blog link */}
                    <div className="inline-flex items-center text-sm text-gray-600 mb-8">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </div>

                    {/* Category */}
                    <div className="mb-4">
                        <div className="inline-block bg-purple-100 text-purple-600 text-sm font-medium px-3 py-1 rounded-full h-6 w-20 bg-gray-200 animate-pulse"></div>
                    </div>

                    {/* Title */}
                    <div className="h-10 w-3/4 bg-gray-200 rounded mb-6 animate-pulse"></div>

                    {/* Author and metadata */}
                    <div className="flex items-center mb-8">
                        <div className="w-10 h-10 rounded-full bg-gray-200 mr-4 animate-pulse"></div>
                        <div className="mr-6">
                            <div className="h-4 w-24 bg-gray-200 rounded mb-1 animate-pulse"></div>
                            <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                            <div className="flex items-center mr-4">
                                <Calendar className="h-4 w-4 mr-1" />
                                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                            <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    {/* Featured image */}
                    <div className="rounded-lg overflow-hidden mb-8">
                        <div className="w-full h-64 bg-gray-200 animate-pulse"></div>
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg max-w-none mb-12">
                        <div className="h-4 w-full bg-gray-200 rounded mb-2 animate-pulse"></div>
                        <div className="h-4 w-5/6 bg-gray-200 rounded mb-2 animate-pulse"></div>
                        <div className="h-4 w-3/4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                        <div className="h-4 w-full bg-gray-200 rounded mb-2 animate-pulse"></div>
                    </div>

                    {/* Related posts */}
                    <div className="mb-12">
                        <div className="h-6 w-32 bg-gray-200 rounded mb-6 animate-pulse"></div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[...Array(3)].map((_, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse"
                                >
                                    <div className="relative h-40 bg-gray-200"></div>
                                    <div className="p-4">
                                        <div className="h-3 w-16 bg-gray-200 rounded mb-2 animate-pulse"></div>
                                        <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}