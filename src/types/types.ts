export type Subscription = {
  id: number;
  customerId: number;
  plan: string;
  startDate: Date;
  endDate: Date;
  status: string;
  price: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}
