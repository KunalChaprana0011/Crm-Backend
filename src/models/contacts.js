import mongoose, { Schema } from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    company: String,
    jobTitle: String,
  },
  { timestamps: true }
);

export const Contact = mongoose.model("Contact", ContactSchema);
