import React, { useState, useEffect, useRef } from "react";
import { 
  FaCloudUploadAlt, FaTrashAlt, FaEye, FaSpinner, FaShareAlt 
} from "react-icons/fa";

// This mock data simulates fetching existing photos from an API.
const mockInitialPhotos = [
  {
    id: 1,
    title: "Finish Line Moment",
    description: "Runners crossing the finish line at the annual city marathon.",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
    uploadDate: "2025-09-15",
    uploader: { name: "Admin User" }
  },
  {
    id: 2,
    title: "Hydration Station",
    description: "A volunteer handing out water to a marathon participant.",
    imageUrl: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=500",
    uploadDate: "2025-09-15",
    uploader: { name: "Admin User" }
  }
];

export function UserTab() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [photoTitle, setPhotoTitle] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const [viewMode, setViewMode] = useState("upload");
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(true);
  const [photoError, setPhotoError] = useState(null);

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const [sharePhotoId, setSharePhotoId] = useState(null);
  const shareDropdownRef = useRef(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        setUploadedPhotos(mockInitialPhotos);
      } catch (err) {
        setPhotoError("Failed to fetch photos.");
        console.error("Error fetching photos:", err);
      } finally {
        setIsLoadingPhotos(false);
      }
    };
    fetchPhotos();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareDropdownRef.current && !shareDropdownRef.current.contains(event.target)) {
        setShowShareDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setUploadError(null);
    }
  };

  const handleFormReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setPhotoTitle("");
    setUploadError(null);
  };
  
  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select a file to upload.");
    setIsUploading(true);
    setUploadError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const newPhoto = {
        id: Date.now(),
        title: photoTitle || "Untitled Photo",
        description: "A newly uploaded photo.",
        imageUrl: previewUrl,
        uploadDate: new Date().toISOString().split('T')[0],
        uploader: { name: "Current User" }
      };
      setUploadedPhotos(prevPhotos => [newPhoto, ...prevPhotos]);
      handleFormReset();
      setViewMode("gallery");
    } catch (err) {
      console.error('Error uploading photo:', err);
      setUploadError('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };
  
  const openPhotoDetails = (photo) => {
    setSelectedPhoto(photo);
    setShowModal(true);
  };
  
  const closePhotoDetails = () => {
    setShowModal(false);
    setSelectedPhoto(null);
  };
  
  const deletePhoto = (photoId) => {
    if (window.confirm("Are you sure you want to delete this photo?")) {
      setUploadedPhotos(uploadedPhotos.filter(photo => photo.id !== photoId));
      if (selectedPhoto && selectedPhoto.id === photoId) closePhotoDetails();
    }
  };

  /**
   * Main share handler: Tries to share the image file directly.
   * Falls back to showing social media links if the browser doesn't support it.
   */
  const handleShare = async (photo) => {
    if (navigator.share && navigator.canShare) {
      try {
        const response = await fetch(photo.imageUrl);
        const blob = await response.blob();
        const file = new File([blob], `${photo.title.replace(/\s+/g, '-')}.jpg`, { type: blob.type });

        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: photo.title,
            text: `${photo.title} - ${photo.description || ''}`,
          });
          console.log('Image, title and description shared successfully!');
        } else {
          toggleShareDropdown(photo.id);
        }
      } catch (error) {
        console.error('Error sharing image:', error);
      }
    } else {
      toggleShareDropdown(photo.id);
    }
  };

  const toggleShareDropdown = (photoId) => {
    setSharePhotoId(photoId);
    setShowShareDropdown(prev => !prev);
  };

  // Social media share links (with title + description)
  const generateShareLink = (platform, photo) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(photo.title);
    const description = encodeURIComponent(photo.description || photo.title);

    switch (platform) {
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}%20-%20${description}`;
      case 'twitter':
        return `https://twitter.com/intent/tweet?url=${url}&text=${title}%20-%20${description}`;
      case 'linkedin':
        return `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${description}`;
      default:
        return '#';
    }
  };

  return (
    <div className="space-y-6">
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

      {/* --- UPLOAD VIEW --- */}
      {viewMode === "upload" && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-50 p-6 border-b">
            <h3 className="text-xl font-semibold text-gray-800">Upload New Photo</h3>
            <p className="text-gray-600 mt-1">Select an image and give it a title.</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div 
                  className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 ${
                    previewUrl ? 'border-blue-400' : 'border-gray-300'
                  }`}
                  onClick={() => document.getElementById('photo-upload').click()}
                >
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="max-h-48 object-contain mb-4" />
                  ) : (
                    <FaCloudUploadAlt className="text-blue-500 text-5xl mb-3" />
                  )}
                  <p className="text-gray-700 font-medium mb-1">
                    {previewUrl ? 'Click to change image' : 'Click to upload'}
                  </p>
                  <input type="file" id="photo-upload" accept="image/*" className="hidden" onChange={handleFileChange} />
                </div>
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">Photo Title</label>
                <input 
                  type="text" 
                  value={photoTitle}
                  onChange={(e) => setPhotoTitle(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" 
                  placeholder="e.g., 'Finish Line Fun Run'"
                />
              </div>
            </div>
            {uploadError && <div className="mt-4 text-red-600">{uploadError}</div>}
            <div className="mt-8 flex justify-end space-x-3">
              <button onClick={handleFormReset} className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button 
                onClick={handleUpload}
                className={`px-6 py-2 rounded-md text-white font-medium flex items-center justify-center ${
                  !selectedFile || isUploading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
                disabled={!selectedFile || isUploading}
              >
                {isUploading ? <FaSpinner className="animate-spin mr-2" /> : null}
                {isUploading ? 'Uploading...' : 'Upload Photo'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- GALLERY VIEW --- */}
      {viewMode === "gallery" && (
        <div className="bg-white rounded-lg shadow-md">
          <div className="bg-blue-50 p-6 border-b">
            <h3 className="text-xl font-semibold text-gray-800">Photo Gallery</h3>
            <p className="text-gray-600 mt-1">View and manage uploaded photos.</p>
          </div>
          <div className="p-6">
            {isLoadingPhotos ? (
              <div className="text-center py-12">Loading photos...</div>
            ) : photoError ? (
              <div className="text-center py-12 text-red-600">{photoError}</div>
            ) : uploadedPhotos.length === 0 ? (
              <div className="text-center py-12 text-gray-500">No photos uploaded yet.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {uploadedPhotos.map((photo) => (
                  <div key={photo.id} className="border rounded-lg overflow-hidden shadow-sm">
                    <img src={photo.imageUrl} alt={photo.title} className="object-cover w-full h-48" />
                    <div className="p-4">
                      <h4 className="font-medium truncate">{photo.title}</h4>
                      <p className="text-sm text-gray-600">{photo.uploadDate}</p>
                      <div className="mt-4 flex justify-end space-x-2">
                        <button onClick={() => openPhotoDetails(photo)} className="p-1.5 text-gray-500 hover:text-blue-600" title="View"><FaEye /></button>
                        
                        <div className="relative" ref={shareDropdownRef}>
                          <button onClick={() => handleShare(photo)} className="p-1.5 text-gray-500 hover:text-green-600" title="Share">
                            <FaShareAlt />
                          </button>
                          
                          {showShareDropdown && sharePhotoId === photo.id && (
                            <div className="absolute right-0 bottom-full mb-2 w-36 bg-white border rounded-md shadow-lg py-1 z-10">
                              <a href={generateShareLink('facebook', photo)} target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Facebook</a>
                              <a href={generateShareLink('twitter', photo)} target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Twitter</a>
                              <a href={generateShareLink('linkedin', photo)} target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">LinkedIn</a>
                            </div>
                          )}
                        </div>
                        
                        <button onClick={() => deletePhoto(photo.id)} className="p-1.5 text-gray-500 hover:text-red-600" title="Delete"><FaTrashAlt /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- PHOTO DETAIL MODAL --- */}
      {showModal && selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-xl font-semibold">{selectedPhoto.title}</h3>
              <button onClick={closePhotoDetails} className="text-gray-500 hover:text-gray-800">&times;</button>
            </div>
            <div className="p-4">
              <img src={selectedPhoto.imageUrl} alt={selectedPhoto.title} className="w-full rounded-lg mb-4 max-h-[60vh] object-contain" />
              <p>{selectedPhoto.description}</p>
              <p className="text-sm text-gray-500 mt-2">Uploaded by: {selectedPhoto.uploader.name} on {selectedPhoto.uploadDate}</p>
            </div>
            <div className="p-4 border-t flex justify-end space-x-2">
              <button onClick={closePhotoDetails} className="px-4 py-2 border rounded-md">Close</button>
              
              <div className="relative" ref={shareDropdownRef}>
                <button 
                  onClick={() => handleShare(selectedPhoto)}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
                >
                  <FaShareAlt /> Share
                </button>
                
                {showShareDropdown && sharePhotoId === selectedPhoto.id && (
                  <div className="absolute right-0 bottom-full mb-2 w-36 bg-white border rounded-md shadow-lg py-1 z-10">
                    <a href={generateShareLink('facebook', selectedPhoto)} target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Facebook</a>
                    <a href={generateShareLink('twitter', selectedPhoto)} target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Twitter</a>
                    <a href={generateShareLink('linkedin', selectedPhoto)} target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">LinkedIn</a>
                  </div>
                )}
              </div>

              <button onClick={() => deletePhoto(selectedPhoto.id)} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
