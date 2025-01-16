import React from 'react'
import { Camera, User ,  Edit} from 'lucide-react'
import { useState, useEffect } from 'react';
import { showSuccessToast } from '../../toastify';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default function EditUserInfo() {

    const [formData, setFormData] = useState({
        fullName: '',
        userName: '',
        image: ''
    });

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('user'));
        if (userInfo) {
            setFormData({
                fullName: userInfo.name,
                userName: userInfo.username,
                image: userInfo.image
            });
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userInfo = JSON.parse(localStorage.getItem('user'));
        const updatedUserInfo = { ...userInfo, name: formData.fullName, userName: formData.userName, image: formData.image };
        localStorage.setItem('user', JSON.stringify(updatedUserInfo));
        showSuccessToast('Profile updated successfully');
    };

  return (
    <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Profile Information
            </h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-20 w-20 rounded-full bg-gray-700 flex items-center justify-center relative">
                {formData.image ? (
                  <img
                    src={formData.image
                    ? `${backendUrl}/images/uploads/${formData.image}`
                    : `${backendUrl}/images/uploads/default.jpg`}
                    alt="Profile"
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : ( 
                  <User className="h-8 w-8 text-gray-400" />
                 )}
                <label className="absolute bottom-0 right-0 p-1 bg-gray-700 rounded-full shadow-lg cursor-pointer hover:bg-gray-600 transition-colors">
                  <Camera className="h-4 w-4 text-gray-300" />
                  <input type="file" className="hidden" accept="image/*" />
                </label>
              </div>
              <div className="flex-1">
                <label className="block text-gray-300 mb-2">Full Name</label>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-300 mb-2">User Name</label>
                <input
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-gradient-to-r from-blue-900 to-cyan-900 text-white rounded-lg hover:shadow-cyan-900/20 transition-all"
            >Update</button>
          </div>
  )
}
