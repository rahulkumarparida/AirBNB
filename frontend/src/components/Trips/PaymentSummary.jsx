export const PaymentSummary = ({ payment, onContactHost, onGetDirections }) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Payment Summary</h3>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Amount</span>
                    <span className="text-2xl font-bold text-gray-900">
                        ₹{parseInt(payment.amount).toLocaleString("en-IN")}
                    </span>
                </div>

                <div className="flex justify-between items-center py-3 border-t border-gray-200">
                    <span className="text-gray-600">Status</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        payment.status === 'paid'
                            ? 'bg-green-100 text-green-800 border border-green-200'
                            : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                    }`}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                </div>
            </div>

            <div className="mt-6 space-y-3">
                <button 
                    onClick={onContactHost}
                    className="w-full bg-gradient-to-r from-[#FF385C] to-[#E31C5F] text-white py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-semibold hover:scale-105 transform"
                >
                    Contact Host
                </button>
                <button 
                    onClick={onGetDirections}
                    className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
                >
                    Get Directions
                </button>
            </div>
        </div>
    );
};