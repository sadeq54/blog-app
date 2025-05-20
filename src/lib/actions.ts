'use server';

import { neon } from '@neondatabase/serverless';
import { Post, PostWithImage } from './types';

// Initialize Neon client
const sql = neon(process.env.DATABASE_URL ?? throwError('DATABASE_URL is not defined'));


function throwError(message: string): never {
    throw new Error(message);
}

// Server action to cache posts in Neon
export async function cachePosts() {
    try {
        // Check if posts are already cached
        const cachedPosts = await sql`
      SELECT jsonplaceholder_id, title, body, user_id, image_url, thumbnail_url 
      FROM posts 
      ORDER BY jsonplaceholder_id
    `;

        if (cachedPosts.length > 0) {
            return cachedPosts.map((post) => ({
                id: post.jsonplaceholder_id,
                title: post.title,
                body: post.body,
                userId: post.user_id,
                imageUrl: post.image_url,
                thumbnailUrl: post.thumbnail_url,
            }));
        }

        // Fetch from JSONPlaceholder
        const [postsRes, photosRes] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/posts', {
                next: { revalidate: 3600 }, // Revalidate every hour
            }),
            fetch('https://jsonplaceholder.typicode.com/photos', {
                next: { revalidate: 3600 },
            }),
        ]);

        if (!postsRes.ok || !photosRes.ok) {
            throw new Error('Failed to fetch data from JSONPlaceholder');
        }

        const posts: Post[] = await postsRes.json();
        const photos = await photosRes.json();

        // Map posts to photos (post.id to photo.id)
        const postsWithImages: PostWithImage[] = posts.slice(0, 10).map((post, index) => ({
            ...post,
            imageUrl: photos[index]?.url || 'https://via.placeholder.com/600',
            thumbnailUrl: photos[index]?.thumbnailUrl || 'https://via.placeholder.com/150',
        }));

        // Cache posts in Neon
        for (const post of postsWithImages) {
            await sql`
        INSERT INTO posts (jsonplaceholder_id, title, body, user_id, image_url, thumbnail_url)
        VALUES (${post.id}, ${post.title}, ${post.body}, ${post.userId}, ${post.imageUrl}, ${post.thumbnailUrl})
        ON CONFLICT (jsonplaceholder_id) DO NOTHING
      `;
        }

        return postsWithImages;
    } catch (error) {
        console.error('Error caching posts:', error);
        throw new Error('Failed to cache posts');
    }
}

// Server action to cache a single post by ID
export async function cachePostById(id: string) {
    try {
        // Check database for cached post
        const rows = await sql`
      SELECT jsonplaceholder_id, title, body, user_id, image_url, thumbnail_url 
      FROM posts 
      WHERE jsonplaceholder_id = ${parseInt(id)}
    `;

        if (rows.length > 0) {
            const post = rows[0];
            return {
                id: post.jsonplaceholder_id,
                title: post.title,
                body: post.body,
                userId: post.user_id,
                imageUrl: post.image_url,
                thumbnailUrl: post.thumbnail_url,
            };
        }

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
        const photo = await photoRes.json();

        const postWithImage: PostWithImage = {
            ...post,
            imageUrl: photo?.url || 'https://via.placeholder.com/600',
            thumbnailUrl: photo?.thumbnailUrl || 'https://via.placeholder.com/150',
        };

        // Cache post in Neon
        await sql`
      INSERT INTO posts (jsonplaceholder_id, title, body, user_id, image_url, thumbnail_url)
      VALUES (${post.id}, ${post.title}, ${post.body}, ${post.userId}, ${postWithImage.imageUrl}, ${postWithImage.thumbnailUrl})
      ON CONFLICT (jsonplaceholder_id) DO NOTHING
    `;

        return postWithImage;
    } catch (error) {
        console.error('Error caching post:', error);
        throw new Error('Failed to fetch post');
    }
}