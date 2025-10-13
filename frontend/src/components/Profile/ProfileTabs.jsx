export const ProfileTabs = ({ activeTab, setActiveTab, tripsCount, listingsCount }) => {
    const tabs = [
        { id: 'trips', label: 'Trips', count: tripsCount },
        { id: 'favorites', label: 'Favorites', count: 6 },
        { id: 'hosts', label: "Listings", count: listingsCount }
    ];

    return (
        <div className="border-b border-gray-2">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex space-x-4 sm:space-x-8 -mb-px overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-shrink-0 py-3 sm:py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${activeTab === tab.id ? 'border-airbnb text-airbnb' : 'border-transparent text-gray-3 hover:text-gray-700'}`}
                        >
                            <span>{tab.label}</span>
                            {tab.count !== undefined && (
                                <span className="bg-gray-2 text-gray-3 rounded-full px-2 py-0.5 text-xs">
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
};