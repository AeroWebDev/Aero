/**
 * Shared Project data type definition for Aero Studio.
 */
export interface Project {
  id: string;
  nameKey: string;
  categoryKey: string;
  descKey: string;
  tags: string[];
  features: string[];
  techUsed?: string[];
  accentColor: string;
  imageUrl: string;
  link?: string;
  isInteractive?: boolean;
}
