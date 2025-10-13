export const TripInfoCards = ({ check_in, check_out, nights, formatDate }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <div className="text-blue-600 text-sm font-medium mb-1">Check-in</div>
                <div className="text-lg font-semibold text-gray-900">{formatDate(check_in)}</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <div className="text-blue-600 text-sm font-medium mb-1">Check-out</div>
                <div className="text-lg font-semibold text-gray-900">{formatDate(check_out)}</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <div className="text-blue-600 text-sm font-medium mb-1">Duration</div>
                <div className="text-lg font-semibold text-gray-900">{nights} night{nights > 1 ? 's' : ''}</div>
            </div>
        </div>
    );
};