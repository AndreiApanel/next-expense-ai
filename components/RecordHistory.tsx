export default function RecordHistory() {
  return (
    <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200/50 dark:border-gray-600/50 rounded-2xl shadow-lg shadow-gray-900/5 dark:shadow-black/30 p-6 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white text-lg">📋</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 leading-tight">Transaction History</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Your recent expense records</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="p-4 rounded-xl bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-100/50 dark:hover:bg-gray-800/70 transition-all duration-200">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            No transactions yet. Add your first expense to get started!
          </p>
        </div>
      </div>
    </div>
  );
}
