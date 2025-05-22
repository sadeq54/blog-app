'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cachePosts } from '@/lib/actions';
import { PostWithImage } from '@/lib/types';

export default function HomePage() {
    const [posts, setPosts] = useState<PostWithImage[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch posts on mount
    useEffect(() => {
        async function fetchPosts() {
            const fetchedPosts = await cachePosts();
            setPosts(fetchedPosts);
        }
        fetchPosts();
    }, []);

    // Filter posts based on search query
    const filteredPosts = posts.filter(
        (post) =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.body.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-12">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <p className="text-purple-600 mb-2">Our blog</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Resources and insights
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        The latest industry news, interviews, technologies, and resources.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-md mx-auto mb-16 relative">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Post Grid */}
                <AnimatePresence>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                            >
                                <Link href={`/post/${post.id}`} className="block">
                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={post.thumbnailUrl}
                                            alt={post.title}
                                            width={600}
                                            height={400}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="text-purple-600 text-sm font-medium mb-2">
                                            {post.category || 'General'}
                                        </div>
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold text-gray-800">{post.title}</h3>
                                            <span className="text-gray-500">→</span>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-4">{post.body.slice(0, 100)}...</p>
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                                                <Image
                                                    src="/placeholder.svg?height=100&width=100"
                                                    alt={post.author_name || 'Unknown Author'}
                                                    width={100}
                                                    height={100}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-800">
                                                    {post.author_name || 'Unknown Author'}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {post.created_at
                                                        ? new Date(post.created_at).toLocaleDateString()
                                                        : 'Unknown Date'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </AnimatePresence>
            </div>
        </div>
    );
}
