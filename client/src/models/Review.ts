export interface Review {
  id: string;
  author: { name: string };
  rating: number;
  dateVisitted: string;
  comment: string;
  reply?: string;
}
