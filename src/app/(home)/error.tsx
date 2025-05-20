'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Homepage error:', error);
    }, [error]);

    return (
        <div className="max-w-4xl mx-auto text-center py-12">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">Something went wrong!</h2>
            <p className="text-gray-600 mb-6">{error.message || 'Failed to load posts.'}</p>
            <button
                onClick={reset}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
                Try Again
            </button>
        </div>
    );
}