'use server';

//comment out for testing without neon
// import { neon } from '@neondatabase/serverless';
import { Post, PostWithImage } from './types';

// define images

const images = [
    "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?q=80&w=1992&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
]

// Initialize Neon client , comment out for testing without neon
// const sql = neon(process.env.DATABASE_URL ?? throwError('DATABASE_URL is not defined'));

// function throwError(message: string): never {
//     throw new Error(message);
// }

// Server action to cache posts in Neon
export async function cachePosts() {
    try {
        // Check if posts are already cached , comment out for testing without neon
        //     const cachedPosts = await sql`
        //   SELECT jsonplaceholder_id, title, body, user_id, image_url, thumbnail_url, author_name, category, created_at 
        //   FROM posts 
        //   ORDER BY jsonplaceholder_id
        // `;

        // // also comment out for testing without neon
        //     if (cachedPosts.length > 0) {
        //         return cachedPosts.map((post) => ({
        //             id: post.jsonplaceholder_id,
        //             title: post.title,
        //             body: post.body,
        //             userId: post.user_id,
        //             imageUrl: post.image_url,
        //             thumbnailUrl: post.thumbnail_url,
        //             author_name: post.author_name,
        //             category: post.category,
        //             created_at: post.created_at,
        //         }));
        //     }

        // Fetch from JSONPlaceholder
        const [postsRes, photosRes] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/posts', {
                next: { revalidate: 3600 },
            }),
            fetch('https://jsonplaceholder.typicode.com/photos', {
                next: { revalidate: 3600 },
            }),

        ]);

        if (!postsRes.ok || !photosRes.ok) {
            throw new Error('Failed to fetch data from JSONPlaceholder');
        }

        const posts: Post[] = await postsRes.json();

        // Mock categories
        const categories = ['Design', 'Product', 'Software Engineering', 'Management', 'Customer Success'];

        // Map posts to photos and users
        const postsWithImages: PostWithImage[] = posts.slice(0, 10).map((post, index) => ({
            ...post,
            imageUrl: images[Math.floor(Math.random() * 3)],
            thumbnailUrl: images[Math.floor(Math.random() * 3)],
            author_name: ['Sadeq', 'Ahmad', 'Saad'][index % 3],
            category: categories[index % categories.length],
            created_at: new Date().toISOString(),
        }));

        // Cache posts in Neon commit this , without commiting it will not work
        //     for (const post of postsWithImages) {
        //         await sql`
        //     INSERT INTO posts (jsonplaceholder_id, title, body, user_id, image_url, thumbnail_url, author_name, category, created_at)
        //     VALUES (${post.id}, ${post.title}, ${post.body}, ${post.userId}, ${post.imageUrl}, ${post.thumbnailUrl}, ${post.author_name}, ${post.category}, ${post.created_at})
        //     ON CONFLICT (jsonplaceholder_id) DO NOTHING
        //   `;
        //     }

        return postsWithImages;
    } catch (error) {
        console.error('Error caching posts:', error);
        throw new Error('Failed to cache posts');
    }
}

// Server action to cache a single post by ID
export async function cachePostById(id: string) {
    try {
        // Check database for cached post , comment out for testing without neon
        //     const rows = await sql`
        //   SELECT jsonplaceholder_id, title, body, user_id, image_url, thumbnail_url, author_name, category, created_at 
        //   FROM posts 
        //   WHERE jsonplaceholder_id = ${parseInt(id)}
        // `;

        // // also comment out for testing without neon
        //     if (rows.length > 0) {
        //         const post = rows[0];
        //         return {
        //             id: post.jsonplaceholder_id,
        //             title: post.title,
        //             body: post.body,
        //             userId: post.user_id,
        //             imageUrl: post.image_url,
        //             thumbnailUrl: post.thumbnail_url,
        //             author_name: post.author_name,
        //             category: post.category,
        //             created_at: post.created_at,
        //         };
        //     }

        // Fetch from JSONPlaceholder
        const [postRes, photoRes] = await Promise.all([
            fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                next: { revalidate: 3600 },
            }),
            fetch(`https://jsonplaceholder.typicode.com/photos/${id}`, {
                next: { revalidate: 3600 },
            }),

        ]);


        if (!postRes.ok || !photoRes.ok) {
            throw new Error('Failed to fetch post or photo');
        }

        const post: Post = await postRes.json();

        const postWithImage: PostWithImage = {
            ...post,
            imageUrl: images[Math.floor(Math.random() * 3)],
            thumbnailUrl:   images[Math.floor(Math.random() * 3)],
            author_name: ['Sadeq', 'Ahmad', 'Saad'][Math.floor(Math.random() * 3)] || 'Unknown Author',
            category: ['Design', 'Product', 'Software Engineering', 'Management', 'Customer Success', "AI and Machine Learning"][
                parseInt(id) % 5
            ],
            created_at: new Date().toISOString(),
        };

        // Cache post in Neon , without commiting it will not work
        //     await sql`
        //   INSERT INTO posts (jsonplaceholder_id, title, body, user_id, image_url, thumbnail_url, author_name, category, created_at)
        //   VALUES (${post.id}, ${post.title}, ${post.body}, ${post.userId}, ${postWithImage.imageUrl}, ${postWithImage.thumbnailUrl}, ${postWithImage.author_name}, ${postWithImage.category}, ${postWithImage.created_at})
        //   ON CONFLICT (jsonplaceholder_id) DO NOTHING
        // `;

        return postWithImage;
    } catch (error) {
        console.error('Error caching post:', error);
        throw new Error('Failed to fetch post');
    }
}