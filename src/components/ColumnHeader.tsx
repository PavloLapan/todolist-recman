import React, { useState } from 'react';
import { IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TaskEditor } from './TaskEditor';
import { useTaskStore } from '../store/useTaskStore';

type ColumnHeaderProps = {
  columnId: string;
  title: string;
};

export const ColumnHeader: React.FC<ColumnHeaderProps> = ({ columnId, title }) => {
  const deleteColumn = useTaskStore((state) => state.deleteColumn);
  const [isEditing, setIsEditing] = useState(false);
  const [columnTitle, setColumnTitle] = useState(title);

  const handleTitleSave = (newTitle: string) => {
    setColumnTitle(newTitle || columnTitle); // Prevent empty title
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between mb-2">
      {isEditing ? (
        <TaskEditor
          initialValue={columnTitle}
          onSave={handleTitleSave}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <Typography variant="h6">{columnTitle}</Typography>
          <div className='mr-3' >
            <IconButton size="small" onClick={() => setIsEditing(true)}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={() => deleteColumn(columnId)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        </>
      )}
    </div>
  );
};
