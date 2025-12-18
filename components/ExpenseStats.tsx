export default function ExpenseStats() {
  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-700/50 hover:shadow-2xl">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white text-sm sm:text-lg">📊</span>
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 leading-tight">Expense Statistics</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Your financial overview</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-100/50 dark:border-blue-800/50">
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">Total Expenses</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">$0.00</p>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50/50 to-green-50/50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-100/50 dark:border-emerald-800/50">
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">This Month</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">$0.00</p>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-100/50 dark:border-purple-800/50">
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">Average Daily</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">$0.00</p>
        </div>
      </div>
    </div>
  );
}
