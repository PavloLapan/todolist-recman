import React, { useState, useRef, useEffect } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {IconButton, TextField} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIcon from '@mui/icons-material/DragIndicatorSharp';

type Props = {
  task: {
    id: string;
    title: string;
    completed: boolean;
  };
};

export const Task: React.FC<Props> = ({ task }) => {
  const { toggleTaskCompletion, deleteTask, updateTaskTitle } = useTaskStore();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    const trimmed = editTitle.trim();
    if (trimmed && trimmed !== task.title) {
      updateTaskTitle(task.id, trimmed);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditTitle(task.title);
      setIsEditing(false);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-2  min-w-67 rounded shadow flex items-center justify-between bg-white ${
        task.completed ? 'bg-green-100' : ''
      }`}
    >
      <div className="flex items-center gap-2 flex-grow min-w-0 cursor-pointer">
        {isEditing ? (
          <TextField
            inputRef={inputRef}
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            size="small"
            variant="standard"
            fullWidth
            inputProps={{maxLength: 100}}
          />
        ) : (
          <span
            className={`cursor-pointer truncate flex-grow ${
              task.completed ? 'line-through text-gray-500' : ''
            }`}
            onDoubleClick={() => setIsEditing(true)}
            onClick={() => toggleTaskCompletion(task.id)}
            title={task.title}
          >
        {task.title}
      </span>
        )}
      </div>

      <div className="flex-shrink-0 flex gap-1">
        <IconButton
          size="small"
          onClick={() => setIsEditing(true)}
          aria-label="Edit task"
        >
          <EditIcon fontSize="small"/>
        </IconButton>
        <IconButton
          size="small"
          onClick={() => {
            console.log(task.id, 'wtf');
            deleteTask(task.id);
          }}
          aria-label="Delete task"
        >
          <DeleteIcon fontSize="small"/>
        </IconButton>

        <div
          {...attributes}
          {...listeners}
          className="cursor-grab pr-2"
          title="Drag task"
        >
          <DragIcon fontSize="small"/>
        </div>
      </div>
    </div>

  );
};
