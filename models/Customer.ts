import { Schema, model, models } from "mongoose";

const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 2,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  postalCode: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
  },
  products: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
    immutable: false,
  },
});

const Customer = models.Customer || model("Customer", customerSchema);

export default Customer;
