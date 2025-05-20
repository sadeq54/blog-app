export default function Loading() {
    return (
        <div className="max-w-3xl mx-auto py-8">
            <div className="bg-white p-6 rounded-lg shadow animate-pulse">
                <div className="w-full h-64 bg-gray-200 rounded-md mb-6"></div>
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
            </div>
        </div>
    );
}