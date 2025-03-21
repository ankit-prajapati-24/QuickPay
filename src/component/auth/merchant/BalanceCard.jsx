export default function BalanceCard({ balance }) {
    return (
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg shadow-md p-6 text-white">
        <h2 className="text-xl font-semibold mb-4">Balance Overview</h2>
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm opacity-75">Total Balance</p>
            <p className="text-4xl font-bold">${balance}</p>
          </div>
          <button className="bg-white text-emerald-600 px-6 py-2 rounded-lg font-semibold hover:bg-emerald-50 transition-colors">
            Redeem Money
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
            <p className="text-sm opacity-75">Today's Earnings</p>
            <p className="text-2xl font-semibold">${(balance * 0.1).toFixed(2)}</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
            <p className="text-sm opacity-75">Pending Balance</p>
            <p className="text-2xl font-semibold">${(balance * 0.05).toFixed(2)}</p>
          </div>
        </div>
      </div>
    );
  }