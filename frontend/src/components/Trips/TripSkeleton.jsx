const TripCardSkeleton = () => {
    return (
        <div className="border border-gray-2 rounded-2xl overflow-hidden mb-6 animate-pulse">
            {/* Header Skeleton */}
            <div className="bg-gray-1 px-6 py-3 border-b border-gray-2">
                <div className="flex justify-between items-center">
                    <div className="h-4 bg-gray-2 rounded w-40"></div>
                    <div className="h-6 bg-gray-2 rounded-full w-20"></div>
                </div>
            </div>

            <div className="p-6">
                <div className="flex gap-6">
                    {/* Image Skeleton */}
                    <div className="flex-shrink-0">
                        <div className="w-50 h-32 bg-gray-2 rounded-xl"></div>
                    </div>

                    {/* Content Skeleton */}
                    <div className="flex-grow">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex-grow">
                                {/* Title Skeleton */}
                                <div className="h-6 bg-gray-2 rounded w-3/4 mb-2"></div>
                                {/* Address Skeleton */}
                                <div className="h-4 bg-gray-2 rounded w-1/2 mb-3"></div>
                                {/* Guest Info Skeleton */}
                                <div className="flex gap-4 mb-3">
                                    <div className="h-4 bg-gray-2 rounded w-16"></div>
                                    <div className="h-4 bg-gray-2 rounded w-16"></div>
                                    <div className="h-4 bg-gray-2 rounded w-16"></div>
                                </div>
                                {/* Host Skeleton */}
                                <div className="h-4 bg-gray-2 rounded w-32"></div>
                            </div>

                            {/* Price Skeleton */}
                            <div className="text-right">
                                <div className="h-8 bg-gray-2 rounded w-24 mb-1"></div>
                                <div className="h-4 bg-gray-2 rounded w-16"></div>
                            </div>
                        </div>

                        {/* Payment Status & Buttons Skeleton */}
                        <div className="flex justify-between items-center pt-4 border-t border-gray-2">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-gray-2 rounded-full"></div>
                                <div className="h-4 bg-gray-2 rounded w-20"></div>
                            </div>

                            <div className="flex gap-3">
                                <div className="h-9 bg-gray-2 rounded-lg w-24"></div>
                                <div className="h-9 bg-gray-2 rounded-lg w-32"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export const TripsSkeleton = () => {
    return (
        <div className="min-h-screen bg-white">
            <main className="max-w-6xl mx-auto px-6 py-8">
                {/* Header Skeleton */}
                <div className="mb-8">
                    <div className="h-8 bg-gray-2 rounded w-48 mb-2"></div>
                    <div className="h-4 bg-gray-2 rounded w-64"></div>
                </div>

                {/* Filter Buttons Skeleton */}
                <div className="flex gap-3 mb-8">
                    <div className="h-9 bg-gray-2 rounded-lg w-20"></div>
                    <div className="h-9 bg-gray-2 rounded-lg w-24"></div>
                    <div className="h-9 bg-gray-2 rounded-lg w-28"></div>
                </div>

                {/* Trip Cards Skeleton */}
                <div className="mb-8">
                    {[...Array(3)].map((_, index) => (
                        <TripCardSkeleton key={index} />
                    ))}
                </div>
            </main>
        </div>
    );
};