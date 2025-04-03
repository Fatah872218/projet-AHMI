import mongoose from "mongoose";

const resetTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  token: { type: String, required: true },
  expiration: { type: Date, required: true },
});

export default mongoose.model("PasswordResetToken", resetTokenSchema);
