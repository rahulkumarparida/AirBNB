import TripCard_Profile from './TripCard_Profile';

export const TripsTab = ({ trips }) => {
    return (
        <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-black mb-4 sm:mb-6">Your Trips</h3>
            {trips?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {trips.map((trip) => (
                        <TripCard_Profile key={trip.id} trip={trip} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-8 sm:py-12">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gray-1 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-gray-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-2">No trips booked...yet!</h4>
                    <p className="text-gray-3 mb-3 sm:mb-4 text-sm sm:text-base">Start planning your next adventure</p>
                    <button className="bg-airbnb text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md hover:bg-airbnb-dark transition-colors text-sm sm:text-base">
                        Start searching
                    </button>
                </div>
            )}
        </div>
    );
};