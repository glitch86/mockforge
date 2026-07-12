export type Endpoint<T = unknown> = {
  _id: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  title: string;
  projectID: string;
  path: string;
  description: string;
  responseBody: T;
  email: string;
  ownerId: string;
  createdAt: string;
};