import React, { useState, useEffect, useCallback } from "react";
import {
  FaCloudUploadAlt,
  FaTrashAlt,
  FaEye,
  FaDownload,
  FaSpinner,
} from "react-icons/fa";
import { raceCategoryService } from "../../../services/api";

export function RaceTab() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [viewMode, setViewMode] = useState("upload");
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch all race categories
  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await raceCategoryService.getAllCategories();
      setCategories(Array.isArray(response) ? response : response?.data || []);
    } catch (err) {
      setError("Failed to fetch race categories.");
      console.error(err);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // File selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setCategoryName("");
    setDescription("");
    setError(null);
  };

  // Upload category
  const handleUpload = async () => {
    if (!selectedFile || !categoryName) {
      alert("Please select a file and enter a title.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("category_name", categoryName);
      formData.append("race_category_filename", selectedFile);
      if (description) formData.append("description", description);

      await raceCategoryService.createCategory(formData);
      handleReset();
      await fetchCategories();
      setViewMode("gallery");
    } catch (err) {
      setError(
        err.response?.data?.error?.message || "Failed to upload race category."
      );
      console.error("Upload Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete category
  const deleteCategory = async (id) => {
    setCategories((prev) => prev.filter((cat) => cat._id !== id));
    if (selectedCategory?._id === id) setShowModal(false);

    try {
      await raceCategoryService.deleteCategory(id);
    } catch (err) {
      setError("Failed to delete category. It may reappear on refresh.");
      console.error(err);
      fetchCategories();
    }
  };

  const openCategoryDetails = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const closeCategoryDetails = () => setShowModal(false);

  return (
    <div className="space-y-6">
      {/* Toggle Buttons */}
      <div className="bg-white rounded-lg shadow-sm p-2 flex">
        <button
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            viewMode === "upload"
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setViewMode("upload")}
        >
          Upload Race
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

      {/* Upload View */}
      {viewMode === "upload" && (
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          {error && (
            <div className="p-3 text-center bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          {isLoading && (
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <FaSpinner className="animate-spin" /> <span>Processing...</span>
            </div>
          )}

          <div
            className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors ${
              previewUrl ? "border-blue-400" : "border-gray-300"
            }`}
            onClick={() => document.getElementById("file-upload").click()}
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-48 object-contain mb-4 rounded-md"
              />
            ) : (
              <FaCloudUploadAlt className="text-blue-500 text-5xl mb-3" />
            )}
            <p className="text-gray-700 font-medium">
              {previewUrl
                ? "Click to change image"
                : "Click to upload an image"}
            </p>
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <input
            type="text"
            value={categoryName}
            placeholder="Race title"
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <textarea
            value={description}
            placeholder="Race description (optional)"
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="3"
          />

          <div className="flex justify-end space-x-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 border rounded-md font-medium text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-400"
              disabled={!selectedFile || !categoryName || isLoading}
            >
              {isLoading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      )}

      {/* Gallery View */}
      {viewMode === "gallery" && (
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          {error && (
            <div className="p-3 text-center bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <FaSpinner className="animate-spin" />{" "}
              <span>Loading Categories...</span>
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center text-gray-500">
              No race categories found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <div
                  key={cat._id}
                  className="border rounded-lg shadow-sm overflow-hidden"
                >
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-semibold text-lg">{cat.title}</h4>
                    <p className="text-gray-600 text-sm mt-1 truncate">
                      {cat.description}
                    </p>
                    <div className="flex justify-end space-x-3 mt-4">
                      <button
                        onClick={() => openCategoryDetails(cat)}
                        className="text-blue-600 hover:text-blue-800"
                        title="View"
                      >
                        <FaEye />
                      </button>
                      <a
                        href={cat.image}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-800"
                        title="Download"
                      >
                        <FaDownload />
                      </a>
                      <button
                        onClick={() => deleteCategory(cat._id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {showModal && selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto flex flex-col">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-xl font-semibold">
                {selectedCategory.title}
              </h3>
              <button
                onClick={closeCategoryDetails}
                className="text-2xl font-light"
              >
                &times;
              </button>
            </div>
            <div className="p-4">
              <img
                src={selectedCategory.image}
                alt={selectedCategory.title}
                className="w-full object-contain max-h-[60vh] rounded-md mb-4"
              />
              <p className="text-gray-700">{selectedCategory.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
