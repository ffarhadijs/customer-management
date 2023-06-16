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
  address: {
    type: String,
    required: false,
  },
  postalCode: {
    type: Number,
    required: false,
  },
  products: {
    type: Array,
    default: [],
    required:false
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
