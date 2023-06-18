import { Box } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import { UserType } from "@/types/user.type";
const CustomerDetails = () => {
  const { query, isReady } = useRouter();
  const [customer, setCustomer] = useState<UserType | null>();

  const fetchData = async () => {
    const response = await fetch(`/api/customer/${query.customerId}`);
    const data = await response.json();
    setCustomer(data);
  };

  useEffect(() => {
    if (isReady) {
      fetchData();
    }
  }, [isReady]);
  console.log(customer, "customer");
  return <Box></Box>;
};

export default CustomerDetails;
