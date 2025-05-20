'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { cachePostById, cachePosts } from '@/lib/actions';
import { PostWithImage } from '@/lib/types';
import { notFound } from 'next/navigation';


export default function PostPage() {
    const { id } = useParams();
    const [post, setPost] = useState<PostWithImage | null>(null);
    const [allPosts, setAllPosts] = useState<PostWithImage[]>([]);

    useEffect(() => {
        async function fetchPosts() {
            const fetchedPosts = await cachePosts();
            setAllPosts(fetchedPosts);
        }
        fetchPosts();
    }, []);

    useEffect(() => {
        const fetchPost = async () => {
            const fetchedPost: PostWithImage | null = await cachePostById(id as string).catch(() => null);
            setPost(fetchedPost);
            if (!fetchedPost) {
                notFound();
            }
        };

        fetchPost();

    }, [id]);
        
    if (!post) {
        return (
            <div className="min-h-screen bg-gray-50">
                <main className="container mx-auto px-4 py-8">
                    <motion.div
                        className="max-w-4xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-gray-600 text-center">Loading post...</p>
                    </motion.div>
                </main>
            </div>
        ); 
    }

    const relatedPosts = allPosts.filter((p) => p.category === post.category && p.id !== post.id);

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="container mx-auto px-4 py-8">
                <motion.div
                    className="max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Back to blog link */}
                    <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-purple-600 mb-8">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to blog
                    </Link>

                    {/* Category */}
                    <div className="mb-4">
                        <span className="inline-block bg-purple-100 text-purple-600 text-sm font-medium px-3 py-1 rounded-full">
                            {post.category || 'General'}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">{post.title}</h1>

                    {/* Author and metadata */}
                    <div className="flex items-center mb-8">
                        <div className="w-10 h-10 rounded-full overflow-hidden mr-4">
                            <Image
                                src="/placeholder.svg?height=100&width=100"
                                alt={post.author_name || 'Unknown Author'}
                                width={100}
                                height={100}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="mr-6">
                            <p className="text-sm font-medium text-gray-800">{post.author_name || 'Unknown Author'}</p>
                            <p className="text-xs text-gray-500">Author</p>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                            <div className="flex items-center mr-4">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>
                                    {post.created_at
                                        ? new Date(post.created_at).toLocaleDateString()
                                        : 'Unknown Date'}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>5 min read</span>
                            </div>
                        </div>
                    </div>

                    {/* Featured image */}
                    <motion.div
                        className="rounded-lg overflow-hidden mb-8"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Image
                            src={post.imageUrl}
                            alt={post.title}
                            width={1200}
                            height={600}
                            className="w-full h-auto object-cover"
                        />
                    </motion.div>

                    {/* Content */}
                    <div className="prose prose-lg max-w-none mb-12">{post.body}</div>



                    {/* Related posts */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Related posts</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedPosts.map((relatedPost) => (
                                <Link key={relatedPost.id} href={`/post/${relatedPost.id}`} className="group block">
                                    <motion.div
                                        className="bg-white rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-shadow duration-300"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <div className="relative h-40 overflow-hidden">
                                            <Image
                                                src={relatedPost.imageUrl}
                                                alt={relatedPost.title}
                                                width={600}
                                                height={400}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <div className="text-purple-600 text-xs font-medium mb-2">
                                                {relatedPost.category}
                                            </div>
                                            <h3 className="text-gray-800 font-bold group-hover:text-purple-600 transition-colors duration-200">
                                                {relatedPost.title}
                                            </h3>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}