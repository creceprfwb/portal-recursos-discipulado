export type ResourceType =
  | 'pdf'
  | 'video'
  | 'audio'
  | 'link'
  | 'study'
  | 'devotional'
  | 'course'
  | 'document';

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  type: ResourceType;
  imageUrl?: string;
  fileUrl?: string;
  externalUrl?: string;
  author?: string;
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: string;
  displayOrder: number;
}

export interface AdminCredentials {
  email: string;
  password: string;
}
