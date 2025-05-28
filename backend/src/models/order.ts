import mongoose, { Schema, Document } from 'mongoose';

interface IOrder extends Document {
  vendorId: mongoose.Types.ObjectId;
  deliveryPartnerId: mongoose.Types.ObjectId;
  status: 'pending' | 'in-progress' | 'completed';
}

const OrderSchema: Schema = new Schema({
  vendorId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  deliveryPartnerId: { type: mongoose.Types.ObjectId, ref: 'User' },
  status: { type: String, required: true, enum: ['pending', 'in-progress', 'completed'], default: 'pending' }
});

const Order = mongoose.model<IOrder>('Order', OrderSchema);

export default Order; 