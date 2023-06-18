import Customer from "@/models/Customer";
import connectDB from "@/utils/connectDB";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return;
  }
  try {
    await connectDB();
  } catch (error) {
    return res
      .status(500)
      .json({ status: "Failed", message: "Error in connecting to database" });
  }
  try {
    const id = req.query.customerId;
    const customer = await Customer.findOne({ _id: id });
    return res.status(200).json({ status: "Success", data: customer });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Failed",
      message: "Error in retrieving data from database",
    });
  }
}
