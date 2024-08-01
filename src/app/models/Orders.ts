
import mongoose, { Schema, Document } from 'mongoose';
import { Order, OrderItem } from './definitions';

export interface IOrder extends Document {
  items: OrderItem[];
  email: string;
  name: string;
  deliveryOption: number;
}

const orderItemSchema: Schema = new Schema<OrderItem>({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  quantity: { type: Number, required: true },
  total: { type: Number, required: true }
});

const orderSchema: Schema = new Schema<Order>({
  items: [orderItemSchema],
  name: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },  
  deliveryOption: { type: Number, required: true },
});

const OrderModel = mongoose.models.Order || mongoose.model<Order>('Order', orderSchema);

export default OrderModel;
