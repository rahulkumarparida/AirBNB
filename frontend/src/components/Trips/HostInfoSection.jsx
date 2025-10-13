export const HostInfoSection = ({ host }) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Your Host
            </h3>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FF385C] to-[#E31C5F] rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {host.username?.charAt(0).toUpperCase()}
                </div>
                <div>
                    <p className="font-semibold text-gray-900 text-lg">{host.username}</p>
                    <p className="text-gray-600">Your trusted host</p>
                </div>
            </div>
        </div>
    );
};