'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Post page error:', error);
    }, [error]);

    return (
        <div className="max-w-3xl mx-auto py-8 text-center">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">Something went wrong!</h2>
            <p className="text-gray-600 mb-6">{error.message || 'Failed to load post.'}</p>
            <div className="space-x-4">
                <button
                    onClick={reset}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Try Again
                </button>
                <Link href="/" className="text-blue-600 hover:underline">
                    Back to Home
                </Link>
            </div>
        </div>
    );
}