import QRCode from 'react-qr-code';

export default function QRCodeSection({ paymentAddress }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment QR Code</h2>
      <div className="flex flex-col items-center">
        <div className="bg-white p-4 rounded-lg">
          <QRCode value={paymentAddress} size={180} />
        </div>
        <p className="mt-4 text-sm text-gray-600">Scan to make payment</p>
        <p className="text-xs text-gray-500">{paymentAddress}</p>
      </div>
    </div>
  );
}