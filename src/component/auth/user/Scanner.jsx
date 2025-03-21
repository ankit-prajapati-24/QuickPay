import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jsQR from "jsqr";

const QRScanner = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [qrCodeData, setQrCodeData] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    console.log("Canvas Ref:", canvasRef.current);
  }, []);

  const startScan = () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError("Your browser does not support camera access.");
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        requestAnimationFrame(scanQRCode);
      })
      .catch((err) => {
        console.error("Error accessing the camera: ", err);
        setError("Unable to access the camera. Please ensure you have granted permissions.");
      });
  };

  const scanQRCode = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!canvas) {
      console.error("Canvas element is not available.");
      return;
    }

    const context = canvas.getContext("2d");

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.height = video.videoHeight;
      canvas.width = video.videoWidth;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });

      if (code) {
        setQrCodeData(code.data);
        processScannedData(code.data);
      }
    }

    requestAnimationFrame(scanQRCode);
  };

  const processScannedData = (data) => {
    const [gmail, eventId] = data.split("&"); // Extract gmail and eventId

    if (gmail && eventId) {
      const userData = { gmail, eventId };

      // Navigate to /user/payment with userData
      navigate("/user/payment", { state: userData });
    } else {
      setError("Invalid QR Code format. Please scan a valid QR code.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">QR Code Scanner</h1>

      <video ref={videoRef} className="w-full max-w-md border-2 border-gray-300 rounded-lg" />
      <canvas ref={canvasRef} className="hidden" />

      <button
        onClick={startScan}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Start Scanning
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
