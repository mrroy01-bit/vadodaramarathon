import React, { useState, useEffect, useCallback } from "react";
import {
  FaCloudUploadAlt,
  FaTrashAlt,
  FaEye,
  FaDownload,
  FaSpinner,
} from "react-icons/fa";
import { partnerService } from "../../../services/api"; // Corrected import

export function PartnersTab() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [viewMode, setViewMode] = useState("upload");
  const [partnerName, setPartnerName] = useState(""); // Renamed state
  const [websiteUrl, setWebsiteUrl] = useState("");

  const [partners, setPartners] = useState([]); // Renamed state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedPartner, setSelectedPartner] = useState(null); // Renamed state
  const [showModal, setShowModal] = useState(false);

  // Fetch all partners
  const fetchPartners = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await partnerService.getAllPartners();
      const partnerData = response?.data && Array.isArray(response.data) ? response.data : response;
      setPartners(Array.isArray(partnerData) ? partnerData : []);
    } catch (err) {
      console.error("Error fetching partners:", err);
      setError(err.response?.data?.message || err.message || "Failed to fetch partners.");
      setPartners([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPartners();
  }, [fetchPartners]);

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
    setPartnerName("");
    setWebsiteUrl("");
    setError(null);
  };

  // Upload partner
  const handleUpload = async () => {
    if (!selectedFile || !partnerName) {
      alert("Please provide a partner name and select a logo.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const partnerData = {
        name: partnerName,
        logo: selectedFile,
        website_url: websiteUrl,
      };

      await partnerService.createPartner(partnerData);
      handleReset();
      await fetchPartners(); // Refresh the list
      setViewMode("gallery");
    } catch (err) {
      setError(err.response?.data?.error?.message || "Failed to upload partner.");
      console.error("Upload Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete partner
  const deletePartner = async (id) => {
    setPartners((prev) => prev.filter((partner) => partner._id !== id));
    if (selectedPartner?._id === id) setShowModal(false);

    try {
      await partnerService.deletePartner(id);
    } catch (err) {
      setError("Failed to delete partner. It may reappear on refresh.");
      console.error(err);
      fetchPartners();
    }
  };

  const openPartnerDetails = (partner) => {
    setSelectedPartner(partner);
    setShowModal(true);
  };

  const closePartnerDetails = () => setShowModal(false);

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
          Upload Partner
        </button>
        <button
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            viewMode === "gallery"
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setViewMode("gallery")}
        >
          View Partners
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
              {previewUrl ? "Click to change logo" : "Click to upload partner logo"}
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
            value={partnerName}
            placeholder="Partner Name"
            onChange={(e) => setPartnerName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="text"
            value={websiteUrl}
            required
            placeholder="Partner Website URL "
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
              disabled={!selectedFile || !partnerName || isLoading}
            >
              {isLoading ? "Uploading..." : "Upload Partner"}
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
              <FaSpinner className="animate-spin" /> <span>Loading Partners...</span>
            </div>
          ) : partners.length === 0 ? (
            <div className="text-center text-gray-500">
              No partners found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partners.map((partner) => {
                const imageUrl = partner.partner_img_url;
                const name = partner.partner_name || "Untitled Partner";
                const website = partner.partner_website_url || "";
                
                return (
                  <div
                    key={partner._id || partner.id}
                    className="border rounded-lg shadow-sm overflow-hidden flex flex-col"
                  >
                    <div className="h-48 w-full bg-gray-100 flex items-center justify-center">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={name}
                          className="h-full w-full object-contain p-4 cursor-pointer"
                          onClick={() => openPartnerDetails({ ...partner, name, imageUrl, website })}
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
                          onClick={() => openPartnerDetails({ ...partner, name, imageUrl, website })}
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
                          onClick={() => deletePartner(partner._id || partner.id)}
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
      {showModal && selectedPartner && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto flex flex-col">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-xl font-semibold">
                {selectedPartner.name}
              </h3>
              <button
                onClick={closePartnerDetails}
                className="text-2xl font-light"
              >
                &times;
              </button>
            </div>
            <div className="p-4">
              {selectedPartner.imageUrl ? (
                <img
                  src={selectedPartner.imageUrl}
                  alt={selectedPartner.name}
                  className="w-full object-contain max-h-[60vh] rounded-md mb-4"
                />
              ) : (
                 <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-md mb-4">
                    <p className="text-gray-500">No Logo Available</p>
                 </div>
              )}
              {selectedPartner.website && (
                  <p className="text-gray-700">
                    <strong>Website:</strong>{" "}
                    <a href={selectedPartner.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {selectedPartner.website}
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
