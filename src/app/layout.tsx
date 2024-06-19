"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Link from "next/link";
import { usePathname } from 'next/navigation'
import Logout from "./logout/page";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname()

  return (
    <html lang="en">
      <body className={inter.className}>
        <Box sx={{ flexGrow: 1 }}>
        {pathName !== "/login" && <AppBar sx={{marginBottom: 5}} position="static">
            <Toolbar>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Link href={"/records"}>
                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                  Records
                </Button>
              </Link>
              <Link href={"/operations"}>
                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                  New Operation              
                </Button>
              </Link>
            </Box>
              <Box sx={{justifySelf: "flex-end"}}>
                <Logout />
              </Box>
            </Toolbar>
          </AppBar>}
          {children}
        </Box>
      </body>
    </html>
  );
}
