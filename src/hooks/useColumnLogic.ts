import { useState, useMemo, KeyboardEvent } from 'react';
import { useTaskStore } from '../store/useTaskStore';

type CompletionFilter = 'all' | 'completed' | 'incomplete';

export const useColumnLogic = (columnId: string) => {
  const {
    columns,
    tasks,
    addTask,
    deleteTask,
    toggleTaskCompletion,
  } = useTaskStore();

  const column = columns[columnId];
  const columnTasks = column.taskIds.map((taskId) => tasks[taskId]);

  const [completionFilter, setCompletionFilter] = useState<CompletionFilter>('all');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  const filteredTasks = useMemo(() => {
    return columnTasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());

      if (completionFilter === 'completed') return matchesSearch && task.completed;
      if (completionFilter === 'incomplete') return matchesSearch && !task.completed;
      return matchesSearch;
    });
  }, [search, columnTasks, completionFilter]);

  const handleAddTask = () => {
    const trimmed = newTaskTitle.trim();
    if (trimmed) {
      addTask(columnId, trimmed);
      setNewTaskTitle('');
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const handleSelect = (taskId: string) => {
    setSelectedTaskIds((prev) =>
      prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
    );
  };

  const handleSelectAll = () => {
    if (selectedTaskIds.length === filteredTasks.length) {
      setSelectedTaskIds([]);
    } else {
      setSelectedTaskIds(filteredTasks.map((task) => task.id));
    }
  };

  const handleBulkDelete = () => {
    selectedTaskIds.forEach((id) => deleteTask(id));
    setSelectedTaskIds([]);
  };

  const handleBulkToggle = (complete: boolean) => {
    selectedTaskIds.forEach((id) => {
      const task = tasks[id];
      if (task && task.completed !== complete) {
        toggleTaskCompletion(id);
      }
    });
  };

  return {
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
  };
};
