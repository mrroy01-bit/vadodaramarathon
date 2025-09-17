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
      
      // Handle different response structures
      let categoryData = [];
      if (Array.isArray(response)) {
        categoryData = response;
      } else if (response?.data && Array.isArray(response.data)) {
        categoryData = response.data;
      } else if (response?.categories && Array.isArray(response.categories)) {
        categoryData = response.categories;
      } else if (response?.data?.categories && Array.isArray(response.data.categories)) {
        categoryData = response.data.categories;
      } else {
        console.warn("Unexpected response structure:", response);
        categoryData = []; // Fallback to empty array
      }
      
      setCategories(categoryData);
    } catch (err) {
      console.error("Error fetching race categories:", err);
      setError(err.response?.data?.message || err.message || "Failed to fetch race categories.");
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
              {categories.map((cat) => {
                // Debug log to check category data
                console.log("Category data:", cat);
                
                // Determine the image URL
                // const imageUrl = cat.image || cat.imageUrl || cat.url || cat.file_path;
                const imageUrl =cat.race_category_url
                const title = cat.title || cat.category_name || cat.name || "Untitled";
                const description = cat.description || "";
                
                return (
                  <div
                    key={cat._id || cat.id}
                    className="border rounded-lg shadow-sm overflow-hidden"
                  >
                    <div className="h-48 w-full bg-gray-100 flex items-center justify-center">
                      {imageUrl ? (
                        <img
                         onClick={() => openCategoryDetails({
                            ...cat,
                            title: title,
                            image: imageUrl,
                            description: description
                          })}
                          src={imageUrl}
                          alt={title}
                          className="h-48 w-full object-cover cursor-pointer"

                          onError={(e) => {
                            e.target.onerror = null;
                            console.warn(`Failed to load image for: ${title}. URL: ${imageUrl}`);
                            e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFNUU3RUIiLz48cGF0aCBkPSJNMTAwIDEyNUMxMTMuODA3IDEyNSAxMjUgMTEzLjgwNyAxMjUgMTAwQzEyNSA4Ni4xOTMgMTEzLjgwNyA3NSAxMDAgNzVDODYuMTkzIDc1IDc1IDg2LjE5MyA3NSAxMDBDNzUgMTEzLjgwNyA4Ni4xOTMgMTI1IDEwMCAxMjVaIiBmaWxsPSIjQTBBRUJBIi8+PHBhdGggZD0iTTU1IDU1SDY1VjY1SDU1VjU1WiIgZmlsbD0iI0EwQUVCQSIvPjxwYXRoIGQ9Ik0xMzUgNTVIMTQ1VjY1SDEzNVY1NVoiIGZpbGw9IiNBMEFFQkEiLz48cGF0aCBkPSJNNTUgMTM1SDY1VjE0NUg1NVYxMzVaIiBmaWxsPSIjQTBBRUJBIi8+PHBhdGggZD0iTTEzNSAxMzVIMTQ1VjE0NUgxMzVWMTM1WiIgZmlsbD0iI0EwQUVCQSIvPjwvc3ZnPg==";
                          }}
                        />
                      ) : (
                        <div className="text-gray-400 flex flex-col items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-sm">No image available</p>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-lg">{title}</h4>
                      <p className="text-gray-600 text-sm mt-1 truncate">
                        {description}
                      </p>
                      <div className="flex justify-end space-x-3 mt-4">
                        <button
                          onClick={() => openCategoryDetails({
                            ...cat,
                            title: title,
                            image: imageUrl,
                            description: description
                          })}
                          className="text-blue-600 hover:text-blue-800"
                          title="View"
                        >
                          <FaEye />
                        </button>
                        {imageUrl && (
                          <a
                            href={imageUrl}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-800"
                            title="Download"
                          >
                            <FaDownload />
                          </a>
                        )}
                        <button
                          onClick={() => deleteCategory(cat._id || cat.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
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
              {selectedCategory.image ? (
                <img
                  src={selectedCategory.image}
                  alt={selectedCategory.title}
                  className="w-full object-contain max-h-[60vh] rounded-md mb-4"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFNUU3RUIiLz48cGF0aCBkPSJNMTAwIDEyNUMxMTMuODA3IDEyNSAxMjUgMTEzLjgwNyAxMjUgMTAwQzEyNSA4Ni4xOTMgMTEzLjgwNyA3NSAxMDAgNzVDODYuMTkzIDc1IDc1IDg2LjE5MyA3NSAxMDBDNzUgMTEzLjgwNyA4Ni4xOTMgMTI1IDEwMCAxMjVaIiBmaWxsPSIjQTBBRUJBIi8+PHBhdGggZD0iTTU1IDU1SDY1VjY1SDU1VjU1WiIgZmlsbD0iI0EwQUVCQSIvPjxwYXRoIGQ9Ik0xMzUgNTVIMTQ1VjY1SDEzNVY1NVoiIGZpbGw9IiNBMEFFQkEiLz48cGF0aCBkPSJNNTUgMTM1SDY1VjE0NUg1NVYxMzVaIiBmaWxsPSIjQTBBRUJBIi8+PHBhdGggZD0iTTEzNSAxMzVIMTQ1VjE0NUgxMzVWMTM1WiIgZmlsbD0iI0EwQUVCQSIvPjwvc3ZnPg==";
                    console.warn(`Failed to load modal image for: ${selectedCategory.title}`);
                  }}
                />
              ) : (
                <div className="w-full h-[60vh] flex items-center justify-center bg-gray-100 rounded-md mb-4">
                  <div className="text-gray-400 flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-lg">No image available</p>
                  </div>
                </div>
              )}
              <p className="text-gray-700">{selectedCategory.description}</p>
              
              {/* Additional debug information - can be removed in production */}
              {process.env.NODE_ENV === 'development' && (
                <div className="mt-4 p-4 bg-gray-100 rounded text-xs text-gray-600">
                  <p className="font-bold">Debug Info:</p>
                  <p>ID: {selectedCategory._id || selectedCategory.id || 'N/A'}</p>
                  <p>Image URL: {selectedCategory.image || 'N/A'}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
