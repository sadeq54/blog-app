export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

export interface PostWithImage extends Post {
    imageUrl: string;
    thumbnailUrl: string;
    author_name: string;
    category: string;
    created_at: string;
}

export interface DbPost {
    jsonplaceholder_id: number;
    title: string;
    body: string;
    user_id: number;
    image_url: string;
    thumbnail_url: string;
    author_name: string;
    category: string;
    created_at: string;
}