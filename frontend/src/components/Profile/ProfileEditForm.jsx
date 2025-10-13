import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';

export const ProfileEditForm = ({ profileData, setProfileData, setIsEditing, user, refreshUser }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async () => {
        if (!profileData.username.trim()) {
            toast.error('Username cannot be empty');
            return;
        }

        if (profileData.username === user?.username) {
            setIsEditing(false);
            return;
        }

        setIsLoading(true);
        try {
            const response = await axiosInstance.patch('/api/auth/me/', {
                username: profileData.username
            });

            if (response.status >= 200 && response.status < 300) {
                toast.success('Username updated successfully');
                refreshUser(); // Refresh user data in parent component
                setIsEditing(false);
            } else {
                throw new Error('Failed to update username');
            }
        } catch (error) {
            console.error('Error updating username:', error);
            const errorMessage = error.response?.data?.username?.[0] || 
                               error.response?.data?.detail || 
                               'Failed to update username. Please try again.';
            toast.error(errorMessage);
            
            // Reset to original username on error
            setProfileData({
                username: user?.username || '',
                email: user?.email || ''
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setProfileData({
            username: user?.username || '',
            email: user?.email || ''
        });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        }
    };

    return (
        <div className="space-y-3 sm:space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-3 mb-1">Username</label>
                <input
                    type="text"
                    value={profileData.username}
                    onChange={(e) => setProfileData(prev => ({ ...prev, username: e.target.value }))}
                    onKeyPress={handleKeyPress}
                    className="w-full px-3 py-2 border border-gray-2 rounded-md focus:outline-none focus:ring-2 focus:ring-airbnb focus:border-transparent"
                    placeholder="Enter your username"
                    disabled={isLoading}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-3 mb-1">Email</label>
                <input
                    type="email"
                    value={profileData.email}
                    disabled
                    className="w-full px-3 py-2 border border-gray-2 rounded-md bg-gray-1 text-gray-3 cursor-not-allowed"
                />
                <p className="text-xs text-gray-3 mt-1">Email cannot be changed</p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <button
                    onClick={handleSave}
                    disabled={isLoading || !profileData.username.trim()}
                    className="bg-airbnb text-white px-4 sm:px-6 py-2 rounded-md hover:bg-airbnb-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                        </>
                    ) : (
                        'Save'
                    )}
                </button>
                <button
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="border border-gray-3 text-gray-3 px-4 sm:px-6 py-2 rounded-md hover:border-black hover:text-black transition-colors disabled:opacity-50"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};