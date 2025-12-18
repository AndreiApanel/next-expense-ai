export default function RecordChart() {
  return (
    <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200/50 dark:border-gray-600/50 rounded-2xl shadow-lg shadow-gray-900/5 dark:shadow-black/30 p-6 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white text-lg">📈</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 leading-tight">Expense Chart</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Visual representation of your spending</p>
        </div>
      </div>
      <div className="w-full h-64 flex items-center justify-center bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
        <p className="text-sm text-gray-500 dark:text-gray-400">Chart visualization coming soon...</p>
      </div>
    </div>
  );
}
