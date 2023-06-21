import Customer from "@/models/Customer";
import connectDB from "@/utils/connectDB";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
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
    const id = req.query.customerId;

    await Customer.deleteOne({ _id: id });

    return res.status(200).json({
      status: "Success",
      message: "Customer deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      sttaus: "Failed",
      message: "Error in deleting data from database",
    });
  }
}
