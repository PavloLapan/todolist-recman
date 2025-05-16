export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export type Column = {
  id: string;
  title: string;
  taskIds: string[];
};

export type TaskStoreState = {
  columns: Record<string, Column>;
  tasks: Record<string, Task>;
  columnOrder: string[];
  addColumn: (title: string) => void;
  deleteColumn: (id: string) => void;
  addTask: (columnId: string, title: string) => void;
  deleteTask: (taskId: string) => void;
  moveTask: (taskId: string, sourceColumnId: string, destinationColumnId: string, destinationIndex: number) => void;
  reorderColumn: (sourceIndex: number, destinationIndex: number) => void;
  toggleTaskCompletion: (taskId: string) => void;
  updateTaskTitle: (taskId: string, title: string) => void;
};