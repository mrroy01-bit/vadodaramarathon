import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { heroImageService } from "../../../services/api";

const BannerTab = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const [previewUrl, setPreviewUrl] = useState(null);

  const token = localStorage.getItem("user_token");

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setSelectedFile(file);

    setPreviewUrl(URL.createObjectURL(file));
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
    <div className="p-6 bg-white shadow-md rounded-md">
            <h2 className="text-xl font-semibold mb-4">Manage Hero Banner</h2> 
         {" "}
      <div className="mb-4">
               {" "}
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4

                     file:rounded-full file:border-0

                     file:text-sm file:font-semibold

                     file:bg-blue-50 file:text-blue-700

                     hover:file:bg-blue-100"
        />
             {" "}
      </div>
           {" "}
      {previewUrl && (
        <div className="mb-4">
                    <p className="text-gray-600 text-sm mb-2">Preview:</p>     
             {" "}
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full max-w-lg h-64 object-cover rounded-md border"
          />
                 {" "}
        </div>
      )}
           {" "}
      <div className="flex space-x-4">
               {" "}
        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
                    Upload        {" "}
        </button>
               {" "}
        <button
          onClick={handleUpdate}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
                    Update        {" "}
        </button>
             {" "}
      </div>
         {" "}
    </div>
  );
};

export default BannerTab;
