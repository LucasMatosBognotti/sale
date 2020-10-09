import mongoose from 'mongoose';

const SaleSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  done: {
    type: Boolean,
    required: true,
    default: false
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

export default mongoose.model('Sala', SaleSchema);
