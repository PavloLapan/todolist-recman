import create from 'zustand';
import { persist } from 'zustand/middleware';
import type {TaskStoreState} from "./useTaskStore.types.ts";

export const useTaskStore = create<TaskStoreState>()(
  persist<TaskStoreState>(
    (set) => ({
      columns: {},
      tasks: {},
      columnOrder: [],
      addColumn: (title) => {
        const id = Date.now().toString(); // can be uuid or nanoId, simplified for use.
        set((state) => ({
          columns: {
            ...state.columns,
            [id]: { id, title, taskIds: [] },
          },
          columnOrder: [...state.columnOrder, id],
        }));
      },
      deleteColumn: (id) => {
        set((state) => {
          const newColumns = { ...state.columns };
          delete newColumns[id];
          const newColumnOrder = state.columnOrder.filter((colId) => colId !== id);
          return { columns: newColumns, columnOrder: newColumnOrder };
        });
      },
      addTask: (columnId, title) => {
        const id = Date.now().toString(); // can be use uuid or nanoid
        set((state) => ({
          tasks: {
            ...state.tasks,
            [id]: { id, title, completed: false },
          },
          columns: {
            ...state.columns,
            [columnId]: {
              ...state.columns[columnId],
              taskIds: [...state.columns[columnId].taskIds, id],
            },
          },
        }));
      },
      deleteTask: (taskId) => {
        set((state) => {
          const newTasks = { ...state.tasks };
          delete newTasks[taskId];
          const newColumns = { ...state.columns };
          for (const column of Object.values(newColumns)) {
            column.taskIds = column.taskIds.filter((id) => id !== taskId);
          }
          return { tasks: newTasks, columns: newColumns };
        });
      },
      moveTask: (taskId, sourceColumnId, destinationColumnId, destinationIndex) => {
        set((state) => {
          const sourceColumn = state.columns[sourceColumnId];
          const destinationColumn = state.columns[destinationColumnId];
          const newSourceTaskIds = sourceColumn.taskIds.filter((id) => id !== taskId);
          const newDestinationTaskIds = [...destinationColumn.taskIds];
          newDestinationTaskIds.splice(destinationIndex, 0, taskId);
          return {
            columns: {
              ...state.columns,
              [sourceColumnId]: { ...sourceColumn, taskIds: newSourceTaskIds },
              [destinationColumnId]: { ...destinationColumn, taskIds: newDestinationTaskIds },
            },
          };
        });
      },
      reorderColumn: (sourceIndex, destinationIndex) => {
        set((state) => {
          const newColumnOrder = [...state.columnOrder];
          const [removed] = newColumnOrder.splice(sourceIndex, 1);
          newColumnOrder.splice(destinationIndex, 0, removed);
          return { columnOrder: newColumnOrder };
        });
      },
      toggleTaskCompletion: (id: string) =>
        set((state: TaskStoreState) => {
          const task = state.tasks[id];
          if (!task) return {};

          return {
            tasks: {
              ...state.tasks,
              [id]: {
                ...task,
                completed: !task.completed,
              },
            },
          };
        }),
      updateTaskTitle: (id: string, newTitle: string) =>
        set((state) => {
          if (state.tasks[id]) {
            return {
              ...state,
              tasks: {
                ...state.tasks,
                [id]: {
                  ...state.tasks[id],
                  title: newTitle,
                },
              },
            };
          }
          return {};
        }),
    }),
    {
      name: 'task-storage',
    }
  )
);
