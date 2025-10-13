export const GuestInfoSection = ({ adult, children, infant }) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Guest Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{adult}</div>
                    <div className="text-gray-600 text-sm">Adult{adult > 1 ? 's' : ''}</div>
                </div>
                {children > 0 && (
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">{children}</div>
                        <div className="text-gray-600 text-sm">Child{children > 1 ? 'ren' : ''}</div>
                    </div>
                )}
                {infant > 0 && (
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">{infant}</div>
                        <div className="text-gray-600 text-sm">Infant{infant > 1 ? 's' : ''}</div>
                    </div>
                )}
            </div>
        </div>
    );
};