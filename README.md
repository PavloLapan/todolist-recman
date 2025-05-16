# 📝 Kanban Task Manager - test for RecMan 

A beautiful, responsive **Kanban-style task management** application built with **React**, offering advanced task organization and intuitive drag-and-drop functionality.

---

## 🚀 Features

### ✅ Task Management

- ➕ Add new tasks to any column
- 🗑️ Delete individual tasks
- ✏️ Edit task titles inline
- ✅ Mark tasks as complete/incomplete
- 🔍 Search tasks by name within a column
- 🗃️ Filter tasks by completion status (`All`, `Completed`, `Incomplete`)
- 🔀 Reorder tasks within a column using **drag-and-drop**
- 🔄 Move tasks across columns using **drag-and-drop**

### 📁 Column Management

- ➕ Add new columns
- 🗑️ Delete columns
- 🔀 Reorder columns using **drag-and-drop**

### 🔧 Bulk Actions

- ☑️ Select individual or all tasks in a column
- 🧹 Bulk delete selected tasks
- ✔️ Bulk mark selected tasks as complete
- ❌ Bulk mark selected tasks as incomplete
- 🧭 *Move selected tasks to a different column* (coming soon or optional)

### 🧠 UX/UI Enhancements

- 🎯 "Select All" checkbox per column
- 🎨 Visually distinguish completed vs. incomplete tasks
- 💾 Tasks and columns are persisted in **localStorage** – your board is saved between sessions
- 📱 Responsive design — optimized for desktop and mobile use
- 🧩 Clean and modern UI with **Material UI (MUI)** + **TailwindCSS**

---

## 📦 Tech Stack

- **React**
- **TypeScript**
- **TailwindCSS**
- **MUI (Material UI)**
- **@dnd-kit** (drag-and-drop)
- **Zustand** (state management)
- **localStorage** (data persistence)

---

## 📂 Project Structure

src/
├── components/ # Reusable UI components (Task, Column, ColumnHeader, etc.)
├── hooks/ # Custom hooks (e.g. useColumnLogic)
├── store/ # Zustand state store
├── utils/ # Utility functions
└── App.tsx # Application root