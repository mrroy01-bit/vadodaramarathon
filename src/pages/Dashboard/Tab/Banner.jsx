import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { heroImageService } from "../../../services/api";

const BannerTab = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }

    try {
      await heroImageService.uploadHeroImage(selectedFile);
      toast.success("Hero image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading banner:", error);
      toast.error(error.response?.data?.message || "Failed to upload hero image");
    }
  };

  const handleUpdate = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }

    try {
      await heroImageService.updateHeroImage(selectedFile);
      toast.success("Hero image updated successfully!");
    } catch (error) {
      console.error("Error updating banner:", error);
      toast.error(error.response?.data?.message || "Failed to update hero image");
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Hero Banner</h2>

      <div className="mb-6">
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100
                     cursor-pointer"
        />
      </div>

      {previewUrl && (
        <div className="relative mb-6 rounded-lg shadow overflow-hidden max-w-lg mx-auto">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-25 flex items-end justify-end p-2">
            <button
              onClick={handleRemove}
              className="bg-red-600 text-white text-sm px-3 py-1 rounded-md hover:bg-red-700 transition"
            >
              Remove
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={handleUpload}
          className="flex-1 px-5 py-2 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700 transition"
        >
          Upload
        </button>
        <button
          onClick={handleUpdate}
          className="flex-1 px-5 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default BannerTab;
