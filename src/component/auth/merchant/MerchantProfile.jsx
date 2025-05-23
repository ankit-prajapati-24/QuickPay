import { 
    UserCircleIcon, 
    PhoneIcon, 
    EnvelopeIcon, 
    CalendarIcon, 
    MapPinIcon, 
    BuildingStorefrontIcon 
  } from '@heroicons/react/24/outline';
  
  // Dummy data for fallback
  const dummyMerchantData = {
    name: "John Doe",
    id: "12345",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    joinDate: "2023-01-01",
    businessType: "Retail Store",
    location: "New York, USA",
    eventId: "EVT67890",
    eventName: "Tech Conference 2023",
  };
  
  export default function Profile({ merchantData }) {
    // Use dummy data if merchantData is not provided
    const data = merchantData || dummyMerchantData;
  
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16 sm:mt-24">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          
          {/* Header Section */}
          <div className="bg-[#6c5ce7] px-6 py-10 flex flex-col sm:flex-row items-center">
            <img
              src={`https://ui-avatars.com/api/?name=${data?.name || "N/A"}&size=128&background=6c5ce7&color=fff`}
              alt={data?.name || "N/A"}
              className="h-28 w-28 rounded-full border-4 border-white shadow-lg"
            />
            <div className="sm:ml-6 text-center sm:text-left text-white mt-4 sm:mt-0">
              <h1 className="text-3xl font-bold">{data?.name || "N/A"}</h1>
              <p className="text-gray-200">Merchant ID: {data?.merchantId || "N/A"}</p>
            </div>
          </div>
  
          {/* Content Section */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Personal Information */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800">Personal Information</h2>
                <div className="space-y-3">
                  <InfoRow Icon={EnvelopeIcon} text={data?.gmail || "N/A"} />
                  <InfoRow Icon={PhoneIcon} text={data?.mobile || "N/A"} />
                  <InfoRow Icon={CalendarIcon} text={`Joined on ${new Date(data?.joinDate || Date.now()).toLocaleDateString() || "N/A"}`} />
                </div>
              </div>
  
              {/* Business Information */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800">Business Information</h2>
                <div className="space-y-3">
                  <InfoRow Icon={BuildingStorefrontIcon} text={data?.businessType || "Merchant"} />
                  <InfoRow Icon={MapPinIcon} text={data?.location || "Madhya Pradesh"} />
                </div>
              </div>
            </div>
  
            {/* Current Event Section */}
            <div className="mt-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Current Event</h2>
              <div className="bg-[#6c5ce7]/10 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300 border border-[#6c5ce7]">
                <p className="text-gray-600">Event ID: {data?.eventId || "N/A"}</p>
                <p className="text-xl font-semibold text-[#6c5ce7] mt-2">{data?.eventName || "Udaan 2k35"}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
  
  // Reusable Component for Displaying Info
  const InfoRow = ({ Icon, text }) => (
    <div className="flex items-center text-gray-700 hover:text-[#6c5ce7] transition duration-300">
      <Icon className="h-6 w-6 mr-3 text-[#6c5ce7]" />
      <span>{text}</span>
    </div>
  );
  