import { useNavigate } from 'react-router-dom';

export const TripNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">No trip details found</h2>
                <p className="text-gray-600 mb-6">We couldn't find the trip details you're looking for.</p>
                <button
                    onClick={() => navigate('/trips')}
                    className="bg-gradient-to-r from-[#FF385C] to-[#E31C5F] text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-medium hover:scale-105 transform"
                >
                    Back to Trips
                </button>
            </div>
        </div>
    );
};