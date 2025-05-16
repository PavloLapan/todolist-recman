import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'; // Or any icon

type Props = {
  id: string;
  children: React.ReactNode;
};

export const SortableColumn: React.FC<Props> = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef, // for custom drag handle
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      <div
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
        className="absolute top-4 right-2 cursor-grab p-1"
        title="Drag column"
      >
        <DragIndicatorIcon fontSize="small" />
      </div>

      {children}
    </div>
  );
};
