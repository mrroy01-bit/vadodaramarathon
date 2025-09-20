import React, { useState, useRef, useCallback } from "react";
import {
  FaCertificate,
  FaSpinner,
  FaDownload,
  FaExclamationTriangle,
} from "react-icons/fa";
import { toast } from "react-toastify";

const UserCert = ({ userName,  templateUrl }) => {
  const [certificateUrl, setCertificateUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasPaid, setHasPaid] = useState(false);
  const canvasRef = useRef(null);

  const handlePayment = async () => {
    toast.info("Processing payment 💳...");
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setHasPaid(true);
      toast.success("Payment successful 🎉");
      generateCertificate();
    } catch (err) {
      toast.error("Payment failed. Please try again.");
    }
  };

  const generateCertificate = useCallback(() => {
    setIsLoading(true);
    setError(null);
    setCertificateUrl(null);

    if (!templateUrl) {
      const msg = "No certificate template provided.";
      setError(msg);
      toast.error(msg);
      setIsLoading(false);
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const template = new Image();
    template.crossOrigin = "Anonymous";
    template.src = templateUrl;

    template.onload = () => {
      try {
        const ratio = window.devicePixelRatio || 1;
        canvas.width = template.width * ratio;
        canvas.height = template.height * ratio;
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

        ctx.drawImage(template, 0, 0, template.width, template.height);

        // --- Draw Name ---
        let fontSize = 80;
        ctx.font = `bold ${fontSize}px 'Georgia', serif`;
        ctx.fillStyle = "#222";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const nameX = template.width / 2;
        const nameY = template.height * 0.46;

        while (
          ctx.measureText(userName.trim()).width > template.width * 0.75 &&
          fontSize > 28
        ) {
          fontSize -= 2;
          ctx.font = `bold ${fontSize}px 'Georgia', serif`;
        }

        ctx.fillText(userName.trim(), nameX, nameY);

        // --- Draw Date ---
        ctx.font = "500 42px 'Arial', sans-serif";
        ctx.fillStyle = "#444";

        const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
        setCertificateUrl(dataUrl);
        toast.success("Certificate generated successfully 🎉");
        setIsLoading(false);
      } catch (err) {
        console.error("Drawing error:", err);
        const msg = "Something went wrong while generating the certificate.";
        setError(msg);
        toast.error(msg);
        setIsLoading(false);
      }
    };

    template.onerror = () => {
      const msg =
        "Could not load the certificate template. Please check the template URL or try another one.";
      setError(msg);
      toast.error(msg);
      setIsLoading(false);
    };
  }, [userName, templateUrl]);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg p-8 md:p-10 max-w-3xl mx-auto text-center space-y-6 border border-gray-200">
      <div className="flex justify-center items-center gap-3">
        <FaCertificate className="text-yellow-500 text-4xl" />
        <h2 className="text-3xl font-extrabold text-gray-800 tracking-wide">
          Participation Certificate
        </h2>
      </div>

      {/* Hidden Canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {/* --- Preview Area --- */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 min-h-[280px] flex items-center justify-center bg-gray-50">
        {error && (
          <div className="text-red-600 space-y-2">
            <FaExclamationTriangle className="text-5xl mx-auto" />
            <p className="font-semibold text-lg">{error}</p>
          </div>
        )}
        {isLoading && (
          <div className="text-gray-600 space-y-2 animate-pulse">
            <FaSpinner className="text-5xl mx-auto animate-spin" />
            <p className="font-semibold text-lg">Generating your certificate...</p>
          </div>
        )}
        {certificateUrl && !isLoading && !error && (
          <img
            src={certificateUrl}
            alt={`${userName}'s Certificate`}
            className="max-w-full h-auto rounded-md shadow-md border"
          />
        )}
      </div>

      {/* --- Action Buttons --- */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        {!certificateUrl && !isLoading ? (
          hasPaid ? (
            <button
              onClick={generateCertificate}
              className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
              disabled={isLoading}
            >
              Generate My Certificate
            </button>
          ) : (
            <button
              onClick={handlePayment}
              className="w-full sm:w-auto px-8 py-3 bg-yellow-500 text-white font-bold rounded-lg shadow-md hover:bg-yellow-600 transition-transform transform hover:scale-105"
            >
              Pay Now
            </button>
          )
        ) : null}

        {certificateUrl && !isLoading && (
          <>
            <button
              onClick={generateCertificate}
              className="w-full sm:w-auto px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
            >
              Regenerate
            </button>
            <a
              href={certificateUrl}
              download={`Certificate-${userName.replace(/\s/g, "_")}.jpg`}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:scale-105"
            >
              <FaDownload />
              Download
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default UserCert;