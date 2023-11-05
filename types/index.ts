export type ID = string;

interface Column {
  id: ID;
  title: string;
  taskIds: Task[];
}

export interface Task {
  id: ID;
  title: string;
  createdAt: Date;
}
