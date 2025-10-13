export const TripHeroSection = ({ image, title, address }) => {
    return (
        <div className="relative h-64 sm:h-80 lg:h-96">
            <img
                src={image?.images[0]?.url || '/images/placeholder-hotel.jpg'}
                className="w-full h-full object-cover"
                alt={title}
                onError={(e) => {
                    e.target.src = '/images/placeholder-hotel.jpg';
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                    {title}
                </h1>
                <p className="text-gray-200 text-lg">{address}</p>
            </div>
        </div>
    );
};