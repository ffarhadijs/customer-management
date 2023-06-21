import AddOrEditForm from "@/components/addOrEditForm/AddOrEditForm";
import Customer from "@/models/Customer";
import { UserType } from "@/types/user.type";
import connectDB from "@/utils/connectDB";
import {
  Box,
  Button,
  Flex,
  Group,
  Modal,
  ScrollArea,
  Text,
  createStyles,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  content: {
    backgroundColor: "#202121",
  },
  header: {
    backgroundColor: "#202121",
    color: "white",
  },
}));

export default function Home({ customers }: { customers: UserType[] }) {
  const router = useRouter();
  const { classes } = useStyles();
  const [customer, setCustomer] = useState<UserType>();
  const [customerId, setCustomerId] = useState<string>();
  const [opened, { open, close }] = useDisclosure(false);

  const [openedConfirm, { open: openConfirm, close: closeConfirm }] =
    useDisclosure(false);

  const deleteHandler = (id: string) => {
    setCustomerId(id);
    openConfirm();
  };

  const confirmDeleteHandler = async () => {
    const response = await fetch(`/api/delete-customer/${customerId}`, {
      method: "DELETE",
    });
    if (response.status === 200) {
      closeConfirm();
      notifications.show({
        title: "Delete Customer",
        message: "Customer has been deleted successfully",
        color: "green",
      });
      router.reload();
    } else {
      notifications.show({
        title: "Error",
        message: "Something went wrong, please try again!",
        color: "red",
      });
    }
  };
  const editHandler = (item: UserType) => {
    setCustomer(item);
    open();
  };

  return (
    <Box>
      <Modal
        opened={opened || openedConfirm}
        onClose={opened ? close : closeConfirm}
        title={"Edit Customer"}
        scrollAreaComponent={ScrollArea.Autosize}
        size="md"
        classNames={{ content: classes.content, header: classes.header }}
      >
        {opened ? (
          <AddOrEditForm customer={customer} close={close} />
        ) : (
          <Box>
            <Text c={"white"}>Are You sure to delete this customer?</Text>
            <Group position="right" mb="xs" mt="xl">
              <Button
                onClick={closeConfirm}
                className="bg-blue-500 hover:bg-blue-600 hover:transition-colors hover:duration-500 duration-500"
              >
                Cancel
              </Button>
              <Button
                color="red"
                className="bg-red-500 hover:bg-red-600 hover:transition-colors hover:duration-500 duration-500"
                onClick={confirmDeleteHandler}
              >
                Delete
              </Button>
            </Group>
          </Box>
        )}
      </Modal>
      <Box>
        {customers.map((item: UserType) => (
          <Flex
            direction={"row"}
            align={"center"}
            justify={"space-between"}
            c={"white"}
            my="lg"
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
              <Button
                onClick={() => deleteHandler(item?._id!)}
                className="bg-red-500 hover:bg-red-600 hover:transition-colors hover:duration-500 duration-500"
              >
                Delete
              </Button>
              <Button
                component={Link}
                href={`customer/${item._id}`}
                className="bg-blue-500 hover:bg-blue-600 hover:transition-colors hover:duration-500 duration-500"
              >
                Details
              </Button>
              <Button
                onClick={() => editHandler(item)}
                className="bg-green-500 hover:bg-green-600 hover:transition-colors hover:duration-500 duration-500"
              >
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
