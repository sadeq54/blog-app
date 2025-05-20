// here when u fitch a mok data
// JSONPlaceholder API response types
export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

export interface Photo {
    id: number;
    albumId: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

// here when u use it in the blog app
// Combined type for API response (post + photo)
export interface PostWithImage extends Post {
    imageUrl: string;
    thumbnailUrl: string;
}


// and here when u want to store it in the database
// Database table type (matches PostgreSQL schema)
export interface DbPost {
    id: number;
    jsonplaceholder_id: number;
    title: string;
    body: string;
    user_id: number;
    image_url: string;
    thumbnail_url: string;
    created_at: string;
}