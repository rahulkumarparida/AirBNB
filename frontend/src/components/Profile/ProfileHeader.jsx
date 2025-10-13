import { useState } from 'react';
import { ProfileImageUpload } from './ProfileImageUpload';
import { ProfileEditForm } from './ProfileEditForm';

export const ProfileHeader = ({ user, refreshUser }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        username: user?.username || '',
        email: user?.email || ''
    });

    const formatJoinDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getInitials = (username) => {
        return username ? username.charAt(0).toUpperCase() : 'U';
    };

    const getProfileBackgroundColor = (username) => {
        const colors = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        ];
        const index = username ? username.charCodeAt(0) % colors.length : 0;
        return colors[index];
    };

    const getStatusColor = (role) => {
        return role === 'HO'
            ? 'from-purple-500 to-purple-600'
            : 'from-green-500 to-green-600';
    };

    const getStatusIcon = (role) => {
        return role === 'HO' ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        );
    };

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                {/* Header Section */}
                <div className="text-start mb-8 lg:mb-12">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                        Account Settings
                    </h1>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-2xl  border-gray-200 overflow-hidden">
                    <div className="p-6 lg:p-8">
                        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-8">
                            {/* Profile Image Section */}
                            <div className="flex-shrink-0">
                                <div className="relative">
                                    <ProfileImageUpload
                                        user={user}
                                        refreshUser={refreshUser}
                                        getInitials={getInitials}
                                        getProfileBackgroundColor={getProfileBackgroundColor}
                                    />

                                    {/* Status Badge */}
                                    <div className={`absolute -bottom-2 -right-2 bg-gradient-to-r ${getStatusColor(user?.role)} text-white p-2 rounded-full shadow-lg border-2 border-white`}>
                                        {getStatusIcon(user?.role)}
                                    </div>
                                </div>
                            </div>

                            {/* Profile Information */}
                            <div className="flex-1 text-center lg:text-left">
                                {isEditing ? (
                                    <ProfileEditForm
                                        profileData={profileData}
                                        setProfileData={setProfileData}
                                        setIsEditing={setIsEditing}
                                        refreshUser={refreshUser}
                                        user={user}
                                    />
                                ) : (
                                    <div className="space-y-4">
                                        {/* Name and Role */}
                                        <div>
                                            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                                                {user?.username}
                                            </h2>
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center lg:justify-start">
                                                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${user?.role === 'GU' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}`}>
                                                    {getStatusIcon(user?.role)}
                                                    {user?.role === 'GU' ? 'Traveler' : 'Host'}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    Member since {user?.date_joined ? formatJoinDate(user.date_joined) : 'Unknown'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Contact Info */}
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-center lg:justify-start gap-2 text-gray-600">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                <span className="text-lg">{user?.email}</span>
                                            </div>
                                        </div>

                                        {/* Stats */}
                                        <div className="flex justify-center lg:justify-start gap-6 py-4">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-gray-900">12</div>
                                                <div className="text-sm text-gray-500">Trips</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-gray-900">8</div>
                                                <div className="text-sm text-gray-500">Reviews</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-gray-900">4.9</div>
                                                <div className="text-sm text-gray-500">Rating</div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                            <button
                                                onClick={() => setIsEditing(true)}
                                                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF385C] to-[#E31C5F] text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-semibold hover:scale-105 transform"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                Edit Profile
                                            </button>
                                            <button className="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                                </svg>
                                                Share Profile
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Additional Info Bar */}
                    {!isEditing && (
                        <div className="bg-gray-50 border-t border-gray-200 px-6 lg:px-8 py-4">
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Last updated: {user?.date_joined ? formatJoinDate(user.date_joined) : 'Recently'}
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    Profile completed: 85%
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};