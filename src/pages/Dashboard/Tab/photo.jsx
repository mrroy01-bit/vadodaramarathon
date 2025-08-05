import React, { useState } from "react";
import { FaCloudUploadAlt, FaTrashAlt, FaImage, FaUser, FaPhone, FaEye, FaDownload, FaEllipsisH, FaEnvelope } from "react-icons/fa";

export function PhotoTab() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [viewMode, setViewMode] = useState("upload"); // "upload" or "gallery"
  const [photoTitle, setPhotoTitle] = useState("");
  const [photoDescription, setPhotoDescription] = useState("");
  
  // Sample uploaded photos data
  const [uploadedPhotos, setUploadedPhotos] = useState([
    {
      id: 1,
      title: "Marathon Start Line",
      description: "Participants at the starting point of the marathon",
      imageUrl: "/src/assest/img_1.jpg",
      uploadDate: "2025-08-01",
      uploader: {
        name: "Raj Patel",
      }
    },
    {
      id: 2,
      title: "Medal Ceremony",
      description: "Winners receiving medals after completion",
      imageUrl: "/src/assest/img_3.jpg",
      uploadDate: "2025-08-02",
      uploader: {
        name: "Priya Sharma",
      }
    },
    {
      id: 3,
      title: "Volunteer Team",
      description: "Dedicated volunteers helping at water station",
      imageUrl: "/src/assest/img_5.jpg",
      uploadDate: "2025-08-03",
      uploader: {
        name: "Amit Singh",
        
      }
    }
  ]);
  
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
  };
  
  const handleUpload = () => {
    if (!selectedFile) return;
    
    // Simulate upload
    const newPhoto = {
      id: uploadedPhotos.length + 1,
      title: photoTitle || "Untitled Photo",
      description: photoDescription || "",
      imageUrl: previewUrl,
      uploadDate: new Date().toISOString().split('T')[0],
      uploader: {
        name: "Admin User", // Would come from authentication
        
      }
    };
    
    setUploadedPhotos([newPhoto, ...uploadedPhotos]);
    handleReset();
    setViewMode("gallery");
  };
  
  const openPhotoDetails = (photo) => {
    setSelectedPhoto(photo);
    setShowModal(true);
  };
  
  const closePhotoDetails = () => {
    setShowModal(false);
  };
  
  const deletePhoto = (photoId) => {
    setUploadedPhotos(uploadedPhotos.filter(photo => photo.id !== photoId));
    if (selectedPhoto && selectedPhoto.id === photoId) {
      closePhotoDetails();
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
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Description (Optional)</label>
                  <textarea 
                    value={photoDescription}
                    onChange={(e) => setPhotoDescription(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="Add a short description"
                    rows="3"
                  ></textarea>
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
            {uploadedPhotos.length === 0 ? (
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
