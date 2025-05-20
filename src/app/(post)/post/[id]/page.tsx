import Image from 'next/image';
import Link from 'next/link';
import { cachePostById } from '@/lib/actions';
import { PostWithImage } from '@/lib/types';
import { notFound } from 'next/navigation';

export default async function PostPage({ params }: { params: { id: string } }) {
    const post: PostWithImage | null = await cachePostById(params.id).catch(() => null);
        console.log("sdfdf");
    if (!post) {
        
        notFound();
    }

    return (
        <article className="bg-white p-6 rounded-lg shadow">
            
            <Image
                src={post.imageUrl}
                alt={post.title}
                width={600}
                height={400}
                className="w-full h-64 object-cover rounded-md mb-6"
            />
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{post.title}</h1>
            <p className="text-gray-600 mb-6">{post.body}</p>
            <Link href="/" className="text-blue-600 hover:underline">
                Back to Home
            </Link>
        </article>
    );
}