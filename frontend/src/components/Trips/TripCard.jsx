import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

export const TripCard = ({ booking }) => {
    const { listing_info, check_in, check_out, nights, payment, adult, children, infant } = booking;
    const { hotels } = useContext(StoreContext);

    let image = hotels.find(h => h.id == listing_info.id);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getTripStatus = (checkOut) => {
        const today = new Date();
        const checkoutDate = new Date(checkOut);
        return checkoutDate > today ? 'Upcoming' : 'Completed';
    };

    const status = getTripStatus(check_out);

    return (
        <div className="border border-gray-2 rounded-2xl overflow-hidden mb-6 hover:shadow-card transition-shadow duration-200">
            {/* Header with Status */}
            <div className="bg-gray-1 px-6 py-3 border-b border-gray-2">
                <div className="flex justify-between items-center">
                    <span className="text-gray-3 text-sm">
                        {formatDate(check_in)} - {formatDate(check_out)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${status === 'Upcoming'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-2 text-gray-3'
                        }`}>
                        {status}
                    </span>
                </div>
            </div>

            <div className="p-6">
                <div className="flex gap-6">
                    {/* Property Image */}
                    <div className="w-50 h-32">
                        <img
                            src={image?.images[0]?.url}
                            className='rounded-xl object-cover w-full h-full'
                            alt={listing_info.title}
                        />
                    </div>

                    {/* Booking Details */}
                    <div className="flex-grow">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="text-xl font-semibold text-black mb-1">
                                    {listing_info.title}
                                </h3>
                                <p className="text-gray-3 text-sm mb-2">{listing_info.address}</p>

                                {/* Guest Information */}
                                <div className="flex items-center gap-4 text-sm text-gray-3 mb-3">
                                    <span>{adult} adult{adult > 1 ? 's' : ''}</span>
                                    {children > 0 && <span>{children} child{children > 1 ? 'ren' : ''}</span>}
                                    {infant > 0 && <span>{infant} infant{infant > 1 ? 's' : ''}</span>}
                                </div>

                                {/* Host Information */}
                                <div className="text-sm text-gray-3">
                                    Hosted by <span className="text-black font-medium">{listing_info.host.username}</span>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                                <div className="text-2xl font-semibold text-black mb-1">
                                    ₹{parseInt(payment.amount).toLocaleString("en-IN")}
                                </div>
                                <div className="text-sm text-gray-3">
                                    for {nights} night{nights > 1 ? 's' : ''}
                                </div>
                            </div>
                        </div>

                        {/* Payment Status */}
                        <div className="flex justify-between items-center pt-4 border-t border-gray-2">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${payment.status === 'paid' ? 'bg-green-500' : 'bg-yellow-500'
                                    }`}></div>
                                <span className="text-sm text-gray-3 capitalize">
                                    Payment {payment.status}
                                </span>
                            </div>

                            <div className="flex gap-3">
                                <button className="px-4 py-2 border border-black rounded-lg text-sm font-medium text-black hover:bg-gray-1 transition-colors">
                                    View details
                                </button>
                                <button className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                                    Message host
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};