import Customer from "@/models/Customer";
import connectDB from "@/utils/connectDB";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return;
  }
  try {
    await connectDB();
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      messgae: "Error in connecting to DB",
    });
  }

  const formData = req.body.data;

  if (!formData.name || !formData.email || !formData.lastName) {
    return res.status(400).json({
      status: "Failed",
      message: "Invalid data!",
    });
  }
  try {
    const customer = await Customer.create();
    return res.status(201).json({
      status: "Success",
      message: "Customer created successfully",
      data: customer,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      message: "Error in storing customer data in DB",
    });
  }
}
