import { CreditCardIcon, QrCodeIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export default function UserBalanceCard({ balance }) {
    const navigate = useNavigate();

    const handleDirectPayment = () => {
        navigate(`/user/payment`);
    };

    const handleScanQR = () => {
        navigate('/user/scan');
    };

    return (
        <div className="bg-gradient-to-r from-[#6c5ce7] to-indigo-600 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden transform  transition-transform duration-300">
            {/* Subtle Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#6c5ce7] to-indigo-600 opacity-50 animate-pulse"></div>

            {/* Content */}
            <div className="relative z-10">
                <h2 className="text-xl font-semibold mb-4">Your Balance</h2>

                <div className="flex items-center justify-between mb-6">
                    <div>
                        <p className="text-sm opacity-80">Available Balance</p>
                        <p className="text-4xl font-extrabold tracking-wide">${balance}</p>
                    </div>

                    <div className="flex gap-4 justify-center mt-4">
                        {/* Pay Now Button */}
                        <button
                            onClick={handleDirectPayment}
                            className="flex items-center gap-2 bg-white text-[#6c5ce7] px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-blue-100 hover:scale-105 transition-all duration-300"
                        >
                            <CreditCardIcon className="h-6 w-6 text-[#6c5ce7]" />
                            Pay Now
                        </button>

                        {/* Scan QR Button */}
                        <button
                            onClick={handleScanQR}
                            className="flex items-center gap-2 bg-white text-[#6c5ce7] px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-blue-100 hover:scale-105 transition-all duration-300"
                        >
                            <QrCodeIcon className="h-6 w-6 text-[#6c5ce7]" />
                            Scan QR
                        </button>
                    </div>
                </div>
            </div>

            {/* Decorative Bottom Bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white opacity-20 rounded-full"></div>
        </div>
    );
}