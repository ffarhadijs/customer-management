import Customer from "@/models/Customer";
import connectDB from "@/utils/connectDB";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return;
  }

  try {
    await connectDB();
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      message: "Error in connecting to database",
    });
  }
  try {
    const {
      name,
      lastName,
      address,
      _id,
      email,
      postalCode,
      products,
      updatedAt,
    } = req.body.data;
    const user = await Customer.findOne({ _id });

    user.name = name;
    user.lastName = lastName;
    user.address = address;
    user.email = email;
    user.postalCode = postalCode;
    user.products = products;
    user.updatedAt = updatedAt;
    user.save();

    return res.status(201).json({
      status: "Success",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      sttaus: "Failed",
      message: "Error in deleting data from database",
    });
  }
}
