import Customer from "@/models/Customer";
import { UserType } from "@/types/user.type";
import connectDB from "@/utils/connectDB";
import { Box, Button, Flex, Text } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home({ customers }: { customers: UserType[] }) {


  const detailsHandler = () =>{

  }
  return (
    <Box>
      <Box>
        {customers.map((item: UserType) => (
          <Flex
            direction={"row"}
            align={"center"}
            justify={"space-between"}
            c={"white"}
            className="bg-[#414459] rounded-lg p-4"
          >
            <Box>
              <Text component="span">Full Name: {item.name}</Text>{" "}
              <Text component="span">{item.lastName}</Text>
              <Text component="span" ml={30}>
                Email: {item.email}
              </Text>
            </Box>
            <Flex gap={20}>
              <Button className="bg-red-500 hover:bg-red-600 hover:transition-colors hover:duration-500 duration-500">
                Delete
              </Button>
              <Button component={Link} href={`customer/${item._id}`} onClick={detailsHandler} className="bg-blue-500 hover:bg-blue-600 hover:transition-colors hover:duration-500 duration-500">
                Details
              </Button>
              <Button className="bg-green-500 hover:bg-green-600 hover:transition-colors hover:duration-500 duration-500">
                Edit
              </Button>
            </Flex>
          </Flex>
        ))}
      </Box>
    </Box>
  );
}

export async function getServerSideProps() {
  try {
    await connectDB();
    const customers = await Customer.find();
    return {
      props: {
        customers: JSON.parse(JSON.stringify(customers)),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
