function FilterBar({ filter, onFilterChange, taskCounts }) {
  const filters = [
    { id: 'all', label: 'All', count: taskCounts.all },
    { id: 'active', label: 'Active', count: taskCounts.active },
    { id: 'completed', label: 'Completed', count: taskCounts.completed }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex gap-2">
        {filters.map(({ id, label, count }) => (
          <button
            key={id}
            onClick={() => onFilterChange(id)}
            className={`px-4 py-2 rounded-md transition-colors ${
              filter === id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {label} ({count})
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterBar;