import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavLink } from "./lib/components/nav-link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="has-background-dark	p-5 has-text-white-ter	">
          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <NavLink href='/courses' className="navbar-item">
                Courses
              </NavLink>
              <NavLink href='/courses/add' className="navbar-item">
                Add Course
              </NavLink>
              <NavLink href='/module/add' className="navbar-item">
                Add Module
              </NavLink>
            </div>
          </div>
        </nav>
        <div className="p-5">
          {children}
        </div>
      </body>
    </html>
  );
}
