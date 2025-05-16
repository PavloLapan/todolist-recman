// components/TaskEditor.tsx
import React, { useState, useEffect, useRef } from 'react';
import { TextField } from '@mui/material';

type TaskEditorProps = {
  initialValue: string;
  onSave: (newTitle: string) => void;
  onCancel: () => void;
};

export const TaskEditor: React.FC<TaskEditorProps> = ({
                                                        initialValue,
                                                        onSave,
                                                        onCancel,
                                                      }) => {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSave(value.trim());
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <TextField
      inputRef={inputRef}
      fullWidth
      size="small"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => onSave(value.trim())}
      onKeyDown={handleKeyDown}
    />
  );
};
