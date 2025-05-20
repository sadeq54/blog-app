import Link from 'next/link';
import Image from 'next/image';
import { cachePosts } from '@/lib/actions';
import { PostWithImage } from '@/lib/types';

export default async function HomePage() {
    const posts: PostWithImage[] = await cachePosts();

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
                <div
                    key={post.id}
                    className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition-shadow"
                >
                    <Image
                        src={post.thumbnailUrl}
                        alt={post.title}
                        width={150}
                        height={150}
                        className="w-full h-40 object-cover rounded-md mb-4"
                        priority={post.id <= 3} // Prioritize first 3 images for faster loading
                    />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        <Link href={`/post/${post.id}`} className="hover:text-blue-600">
                            {post.title}
                        </Link>
                    </h3>
                    <p className="text-gray-600 line-clamp-3">{post.body}</p>
                </div>
            ))}
        </div>
    );
}