export const FavoritesTab = () => {
    const mockFavorites = [
        { id: 1, title: 'Lake Palace Udaipur', location: 'Udaipur, Rajasthan', price: '₹2891', image: 'https://picsum.photos/seed/udaipur/300/200' },
        { id: 2, title: 'Serene Kerala Backwaters', location: 'Alleppey, Kerala', price: '₹1452', image: 'https://picsum.photos/seed/alleppey/300/200' },
        { id: 3, title: 'Royal Rajputana Heritage', location: 'Jaipur, Rajasthan', price: '₹165', image: 'https://picsum.photos/seed/jaipur/300/200' },
        { id: 4, title: 'Himalayan Mountain Retreat', location: 'Darjeeling, West Bengal', price: '₹1203', image: 'https://picsum.photos/seed/darjeeling/300/200' },
        { id: 5, title: 'Golden Temple View Stay', location: 'Amritsar, Punjab', price: '₹9942', image: 'https://picsum.photos/seed/amritsar/300/200' },
        { id: 6, title: 'Goan Beachfront Villa', location: 'North Goa, Goa', price: '₹2102', image: 'https://picsum.photos/seed/goa/300/200' }
    ];

    return (
        <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-black mb-4 sm:mb-6">Your Favorites</h3>
            {mockFavorites.length > 0 ? (
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {mockFavorites.map((item) => (
                        <div key={item.id} className="group">
                            <div className="relative overflow-hidden rounded-md mb-2">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <button className="absolute top-2 sm:top-3 right-2 sm:right-3 text-white hover:text-airbnb transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            <h4 className="font-semibold text-black mb-1 text-sm sm:text-base">{item.title}</h4>
                            <p className="text-gray-3 text-xs sm:text-sm mb-1">{item.location}</p>
                            <p className="text-black font-medium text-sm sm:text-base">{item.price} night</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8 sm:py-12">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gray-1 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-gray-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-2">No favorites yet</h4>
                    <p className="text-gray-3 mb-3 sm:mb-4 text-sm sm:text-base">Save properties you'd like to visit</p>
                    <button className="bg-airbnb text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md hover:bg-airbnb-dark transition-colors text-sm sm:text-base">
                        Explore homes
                    </button>
                </div>
            )}
        </div>
    );
};