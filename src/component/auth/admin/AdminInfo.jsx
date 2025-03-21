import { IdentificationIcon, CalendarIcon } from '@heroicons/react/24/outline';

export default function AdminInfo({ adminData }) {
  return (
    <div className="bg-gradient-to-r from-[#7e22ce] to-[#4f46e5]  rounded-lg shadow-md p-6 text-white">
      <h2 className="text-xl font-semibold mb-4">Admin Information</h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <IdentificationIcon className="h-5 w-5 mr-2" />
          <div>
            <p className="text-sm opacity-75">Admin ID</p>
            <p className="font-semibold">{adminData.id}</p>
          </div>
        </div>
        <div className="flex items-center">
          <IdentificationIcon className="h-5 w-5 mr-2" />
          <div>
            <p className="text-sm opacity-75">Admin Name</p>
            <p className="font-semibold">{adminData.name}</p>
          </div>
        </div>
        <div className="flex items-center">
          <CalendarIcon className="h-5 w-5 mr-2" />
          <div>
            <p className="text-sm opacity-75">Current Event</p>
            <p className="font-semibold">{adminData.eventName}</p>
            <p className="text-sm opacity-75">Event ID: {adminData.eventId}</p>
          </div>
        </div>
      </div>
    </div>
  );
}