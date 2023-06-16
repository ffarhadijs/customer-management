import { Box, Center, Container, Group, Text } from "@mantine/core";
import Link from "next/link";
import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <Container size={"lg"}>
      <Group position="apart" my={25}>
        <Text color="white" fz={"xl"} component="h1">
          {" "}
          Customer Management System
        </Text>
        <Link
          href="/add-customer"
          className="bg-green-500 p-3 rounded-lg font-bold hover:bg-green-600 hover:transition-colors hover:duration-500 duration-500"
        >
          Add Customer
        </Link>
      </Group>
      <Box mih={"75vh"}>{children}</Box>
      <Box className="bg-[#414459] p-5 rounded-lg my-4">
        <Center>
          <Text color="white" fz={"sm"}>
            Next.js | Customer Management System &copy;
          </Text>
        </Center>
      </Box>
    </Container>
  );
}

export default Layout;
