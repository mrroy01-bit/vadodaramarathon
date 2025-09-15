import React, { useState, useEffect } from "react";
import { FaCloudUploadAlt, FaTrashAlt, FaImage, FaUser, FaEye, FaDownload, FaSpinner } from "react-icons/fa";
import { raceCategoryService } from "../../../services/api";

export function PhotoTab() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [viewMode, setViewMode] = useState("upload"); // "upload" or "gallery"
  const [photoTitle, setPhotoTitle] = useState("");
  const [photoDescription, setPhotoDescription] = useState("");
  const [photoLocation, setPhotoLocation] = useState("");
  const [pageType, setPageType] = useState("");
  
  // Race category states
  const [raceCategories, setRaceCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Fetch race categories on component mount
  useEffect(() => {
    const fetchRaceCategories = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await raceCategoryService.getAllCategories();
        setRaceCategories(response);
      } catch (err) {
        setError('Failed to fetch race categories');
        console.error('Error fetching race categories:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (pageType === 'home') {
      fetchRaceCategories();
    }
  }, [pageType]);

  // Fetch photos when component mounts
  useEffect(() => {
    const fetchPhotos = async () => {
      setIsLoadingPhotos(true);
      setPhotoError(null);
      try {
        const response = await raceCategoryService.getAllCategories();
        setUploadedPhotos(response);
        setTotalPhotos(response.length);
      } catch (err) {
        setPhotoError('Failed to fetch photos');
        console.error('Error fetching photos:', err);
      } finally {
        setIsLoadingPhotos(false);
      }
    };

    fetchPhotos();
  }, []);

  // Photos state and loading states
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(false);
  const [photoError, setPhotoError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPhotos, setTotalPhotos] = useState(0);
  
  // State for photo detail modal
  const [selectedPhoto, setSelectedPhoto] = useState(null);
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
    setPhotoTitle("");
    setPhotoDescription("");
    setPhotoLocation("");
    setPageType("");
  };
  
  const handleUpload = async () => {
    if (!selectedFile || !photoLocation) {
      alert("Please select a file and location for the photo");
      return;
    }
    
    setIsLoading(true);
    setError(null);

    try {
      const categoryData = {
        title: photoTitle || "Untitled Photo",
        description: photoDescription || "",
        image: selectedFile,
        location: photoLocation
      };

      if (pageType === 'home') {
        // Create new race category
        await raceCategoryService.createCategory(categoryData);
        // Refresh race categories
        const updatedCategories = await raceCategoryService.getAllCategories();
        setRaceCategories(updatedCategories);
        handleReset();
        setViewMode("gallery");
      } else {
        // Handle regular photo upload
        const newPhoto = {
          id: uploadedPhotos.length + 1,
          title: photoTitle || "Untitled Photo",
          description: photoDescription || "",
          imageUrl: previewUrl,
          location: photoLocation,
          uploadDate: new Date().toISOString().split('T')[0],
          uploader: {
            name: "Admin User", // Would come from authentication
          }
        };
        
        setUploadedPhotos([newPhoto, ...uploadedPhotos]);
        handleReset();
        setViewMode("gallery");
      }
    } catch (err) {
      setError('Failed to upload photo');
      console.error('Error uploading photo:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const openPhotoDetails = (photo) => {
    setSelectedPhoto(photo);
    setShowModal(true);
  };
  
  const closePhotoDetails = () => {
    setShowModal(false);
  };
  
  const deletePhoto = async (photoId) => {
    try {
      setIsLoadingPhotos(true);
      await raceCategoryService.deleteCategory(photoId);
      setUploadedPhotos(uploadedPhotos.filter(photo => photo.id !== photoId));
      if (selectedPhoto && selectedPhoto.id === photoId) {
        closePhotoDetails();
      }
    } catch (err) {
      setPhotoError('Failed to delete photo');
      console.error('Error deleting photo:', err);
    } finally {
      setIsLoadingPhotos(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toggle buttons */}
      <div className="bg-white rounded-lg shadow-sm p-2 flex">
        <button
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            viewMode === "upload"
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setViewMode("upload")}
        >
          Upload Photos
        </button>
        <button
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            viewMode === "gallery"
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setViewMode("gallery")}
        >
          View Gallery
        </button>
      </div>

      {viewMode === "upload" ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-blue-50 p-6 border-b">
            <h3 className="text-xl font-semibold text-gray-800">Upload New Photo</h3>
            <p className="text-gray-600 mt-1">Add a new photo to the marathon gallery</p>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Error and Loading States */}
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                  <strong className="font-bold">Error!</strong>
                  <span className="block sm:inline"> {error}</span>
                </div>
              )}
              
              {isLoading && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-4 rounded-lg shadow-lg">
                    <FaSpinner className="animate-spin h-8 w-8 text-blue-600" />
                    <p className="mt-2">Processing upload...</p>
                  </div>
                </div>
              )}

              {/* Upload Area */}
              <div className="space-y-6">
                <div 
                  className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors ${
                    previewUrl ? 'border-blue-400' : 'border-gray-300'
                  }`}
                  onClick={() => document.getElementById('photo-upload').click()}
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
                    {previewUrl ? 'Click to change image' : 'Click to upload an image'}
                  </p>
                  <p className="text-gray-500 text-sm text-center">
                    Or drag and drop files here
                  </p>
                  <input 
                    type="file" 
                    id="photo-upload"
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
                  <label className="block text-sm font-medium text-gray-700">Photo Title</label>
                  <input 
                    type="text" 
                    value={photoTitle}
                    onChange={(e) => setPhotoTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="Enter a descriptive title"
                  />
                </div>
                
                <div className="space-y-4">
                  {/* Page Selection */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Page Type</label>
                    <select
                      value={pageType}
                      onChange={(e) => {
                        setPageType(e.target.value);
                        setPhotoLocation(""); // Reset location when page type changes
                      }}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select a page</option>
                      <option value="home">Home Page</option>
                      <option value="other">Other Pages</option>
                    </select>
                  </div>

                  {/* Location Selection - Changes based on page type */}
                  {pageType && (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Photo Section</label>
                      <select
                        value={photoLocation}
                        onChange={(e) => setPhotoLocation(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select a section</option>
                        {pageType === "home" ? (
                          <>
                            <option value="Race Category">Race Category</option>
                            <option value="Event Highlights">Valued Sponsors</option>
                            <option value="Winners">Valued Partners</option>
                          </>
                        ) : (
                          <>
                            <option value="Gallery">Gallery</option>
                            <option value="About">About</option>
                            <option value="Teams">Teams</option>
                          </>
                        )}
                      </select>
                    </div>
                  )}
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
                onClick={handleUpload}
                className={`px-6 py-2 rounded-md text-white font-medium ${
                  selectedFile 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-blue-400 cursor-not-allowed'
                }`}
                disabled={!selectedFile}
              >
                Upload Photo
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-blue-50 p-6 border-b">
            <h3 className="text-xl font-semibold text-gray-800">Photo Gallery</h3>
            <p className="text-gray-600 mt-1">View and manage uploaded photos</p>
          </div>

          {/* Gallery Content */}
          <div className="p-6">
            {photoError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {photoError}</span>
              </div>
            )}

            {isLoadingPhotos ? (
              <div className="flex justify-center items-center py-12">
                <FaSpinner className="animate-spin h-8 w-8 text-blue-600" />
                <span className="ml-2">Loading photos...</span>
              </div>
            ) : uploadedPhotos.length === 0 ? (
              <div className="text-center py-12">
                <FaImage className="mx-auto text-gray-300 text-5xl mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No photos uploaded yet</h3>
                <p className="text-gray-500 mt-1">Upload some photos to see them here</p>
                <button 
                  onClick={() => setViewMode("upload")}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Upload Photos
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {uploadedPhotos.map((photo) => (
                    <div key={photo.id} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                        <img 
                          src={photo.imageUrl} 
                          alt={photo.title} 
                          className="object-cover w-full h-48"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium text-gray-900 truncate">{photo.title}</h4>
                        <p className="text-gray-500 text-sm mt-1 line-clamp-2">{photo.description}</p>
                        
                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-700">{photo.uploader.name}</p>
                              <p className="text-xs text-blue-600 flex items-center mt-1">
                                {photo.uploader.phone}
                              </p>
                            </div>
                            
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => openPhotoDetails(photo)}
                                className="p-1.5 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50"
                                title="View details"
                              >
                                <FaEye size={16} />
                              </button>
                              <button 
                                className="p-1.5 text-gray-500 hover:text-green-600 rounded-full hover:bg-green-50"
                                title="Download"
                              >
                                <FaDownload size={16} />
                              </button>
                              <button 
                                onClick={() => deletePhoto(photo.id)}
                                className="p-1.5 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50"
                                title="Delete"
                              >
                                <FaTrashAlt size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Photo Detail Modal */}
      {showModal && selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-xl font-semibold text-gray-800">{selectedPhoto.title}</h3>
              <button 
                onClick={closePhotoDetails}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="overflow-y-auto p-4 max-h-[calc(90vh-8rem)]">
              <div className="mb-6 bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={selectedPhoto.imageUrl} 
                  alt={selectedPhoto.title} 
                  className="w-full object-contain max-h-[50vh]"
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Description</h4>
                  <p className="mt-1 text-gray-900">{selectedPhoto.description || "No description provided."}</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Uploader Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <FaUser className="text-blue-600 mr-2" size={14} />
                      <span className="text-gray-900">{selectedPhoto.uploader.name}</span>
                    </div>
                    
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Upload Date</h4>
                  <p className="mt-1 text-gray-900">{selectedPhoto.uploadDate}</p>
                </div>
              </div>
            </div>
            
            <div className="border-t p-4 flex justify-end space-x-3">
              <button 
                onClick={closePhotoDetails}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <button 
                onClick={() => deletePhoto(selectedPhoto.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete Photo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
