export interface EventCardModel {
  id?: string;
  title: string;
  image?: string | null;
  publishedAt: string;
  status: 'active' | 'inactive';
}
