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
import React from "react";
import { createStyles } from "@mantine/core";
import { UserType } from "@/types/user.type";

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
const AddCustomer = () => {
  const { classes } = useStyles();
  const form = useForm<UserType>({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      address: "",
      postalCode: 0,
      products: [],
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
    console.log("canceled");
  };

  const submitHandler = async (data: UserType) => {
    console.log(data, "datta");
    const response = await fetch("/api/add-customer", {
      method: "POST",
      body: JSON.stringify({ data }),
      headers: { "Content-Type": "application/json" },
    });
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
    <Box>
      <Box
        className="w-1/2 mx-auto"
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
    </Box>
  );
};

export default AddCustomer;
