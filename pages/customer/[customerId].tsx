import { Box, Center, Flex, Grid, Loader, Text } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import { UserType } from "@/types/user.type";

type User = {
  data: UserType;
};
const CustomerDetails = () => {
  const { query, isReady } = useRouter();
  const [customer, setCustomer] = useState<User | null>();

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
  return (
    <Box>
      {customer?.data._id ? (
        <Grid className="bg-[#414459] p-5 my-5 rounded-lg text-white">
          <Grid.Col xs={12} sm={6}>
            <Text fw={600}>
              Name:{"  "}
              <Text fw={400} component="span">
                {customer?.data.name}
              </Text>{" "}
            </Text>
          </Grid.Col>
          <Grid.Col xs={12} sm={6}>
            <Text fw={600}>
              Last Name:{"  "}
              <Text fw={400} component="span">
                {customer?.data.lastName}
              </Text>{" "}
            </Text>
          </Grid.Col>{" "}
          <Grid.Col xs={12} sm={6}>
            <Text fw={600}>
              Email:{"  "}
              <Text fw={400} component="span">
                {customer?.data.email}
              </Text>{" "}
            </Text>
          </Grid.Col>{" "}
          <Grid.Col xs={12} sm={6}>
            <Text fw={600}>
              Address:{"  "}
              <Text fw={400} component="span">
                {customer?.data.address}
              </Text>{" "}
            </Text>
          </Grid.Col>{" "}
          <Grid.Col xs={12} sm={6}>
            <Text fw={600}>
              Postal Code:{"  "}{" "}
              <Text fw={400} component="span">
                {" "}
                {customer?.data.postalCode}{" "}
              </Text>
            </Text>
          </Grid.Col>{" "}
          <Grid.Col span={12}>
            <Text fw={600}>
              Products:{" "}
              {customer?.data.products?.map((item) => (
                <Grid
                  my="md"
                  ml={"80px"}
                  className="bg-[#5e627e] rounded-lg p-2"
                >
                  <Grid.Col xs={6} sm={4}>
                    <Text>
                      Product Name:{" "}
                      <Text component="span" fw={400}>
                        {" "}
                        {item.productName}{" "}
                      </Text>{" "}
                    </Text>
                  </Grid.Col>
                  <Grid.Col xs={3} sm={4}>
                    <Text>
                      {" "}
                      Price: ${" "}
                      <Text component="span" fw={400}>
                        {" "}
                        {item.price}
                      </Text>
                    </Text>
                  </Grid.Col>
                  <Grid.Col xs={3} sm={4}>
                    <Text>
                      Quantity:{" "}
                      <Text component="span" fw={400}>
                        {" "}
                        {item.quantity}
                      </Text>{" "}
                    </Text>
                  </Grid.Col>
                </Grid>
              ))}
            </Text>{" "}
          </Grid.Col>
        </Grid>
      ) : (
        <Center>
          <Loader />
        </Center>
      )}
    </Box>
  );
};

export default CustomerDetails;
