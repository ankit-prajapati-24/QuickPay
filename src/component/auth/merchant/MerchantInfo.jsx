import { IdentificationIcon, CalendarIcon } from '@heroicons/react/24/outline';

export default function MerchantInfo({ merchantData }) {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-md p-6 text-white">
      <h2 className="text-xl font-semibold mb-4">Merchant Information</h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <IdentificationIcon className="h-5 w-5 mr-2" />
          <div>
            <p className="text-sm opacity-75">Merchant ID</p>
            <p className="font-semibold">{merchantData.merchantId}</p>
          </div>
        </div>
        <div className="flex items-center">
          <IdentificationIcon className="h-5 w-5 mr-2" />
          <div>
            <p className="text-sm opacity-75">Merchant Name</p>
            <p className="font-semibold">{merchantData.name}</p>
          </div>
        </div>
        <div className="flex items-center">
          <CalendarIcon className="h-5 w-5 mr-2" />
          <div>
            <p className="text-sm opacity-75">Current Event</p>
            <p className="font-semibold">{merchantData.eventName}</p>
            <p className="text-sm opacity-75">Event ID: {merchantData.eventId}</p>
          </div>
        </div>
      </div>
    </div>
  );
}