import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';

export const ProfileImageUpload = ({ user, refreshUser, getInitials, getProfileBackgroundColor }) => {
    const [isUploading, setIsUploading] = useState(false);

    const handleImageUpload = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file');
            event.target.value = '';
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('Image size should be less than 5MB');
            event.target.value = '';
            return;
        }

        const formData = new FormData();
        formData.append('profile_pic', file);

        setIsUploading(true);
        try {
            const response = await axiosInstance.patch(
                '/api/auth/me/',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (response.status >= 200 && response.status < 300) {
                refreshUser();
                toast.success('Profile updated');
            } else {
                alert('Failed to upload image. Try again.');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            const msg = error?.response?.data?.detail || error?.message || 'Error uploading image';
            alert(msg);
        } finally {
            setIsUploading(false);
            event.target.value = '';
        }
    };

    return (
        <div className="relative group">
            {user?.profile_pic ? (
                <div className="relative">
                    <img
                        src={user.profile_pic}
                        alt={user.username}
                        className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl object-cover border-4 border-white"
                    />
                    <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 rounded-2xl transition-all duration-200 flex items-center justify-center">
                        <label
                            htmlFor="profile-upload"
                            className={`opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white bg-opacity-90 rounded-full p-2 shadow-lg cursor-pointer ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isUploading ? (
                                <svg className="animate-spin h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            )}
                        </label>
                    </div>
                </div>
            ) : (
                <div
                    className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl text-white text-3xl lg:text-4xl font-bold flex items-center justify-center shadow-xl border-4 border-white"
                    style={{ background: getProfileBackgroundColor(user?.username) }}
                >
                    {getInitials(user?.username)}
                    <label
                        htmlFor="profile-upload"
                        className={`absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-2xl transition-all duration-200 flex items-center justify-center cursor-pointer ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white bg-opacity-90 rounded-full p-2">
                            {isUploading ? (
                                <svg className="animate-spin h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            )}
                        </div>
                    </label>
                </div>
            )}
            <input
                id="profile-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={isUploading}
            />
        </div>
    );
};