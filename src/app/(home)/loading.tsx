export default function Loading() {
    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Loading...</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, index) => (
                    <div
                        key={index}
                        className="border rounded-lg p-4 bg-white shadow animate-pulse"
                    >
                        <div className="w-full h-40 bg-gray-200 rounded-md mb-4"></div>
                        <div className="h-6 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded mb-1"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}