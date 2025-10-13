import { useNavigate } from 'react-router-dom';

export const ListingsTab = ({ listings }) => {
    const navigate = useNavigate();

    return (
        <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-black mb-4 sm:mb-6">Your Listings</h3>
            {listings?.length > 0 ? (
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {listings.map((item) => (
                        <div key={item.id} className="border border-gray-2 rounded-md overflow-hidden hover:shadow-card transition-shadow">
                            <div className="w-full h-48 bg-gray-1 flex items-center justify-center ">
                                <img
                                    src={item.images[0]?.url}
                                    className="w-full h-full object-cover"
                                    alt="Description"
                                />
                            </div>
                            <div className="p-4">
                                <h4 className="font-semibold text-black mb-1">{item.title || 'Unknown Listing'}</h4>
                                <p className="text-gray-3 text-sm mb-2">{item.address || 'Unknown Address'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8 sm:py-12">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-[#FF385C] to-[#E31C5F] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-2">No listings yet</h4>
                    <p className="text-gray-3 mb-3 sm:mb-4 text-sm sm:text-base">Start hosting and earn extra income from your space</p>
                    <button
                        onClick={() => navigate('/host')}
                        className="bg-gradient-to-r from-[#FF385C] to-[#E31C5F] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:shadow-lg transition-all duration-200 font-medium text-sm sm:text-base"
                    >
                        Become a Host
                    </button>
                </div>
            )}
        </div>
    );
};