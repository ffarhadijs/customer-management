import {
  Box,
  Button,
  Flex,
  Group,
  NumberInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, hasLength, isEmail } from "@mantine/form";
import { createStyles } from "@mantine/core";
import { UserType } from "@/types/user.type";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  label: {
    color: "white",
    paddingBottom: "10px",
  },
  input: {
    backgroundColor: "#414459",
    color: "white",
    borderColor: "#414459",
  },
}));

const AddOrEditForm = ({
  customer,
  close,
}: {
  customer?: UserType;
  close?: () => void;
}) => {
  const dateObject = new Date();
  const date = dateObject.toUTCString();
  const router = useRouter();
  const editable = !!customer?._id;
  const { classes } = useStyles();
  const form = useForm<UserType>({
    initialValues: {
      name: customer?.name || "",
      lastName: customer?.lastName || "",
      email: customer?.email || "",
      address: customer?.address || "",
      postalCode: customer?.postalCode || 0,
      products: customer?.products || [],
      _id: customer?._id || null,
      createdAt: customer?.createdAt || null,
      updatedAt: date || null,
    },
    validate: {
      name: hasLength({ min: 2 }, "Name must have 2 or more characters"),
      lastName: hasLength(
        { min: 2 },
        "Last name must have 2 or more characters"
      ),
      email: isEmail("You should input your email address in correct format"),
    },
  });

  const cancelHandler = () => {
    editable ? close!() : form.reset();
  };

  const submitHandler = async (data: UserType) => {
    if (editable) {
      const response = await fetch("/api/edit-customer", {
        method: "PATCH",
        body: JSON.stringify({ data }),
        headers: { "Content-Type": "application/json" },
      });
      response.status === 201
        ? (notifications.show({
            title: "Edit Customer",
            message: "Customer has been edited successfully",
            color: "green",
          }),
          router.reload())
        : notifications.show({
            title: "Error",
            message: "Somthing went wrong, please try again!",
            color: "red",
          });
    } else {
      const response = await fetch("/api/add-customer", {
        method: "POST",
        body: JSON.stringify({ data }),
        headers: { "Content-Type": "application/json" },
      });
      response.status === 201
        ? (notifications.show({
            title: "Add Customer",
            message: "Customer has been added successfully",
            color: "green",
          }),
          form.reset())
        : notifications.show({
            title: "Error",
            message: "Somthing went wrong, please try again!",
            color: "red",
          });
    }
  };

  const addItemHandler = () => {
    form.insertListItem("products", {
      productName: "",
      price: "",
      quantity: 0,
    });
  };

  const removeItemHandler = () => {
    form.removeListItem("products", form.values.products.length - 1);
  };

  return (
    <Box
      className={`${(editable && "w-full px-2") || "w-1/2 mx-auto"} `}
      component="form"
      onSubmit={form.onSubmit(submitHandler)}
    >
      <TextInput
        {...form.getInputProps("name")}
        label="Name:"
        withAsterisk
        placeholder="First Name"
        my="sm"
        classNames={{
          label: classes.label,
          input: classes.input,
        }}
      />
      <TextInput
        {...form.getInputProps("lastName")}
        label="Last Name:"
        withAsterisk
        placeholder="Last Name"
        my="sm"
        classNames={{
          label: classes.label,
          input: classes.input,
        }}
      />
      <TextInput
        {...form.getInputProps("email")}
        label="Email:"
        withAsterisk
        placeholder="Email"
        my="sm"
        classNames={{
          label: classes.label,
          input: classes.input,
        }}
      />
      <TextInput
        {...form.getInputProps("address")}
        label="Address:"
        placeholder="Address"
        my="sm"
        classNames={{
          label: classes.label,
          input: classes.input,
        }}
      />
      <NumberInput
        {...form.getInputProps("postalCode")}
        label="Postal Code:"
        placeholder="Postal Code"
        my="sm"
        hideControls
        classNames={{
          label: classes.label,
          input: classes.input,
        }}
      />
      <Box>
        <Text color="white" fz="lg" mb="md" mt="35px">
          Purchased Products
        </Text>
        {form.values.products?.map((item: any, index: number) => (
          <Box className="border border-[#414459] rounded-lg my-4 p-4">
            <TextInput
              {...form.getInputProps(`products.${index}.productName`)}
              label="Product Name"
              placeholder="Product Name"
              my="xs"
              classNames={{
                label: classes.label,
                input: classes.input,
              }}
            />
            <Flex justify={"space-between"} align={"start"} gap={"md"}>
              <NumberInput
                {...form.getInputProps(`products.${index}.price`)}
                label="Price"
                placeholder="Price"
                my="xs"
                w="50%"
                classNames={{
                  label: classes.label,
                  input: classes.input,
                }}
                hideControls
              />
              <NumberInput
                {...form.getInputProps(`products.${index}.quantity`)}
                label="Quantity"
                placeholder="Quantity"
                my="xs"
                classNames={{
                  label: classes.label,
                  input: classes.input,
                }}
                w="50%"
                hideControls
              />
            </Flex>
          </Box>
        ))}
        <Flex justify={"space-between"} align={"start"} gap={"lg"}>
          <Button
            onClick={removeItemHandler}
            w="50%"
            className="bg-red-500 hover:bg-red-600 hover:transition-colors hover:duration-500 duration-500"
          >
            Remove Item
          </Button>
          <Button
            onClick={addItemHandler}
            w="50%"
            className="bg-blue-500 hover:bg-blue-600 hover:transition-colors hover:duration-500 duration-500"
          >
            Add Item
          </Button>
        </Flex>
      </Box>
      <Group position="right" my={30}>
        <Button
          onClick={cancelHandler}
          className="bg-red-500 hover:bg-red-600 hover:transition-colors hover:duration-500 duration-500"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-green-500 hover:bg-green-600 hover:transition-colors hover:duration-500 duration-500"
        >
          Save
        </Button>
      </Group>
    </Box>
  );
};

export default AddOrEditForm;
