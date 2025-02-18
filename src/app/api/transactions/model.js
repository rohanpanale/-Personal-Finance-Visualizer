import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: String, required: true },
  category: { type: String, required: true },
});

export default mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);
