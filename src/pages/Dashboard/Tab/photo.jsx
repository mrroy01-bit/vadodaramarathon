import React, { useState } from "react";
import { FaCloudUploadAlt, FaTrashAlt, FaImage } from "react-icons/fa";

export function PhotoTab() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

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

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-blue-50 p-6 border-b">
        <h3 className="text-xl font-semibold text-gray-800">Photo Gallery Management</h3>
        <p className="text-gray-600 mt-1">Upload and manage photos for the marathon gallery</p>
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
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                placeholder="Enter a descriptive title"
              />
            </div>
            
            
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Description (Optional)</label>
              <textarea 
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
  );
}
