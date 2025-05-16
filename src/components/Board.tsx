import {
  DndContext,
  closestCorners,
  DragOverlay,
} from '@dnd-kit/core';
import type {DragEndEvent,
  DragStartEvent} from '@dnd-kit/core'
import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

import { useState } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { Column } from './Column';
import { SortableColumn } from './SortableColumn';

export const Board = () => {
  const {
    columns,
    columnOrder,
    addColumn,
    moveTask,
  } = useTaskStore();
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  const handleAddColumn = () => {
    if (newColumnTitle.trim()) {
      addColumn(newColumnTitle.trim());
      setNewColumnTitle('');
    }
  };

  const onDragStart = (event: DragStartEvent) => {
    if (typeof event.active.id === 'string') {
      setActiveTaskId(event.active.id);
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    let sourceColumnId: string | null = null;
    let destinationColumnId: string | null = null;

    for (const [colId, col] of Object.entries(columns)) {
      if (col.taskIds.includes(activeId)) {
        sourceColumnId = colId;
      }
      if (col.taskIds.includes(overId)) {
        destinationColumnId = colId;
      }
    }

    if (sourceColumnId && destinationColumnId) {
      const destinationIndex = columns[destinationColumnId].taskIds.indexOf(overId);
      moveTask(activeId, sourceColumnId, destinationColumnId, destinationIndex);
    }

    setActiveTaskId(null);
  };

  return (
    <DndContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      collisionDetection={closestCorners}
    >
      <SortableContext items={columnOrder} strategy={horizontalListSortingStrategy}>
        <div className="flex gap-4 p-4 overflow-x-auto">
          {columnOrder.map((columnId) => (
            <SortableColumn key={columnId} id={columnId}>
              <Column columnId={columnId} />
            </SortableColumn>
          ))}

          <div className="min-w-[200px] p-4 border rounded bg-white shadow flex flex-col gap-2">
            <input
              type="text"
              className="border px-2 py-1 rounded"
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              placeholder="New column title"
            />
            <button
              onClick={handleAddColumn}
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            >
              Add Column
            </button>
          </div>
        </div>
      </SortableContext>

      <DragOverlay>
        {activeTaskId && <div className="p-2 bg-white rounded shadow">Dragging...</div>}
      </DragOverlay>
    </DndContext>
  );
};
