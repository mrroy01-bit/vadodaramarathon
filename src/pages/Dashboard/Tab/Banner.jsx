import React, { useState } from "react";
import { FaCloudUploadAlt, FaTrashAlt, FaImage, FaEye, FaUser, FaPhone, FaCalendarAlt, FaLink, FaEnvelope } from "react-icons/fa";

export function BannerTab() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [bannerTitle, setBannerTitle] = useState("");
  const [bannerLocation, setBannerLocation] = useState("");
  const [bannerActive, setBannerActive] = useState(false);
  
  // Enhanced banners with uploader information
  const [banners, setBanners] = useState([
    { 
      id: 1, 
      title: "Marathon 2025 Banner", 
      active: true, 
      location: "home",
      image: "/src/assest/banner.jpg",
      uploadDate: "2025-07-15",
      uploader: {
        name: "Rajesh Kumar",
        
      }
    },
    { 
      id: 2, 
      title: "Registration Banner", 
      active: false, 
      location: "registration",
      image: "/src/assest/img_form.jpg",
      uploadDate: "2025-07-28",
      uploader: {
        name: "Priya Sharma",
       
      }
    }
  ]);
  
  // State for banner preview modal
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
    setBannerTitle("");
    setBannerLocation("");
    setBannerActive(false);
  };

  const handleBannerUpload = () => {
    if (!selectedFile || !bannerTitle || !bannerLocation) return;
    
    const newBanner = {
      id: banners.length > 0 ? Math.max(...banners.map(b => b.id)) + 1 : 1,
      title: bannerTitle,
      active: bannerActive,
      location: bannerLocation,
      image: previewUrl,
      uploadDate: new Date().toISOString().split('T')[0],
      uploader: {
        name: "Admin User", // Would come from authentication
        phone: "+91 99999 88888", // Would come from user profile
        email: "admin@example.com"
      }
    };
    
    setBanners([...banners, newBanner]);
    handleReset();
  };

  const toggleBannerStatus = (id) => {
    setBanners(banners.map(banner => ({
      ...banner,
      active: banner.id === id ? !banner.active : banner.active
    })));
  };
  
  const openBannerPreview = (banner) => {
    setSelectedBanner(banner);
    setShowModal(true);
  };
  
  const closeBannerPreview = () => {
    setShowModal(false);
  };
  
  const deleteBanner = (id) => {
    setBanners(banners.filter(banner => banner.id !== id));
    if (selectedBanner && selectedBanner.id === id) {
      closeBannerPreview();
    }
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
                  value={bannerTitle}
                  onChange={(e) => setBannerTitle(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Enter a title for the banner"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Banner Location</label>
                <select 
                  value={bannerLocation}
                  onChange={(e) => setBannerLocation(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select location</option>
                  <option value="home">Home Page</option>
                  <option value="registration">Registration Page</option>
                  <option value="results">Results Page</option>
                  <option value="sponsors">Sponsors Page</option>
                </select>
              </div>
              
              <div className="flex items-center mt-4">
                <input 
                  type="checkbox" 
                  id="active-banner" 
                  checked={bannerActive}
                  onChange={(e) => setBannerActive(e.target.checked)}
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
              onClick={handleBannerUpload}
              className={`px-6 py-2 rounded-md text-white font-medium ${
                selectedFile && bannerTitle && bannerLocation
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-blue-400 cursor-not-allowed'
              }`}
              disabled={!selectedFile || !bannerTitle || !bannerLocation}
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
                  <h4 className="font-medium text-gray-800">
                    <span className="flex items-center">
                      <FaImage className="text-blue-600 mr-2" size={14} />
                      {banner.title}
                    </span>
                  </h4>
                  <div className="flex items-center mt-1 space-x-2">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      banner.active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {banner.active ? 'Active' : 'Inactive'}
                    </span>
                    <span className="text-xs text-gray-500">
                      Added by <span className="font-medium text-blue-600">{banner.uploader.name}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  className="p-2 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-full transition-colors"
                  title="Preview Banner"
                  onClick={() => openBannerPreview(banner)}
                >
                  <FaEye size={18} />
                </button>
                <button 
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    banner.active 
                      ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                      : 'bg-green-50 text-green-600 hover:bg-green-100'
                  }`}
                  title={banner.active ? 'Deactivate' : 'Activate'}
                  onClick={() => toggleBannerStatus(banner.id)}
                >
                  {banner.active ? 'Deactivate' : 'Activate'}
                </button>
                <button 
                  className="p-2 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-full transition-colors"
                  title="Delete Banner"
                  onClick={() => deleteBanner(banner.id)}
                >
                  <FaTrashAlt size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Banner Preview Modal */}
      {showModal && selectedBanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full overflow-hidden">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-xl font-semibold text-gray-800">{selectedBanner.title}</h3>
              <button 
                onClick={closeBannerPreview}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-4">
              <div className="mb-6 bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={selectedBanner.image} 
                  alt={selectedBanner.title} 
                  className="w-full object-contain" 
                  style={{ maxHeight: '400px' }}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Banner Details</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex">
                        <span className="w-24 text-sm text-gray-600">Location:</span>
                        <span className="flex items-center text-sm font-medium capitalize">
                          <FaLink className="text-blue-600 mr-2" size={14} />
                          {selectedBanner.location}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-24 text-sm text-gray-600">Status:</span>
                        <span className={`text-sm font-medium ${selectedBanner.active ? 'text-green-600' : 'text-gray-600'}`}>
                          {selectedBanner.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-24 text-sm text-gray-600">Upload Date:</span>
                        <span className="flex items-center text-sm">
                          <FaCalendarAlt className="text-blue-600 mr-2" size={14} />
                          {selectedBanner.uploadDate}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-500">Uploader Information</h4>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <FaUser className="text-blue-600 mr-2" size={14} />
                        <span className="text-gray-900">{selectedBanner.uploader.name}</span>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t p-4 flex justify-end space-x-3">
              <button 
                onClick={closeBannerPreview}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  deleteBanner(selectedBanner.id);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete Banner
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
