export interface IUser {
  _id: string;
  email: string;
  password: string;
}

export interface ITask {
  _id: string;
  title: string;
  description?: string;
  status: "To-Do" | "In Progress" | "Under Review" | "Completed";
  email: string;
}

export interface Credentials {
  email?: string;
  password: string;
}

// app/types/index.ts

export * from './apiErrors';
