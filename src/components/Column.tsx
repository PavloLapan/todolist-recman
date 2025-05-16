import React from 'react';
import { useColumnLogic } from '../hooks/useColumnLogic';
import { ColumnHeader } from './ColumnHeader';
import { Task } from './Task';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

type Props = {
  columnId: string;
};

export const Column: React.FC<Props> = ({ columnId }) => {
  const {
    column,
    filteredTasks,
    search,
    setSearch,
    completionFilter,
    setCompletionFilter,
    newTaskTitle,
    setNewTaskTitle,
    handleAddTask,
    onKeyDown,
    selectedTaskIds,
    handleSelect,
    handleSelectAll,
    handleBulkDelete,
    handleBulkToggle,
  } = useColumnLogic(columnId);

  return (
    <div className="bg-gray-100 p-4 rounded w-64 flex-shrink-0 border border-gray-300 w-85 mb-3">
      <ColumnHeader columnId={columnId} title={column.title} />

      <input
        type="text"
        placeholder="Search tasks"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-1 mb-2 rounded border border-gray-300 w-full"
      />

      <div className="flex gap-2 mb-2">
        {(['all', 'completed', 'incomplete'] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setCompletionFilter(filter)}
            className={`px-2 py-1 rounded text-sm ${
              completionFilter === filter
                ? 'bg-blue-600 text-white'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            }`}
          >
            {filter === 'all' ? 'All' : filter === 'completed' ? 'Completed' : 'Incomplete'}
          </button>
        ))}
      </div>

      <input
        type="text"
        className="flex-grow p-1 rounded border border-gray-300 w-full"
        placeholder="New task title"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <button
        onClick={handleAddTask}
        className="bg-blue-500 text-white px-3 rounded hover:bg-blue-600 mt-1 w-full"
      >
        Add Task
      </button>

      {filteredTasks.length > 1 && (
        <div className="flex items-center mt-2 mb-1">
          <Checkbox
            checked={selectedTaskIds.length === filteredTasks.length}
            indeterminate={selectedTaskIds.length > 0 && selectedTaskIds.length < filteredTasks.length}
            onChange={handleSelectAll}
          />
          <span className="text-sm">Select all</span>
        </div>
      )}

      {selectedTaskIds.length > 0 && (
        <div className="flex flex-col gap-1 mb-2">
          <Button variant="contained" size="small" color="primary" onClick={() => handleBulkToggle(true)}>
            Mark Complete
          </Button>
          <Button variant="contained" size="small" color="secondary" onClick={() => handleBulkToggle(false)}>
            Mark Incomplete
          </Button>
          <Button variant="outlined" size="small" color="error" onClick={handleBulkDelete}>
            Delete Selected
          </Button>
        </div>
      )}

      <SortableContext items={column.taskIds} strategy={verticalListSortingStrategy}>
        <div className="mt-2 space-y-2">
          {filteredTasks.map((task) => (
            <div key={task.id} className="flex items-center">
              <Checkbox
                size="small"
                checked={selectedTaskIds.includes(task.id)}
                onChange={() => handleSelect(task.id)}
              />
              <Task task={task} />
            </div>
          ))}
        </div>
      </SortableContext>
    </div>
  );
};
