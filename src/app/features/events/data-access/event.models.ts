export interface ListParams {
  page: number;
  limit: number;
}

export interface ListResult<T> {
  items: T[];
  total: number;
}

export type EventStatus = 'active' | 'inactive';

export interface AppEvent {
  id: string;
  title: string;
  image?: string | null;
  status: EventStatus;
  publishedAt: string;
  startAt: string;
  endAt: string;
  venue: string;
  city: string;
  price: number;
  target?: string;
  category: string;
  organizer: string;
  description?: string;
  publishedFor?: string;
  ticketsAvailable: number;
  readers?: number | null;
}

export type EventCardModel = Pick<
  AppEvent,
  'id' | 'title' | 'image' | 'publishedAt' | 'status'
>;

export type EventRow = Pick<
  AppEvent,
  | 'id'
  | 'title'
  | 'image'
  | 'target'
  | 'readers'
  | 'description'
  | 'publishedFor'
>;
