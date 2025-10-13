import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import axiosInstance from '../components/utils/axiosInstance';
import { ProfileHeader } from '../components/Profile/ProfileHeader';
import { ProfileTabs } from '../components/Profile/ProfileTabs';
import { TripsTab } from '../components/Profile/TripsTab';
import { FavoritesTab } from '../components/Profile/FavoritesTab';
import { ListingsTab } from '../components/Profile/ListingsTab';

export const Profile = () => {
    const { user, refreshUser, trips } = useContext(StoreContext);
    const [activeTab, setActiveTab] = useState('trips');
    const [listings, setListings] = useState(null);

    useEffect(() => {
        if (user) {
            fetchListings();
        }
    }, [user]);

    const fetchListings = async () => {
        try {
            const response = await axiosInstance.get('/api/listings/?role=host');
            setListings(response.data.results || []);
        } catch (error) {
            console.error('Error fetching listings:', error);
        }
    };

    return (
        <div className="min-h-screen bg-white pb-12">
            <ProfileHeader 
                user={user} 
                refreshUser={refreshUser} 
            />
            
            <ProfileTabs 
                activeTab={activeTab} 
                setActiveTab={setActiveTab}
                tripsCount={trips?.length}
                listingsCount={listings?.length}
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                {activeTab === 'trips' && <TripsTab trips={trips} />}
                {activeTab === 'favorites' && <FavoritesTab />}
                {activeTab === 'hosts' && <ListingsTab listings={listings} />}
            </div>
        </div>
    );
};