import React, { useState, useEffect, useCallback } from "react";
import {
  FaCloudUploadAlt,
  FaTrashAlt,
  FaEye,
  FaDownload,
  FaSpinner,
} from "react-icons/fa";
import { sponsorService } from "../../../services/api";

export function SponsorTab() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [viewMode, setViewMode] = useState("upload");
  const [sponsorName, setSponsorName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState(""); 

  const [sponsors, setSponsors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedSponsor, setSelectedSponsor] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch all sponsors
  const fetchSponsors = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await sponsorService.getAllSponsors();
      const sponsorData = response?.data && Array.isArray(response.data) ? response.data : response;
      setSponsors(Array.isArray(sponsorData) ? sponsorData : []);
    } catch (err) {
      console.error("Error fetching sponsors:", err);
      setError(err.response?.data?.message || err.message || "Failed to fetch sponsors.");
      setSponsors([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSponsors();
  }, [fetchSponsors]);

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
    setSponsorName("");
    setWebsiteUrl("");
    setError(null);
  };

  // Upload sponsor
  const handleUpload = async () => {
    if (!selectedFile || !sponsorName) {
      alert("Please provide a sponsor name and select a logo.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // The service already creates FormData, so we pass an object.
      const sponsorData = {
        name: sponsorName,
        logo: selectedFile,
        website_url: websiteUrl,
      };

      await sponsorService.createSponsor(sponsorData);
      handleReset();
      await fetchSponsors(); // Refresh the list
      setViewMode("gallery"); // Switch to gallery view after successful upload
    } catch (err) {
      setError(err.response?.data?.error?.message || "Failed to upload sponsor.");
      console.error("Upload Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete sponsor
  const deleteSponsor = async (id) => {
    // Optimistically remove from UI
    setSponsors((prev) => prev.filter((sponsor) => sponsor._id !== id));
    if (selectedSponsor?._id === id) setShowModal(false);

    try {
      await sponsorService.deleteSponsor(id);
    } catch (err) {
      setError("Failed to delete sponsor. It may reappear on refresh.");
      console.error(err);
      fetchSponsors(); // Re-fetch to correct the UI state on failure
    }
  };

  const openSponsorDetails = (sponsor) => {
    setSelectedSponsor(sponsor);
    setShowModal(true);
  };

  const closeSponsorDetails = () => setShowModal(false);

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
          Upload Sponsor
        </button>
        <button
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            viewMode === "gallery"
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setViewMode("gallery")}
        >
          View Sponsors
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
                alt="Logo Preview"
                className="max-h-48 object-contain mb-4 rounded-md"
              />
            ) : (
              <FaCloudUploadAlt className="text-blue-500 text-5xl mb-3" />
            )}
            <p className="text-gray-700 font-medium">
              {previewUrl ? "Click to change logo" : "Click to upload sponsor logo"}
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
            value={sponsorName}
            placeholder="Sponsor Name"
            onChange={(e) => setSponsorName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="text"
            value={websiteUrl}
            placeholder="Sponsor Website URL (optional)"
            onChange={(e) => setWebsiteUrl(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              disabled={!selectedFile || !sponsorName || isLoading}
            >
              {isLoading ? "Uploading..." : "Upload Sponsor"}
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
              <FaSpinner className="animate-spin" /> <span>Loading Sponsors...</span>
            </div>
          ) : sponsors.length === 0 ? (
            <div className="text-center text-gray-500">
              No sponsors found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sponsors.map((sponsor) => {
                const imageUrl = sponsor.sponsor_img_url || sponsor.logo;
                const name = sponsor.sponsor_name || "Untitled Sponsor";
                const website = sponsor.website_url || "";
                
                return (
                  <div
                    key={sponsor._id || sponsor.id}
                    className="border rounded-lg shadow-sm overflow-hidden flex flex-col"
                  >
                    <div className="h-48 w-full bg-gray-100 flex items-center justify-center">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={name}
                          className="h-full w-full object-contain p-4 cursor-pointer"
                          onClick={() => openSponsorDetails({ ...sponsor, name, imageUrl, website })}
                        />
                      ) : (
                        <div className="text-gray-400 text-center p-4">
                           <p className="text-sm">No Logo Available</p>
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex-grow flex flex-col justify-between">
                      <div>
                        <h4 className="font-semibold text-lg truncate">{name}</h4>
                        {website && (
                            <a href={website} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm mt-1 truncate block hover:underline">
                                {website}
                            </a>
                        )}
                      </div>
                      <div className="flex justify-end space-x-4 mt-4">
                        <button
                          onClick={() => openSponsorDetails({ ...sponsor, name, imageUrl, website })}
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
                            title="Download Logo"
                          >
                            <FaDownload />
                          </a>
                        )}
                        <button
                          onClick={() => deleteSponsor(sponsor._id || sponsor.id)}
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
      {showModal && selectedSponsor && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto flex flex-col">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-xl font-semibold">
                {selectedSponsor.name}
              </h3>
              <button
                onClick={closeSponsorDetails}
                className="text-2xl font-light"
              >
                &times;
              </button>
            </div>
            <div className="p-4">
              {selectedSponsor.imageUrl ? (
                <img
                  src={selectedSponsor.imageUrl}
                  alt={selectedSponsor.name}
                  className="w-full object-contain max-h-[60vh] rounded-md mb-4"
                />
              ) : (
                 <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-md mb-4">
                    <p className="text-gray-500">No Logo Available</p>
                 </div>
              )}
              {selectedSponsor.website && (
                  <p className="text-gray-700">
                    <strong>Website:</strong>{" "}
                    <a href={selectedSponsor.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {selectedSponsor.website}
                    </a>
                  </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}