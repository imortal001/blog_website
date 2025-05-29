export interface Blog {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface BlogInput {
  id?: string;
  title: string;
  content: string;
  tags: string[];
  status: 'draft' | 'published';
}