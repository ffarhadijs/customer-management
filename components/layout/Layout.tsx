import Link from "next/link";
import { ReactNode } from "react";

function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <header className="header">
        <h2> Customer Management System</h2>
        <Link href="/add-customer">Add Customer</Link>
      </header>
      <div className="main">{children}</div>
      <footer className="footer">
        <a href="https://botostart.ir" target="_blank" rel="noreferrer">
          Botostart
        </a>{" "}
        Next.js course | CRM Project &copy;
      </footer>
    </>
  );
}

export default Layout;
