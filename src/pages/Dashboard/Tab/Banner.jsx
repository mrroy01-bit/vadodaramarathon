import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { heroImageService } from "../../../services/api";
import { FaUpload, FaSyncAlt, FaTrash, FaTimes, FaCamera } from "react-icons/fa";

const BannerTab = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [activeTab, setActiveTab] = useState("upload");
  const [allBanners, setAllBanners] = useState([]);
  const fileInputRef = useRef(null); // ref for file picker

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
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
      fetchAllBanners();
      handleRemove();
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
      fetchAllBanners();
      handleRemove();
    } catch (error) {
      console.error("Error updating banner:", error);
      toast.error(error.response?.data?.message || "Failed to update hero image");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;
    try {
      await heroImageService.deleteHeroImage(id);
      toast.success("Hero image deleted successfully!");
      fetchAllBanners();
    } catch (error) {
      console.error("Error deleting banner:", error);
      toast.error("Failed to delete hero image");
    }
  };

  const fetchAllBanners = async () => {
    try {
      const response = await heroImageService.getAllHero();
      console.log("Fetched banners:", response.data);
      setAllBanners(response.data);
    } catch (error) {
      console.error("Error fetching banners:", error);
      toast.error("Failed to load banners");
    }
  };

  useEffect(() => {
    if (activeTab === "view") {
      fetchAllBanners();
    }
  }, [activeTab]);

  return (
    <div className="p-6 bg-white shadow-xl rounded-2xl max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">🎨 Manage Hero Banner</h2>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        {["upload", "view"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 font-semibold transition-all ${
              activeTab === tab
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-600 hover:text-indigo-600"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "upload" ? "Upload / Update" : "View All"}
          </button>
        ))}
      </div>

      {/* Upload / Update Tab */}
      {activeTab === "upload" && (
        <div>
          <div className="mb-6">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current.click()}
              className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition"
            >
              Choose File
            </button>
          </div>

          {previewUrl && (
            <div className="relative mb-6 rounded-lg shadow overflow-hidden max-w-lg mx-auto">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg"
              />
              {/* Remove button */}
              <button
                onClick={handleRemove}
                className="absolute top-3 right-3 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition"
              >
                <FaTimes />
              </button>
              {/* Update Image button (camera icon) */}
              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-3 right-3 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition"
              >
                <FaCamera />
              </button>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={handleUpload}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition"
            >
              <FaUpload /> Upload
            </button>
            <button
              onClick={handleUpdate}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
            >
              <FaSyncAlt /> Update
            </button>
          </div>
        </div>
      )}

      {/* View All Tab */}
      {activeTab === "view" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allBanners.length > 0 ? (
            allBanners.map((banner) => (
              <div
                key={banner._id}
                className="group rounded-lg shadow-md overflow-hidden bg-gray-100 relative transition transform hover:scale-[1.02]"
              >
                <img
                  src={banner.hero_image_file_url}
                  alt="Hero Banner"
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => handleDelete(banner._id)}
                  className="absolute top-3 right-3 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <FaTrash />
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center text-gray-500 py-12">
              <FaUpload className="text-5xl mb-3 opacity-40" />
              <p>No banners found. Upload one to get started.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BannerTab;
