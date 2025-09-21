import { Star, Heart } from 'lucide-react';
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext.js';
import { calculateDays } from './utils/CalculateDays.js';

export default function BookingSummaryCard({
    hotelId,
    destination,
    checkIn,
    checkOut,
    adult,
    children,
    infant }) {

    const { hotels } = useContext(StoreContext)
    const hotel = hotels.hotels.find((h) => h.id == hotelId)
    console.log("hotel: ", hotel);

    const getDates = (checkIn, checkOut) => {
        const In = new Date(checkIn);
        const Out = new Date(checkOut);

        // Get day and month
        const startDay = In.getDate(); // 3
        const endDay = Out.getDate(); // 19

        // Array of month names
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const month = monthNames[Out.getMonth()];
        return `${startDay}-${endDay} ${month}`;
    };

    const totalCost = (calculateDays(checkIn, checkOut) * hotel.price_per_night);
    const tax = totalCost * 0.18
    const checkInDate = new Date(checkIn);

    const cancelByDate = new Date(checkInDate);
    cancelByDate.setDate(checkInDate.getDate() - 1);
    const cancelByText = `${cancelByDate.getDate()} ${cancelByDate.toLocaleString('default', { month: 'long' })}`;



    return (
        <div className="max-w-md mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
            {/* Property Header */}
            <div className="flex space-x-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                        src={hotel.images[0].url}
                        alt="Bedroom"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">
                        {hotel.title}
                    </h2>
                    <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-black text-black" />
                            <span className="font-medium">{(hotel.reviews[0].cleanliness + hotel.reviews[0].location + hotel.reviews[0].rating + hotel.reviews[0].service) / 4}</span>
                            <span className="text-gray-600">(42)</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-600">
                            <Heart className="w-4 h-4" />
                            <span>Guest favourite</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Free Cancellation */}
            <div className="space-y-1">
                <h3 className="font-semibold text-gray-900">Free cancellation</h3>
                <p className="text-sm text-gray-600">
                    Cancel before {cancelByText} for a full refund. <span className="underline cursor-pointer">Full policy</span>
                </p>
            </div>

            {/* Dates */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Dates</h3>
                    <p className="text-gray-600">{getDates(checkIn, checkOut)}</p>
                </div>
                <button className="text-sm font-medium underline text-gray-900 hover:no-underline">
                    Change
                </button>
            </div>

            {/* Guests */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Guests</h3>
                    <p className="text-gray-600">
                        {`${adult} adult${adult > 1 ? "s" : ""}` +
                            (children > 0 ? `, ${children} ${children === 1 ? "child" : "children"}` : "") +
                            (infant > 0 ? `, ${infant} ${infant === 1 ? "infant" : "infants"}` : "")
                        }
                    </p>

                </div>
                <button className="text-sm font-medium underline text-gray-900 hover:no-underline">
                    Change
                </button>
            </div>

            {/* Price Details */}
            <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Price details</h3>

                <div className="flex items-center justify-between">
                    <span className="text-gray-600">{calculateDays(checkIn, checkOut)} nights x {hotel.price_per_night}</span>
                    <span className="text-gray-900">₹{totalCost.toLocaleString('en-IN')}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-gray-600">Taxes</span>
                    <span className="text-gray-900">₹{tax.toLocaleString('en-IN')}</span>
                </div>

                <hr className="border-gray-200" />

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-900">Total</span>
                        <span className="text-sm text-gray-600 font-medium">INR</span>
                    </div>
                    <span className="font-semibold text-gray-900">₹{(tax + totalCost).toLocaleString('en-IN')}</span>
                </div>

                <button className="text-sm font-medium underline text-gray-900 hover:no-underline">
                    Price breakdown
                </button>
            </div>
        </div>
    );
}