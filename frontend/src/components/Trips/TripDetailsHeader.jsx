export const TripDetailsHeader = ({ status, onBack, onCancel }) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group self-start"
            >
                <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="font-medium">Back to Trips</span>
            </button>

            <div className="flex items-center gap-4">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    status === 'Upcoming'
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : 'bg-gray-100 text-gray-800 border border-gray-200'
                }`}>
                    {status}
                </span>
                {status === 'Upcoming' && (
                    <button
                        onClick={onCancel}
                        className="px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-200 font-medium hover:shadow-lg border border-red-500"
                    >
                        Cancel Trip
                    </button>
                )}
            </div>
        </div>
    );
};