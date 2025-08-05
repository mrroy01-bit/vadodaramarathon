import React, { useState } from "react";
import { FaCloudUploadAlt, FaTrashAlt, FaImage, FaEye } from "react-icons/fa";

export function BannerTab() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [banners, setBanners] = useState([
    { id: 1, title: "Marathon 2025 Banner", active: true, image: "/src/assest/banner.jpg" },
    { id: 2, title: "Registration Banner", active: false, image: "/src/assest/img_form.jpg" }
  ]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const toggleBannerStatus = (id) => {
    setBanners(banners.map(banner => ({
      ...banner,
      active: banner.id === id ? !banner.active : banner.active
    })));
  };

  return (
    <div className="space-y-8">
      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-50 p-6 border-b">
          <h3 className="text-xl font-semibold text-gray-800">Add New Banner</h3>
          <p className="text-gray-600 mt-1">Upload banners for the marathon website</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Upload Area */}
            <div className="space-y-6">
              <div 
                className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors ${
                  previewUrl ? 'border-blue-400' : 'border-gray-300'
                }`}
                onClick={() => document.getElementById('banner-upload').click()}
              >
                {previewUrl ? (
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="max-h-48 object-contain mb-4" 
                  />
                ) : (
                  <FaCloudUploadAlt className="text-blue-500 text-5xl mb-3" />
                )}
                <p className="text-gray-700 font-medium mb-1">
                  {previewUrl ? 'Click to change banner' : 'Click to upload a banner'}
                </p>
                <p className="text-gray-500 text-sm text-center">
                  Recommended size: 1920 x 600 pixels
                </p>
                <input 
                  type="file" 
                  id="banner-upload"
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileChange}
                />
              </div>

              {selectedFile && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <FaImage className="text-blue-600 mr-2" />
                      <div>
                        <p className="font-medium truncate max-w-xs">{selectedFile.name}</p>
                        <p className="text-sm text-gray-500">
                          {(selectedFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={handleReset}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Form Options */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Banner Title</label>
                <input 
                  type="text" 
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Enter a title for the banner"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Banner Location</label>
                <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Select location</option>
                  <option value="home">Home Page</option>
                </select>
              </div>
              
              

              <div className="flex items-center mt-4">
                <input 
                  type="checkbox" 
                  id="active-banner" 
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="active-banner" className="ml-2 block text-sm text-gray-700">
                  Make this banner active immediately
                </label>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex justify-end space-x-3">
            <button 
              onClick={handleReset}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              className={`px-6 py-2 rounded-md text-white font-medium ${
                selectedFile 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-blue-400 cursor-not-allowed'
              }`}
              disabled={!selectedFile}
            >
              Upload Banner
            </button>
          </div>
        </div>
      </div>

      {/* Existing Banners */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-50 p-6 border-b">
          <h3 className="text-xl font-semibold text-gray-800">Existing Banners</h3>
          <p className="text-gray-600 mt-1">Manage your current website banners</p>
        </div>

        <div className="divide-y">
          {banners.map(banner => (
            <div key={banner.id} className="p-4 hover:bg-gray-50 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-24 bg-gray-100 rounded overflow-hidden">
                  <img 
                    src={banner.image} 
                    alt={banner.title} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{banner.title}</h4>
                  <div className="flex items-center mt-1">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      banner.active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {banner.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                  title="Preview Banner"
                >
                  <FaEye />
                </button>
                <button 
                  className={`p-2 rounded-full ${
                    banner.active 
                      ? 'text-gray-600 hover:bg-gray-100' 
                      : 'text-green-600 hover:bg-green-50'
                  }`}
                  title={banner.active ? 'Deactivate' : 'Activate'}
                  onClick={() => toggleBannerStatus(banner.id)}
                >
                  {banner.active ? 'Deactivate' : 'Activate'}
                </button>
                <button 
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  title="Delete Banner"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
