// app/types/apiErrors.ts

export type FetchError = {
  message?: string;
  errors?: Record<string, string[]>;
};

export type CreateTaskError = {
  message?: string;
  errors?: Record<string, string[]>;
};

export type UpdateTaskError = {
  message?: string;
  errors?: Record<string, string[]>;
};

export type DeleteTaskError = {
  message?: string;
  errors?: Record<string, string[]>;
};

export type CommonErrorProperties = {
  message?: string;
};

export type BaseError<T extends CommonErrorProperties> = T &
  CommonErrorProperties;

export interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

export type ApiError =
  | FetchError
  | CreateTaskError
  | UpdateTaskError
  | DeleteTaskError;
