"use client";
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider"
import { useTheme } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  avalanche, avalancheFuji
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

const config = getDefaultConfig({
  appName: 'TriviaDex',
  projectId: 'YOUR_PROJECT_ID',
  chains: [avalanche, avalancheFuji],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { setTheme } = useTheme();
  setTheme("dark");

  const queryClient = new QueryClient();

  return (
          <html lang="en" suppressHydrationWarning>
            <head />
            <body>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <WagmiProvider config={config}>
                  <QueryClientProvider client={queryClient}>
                    <RainbowKitProvider theme={darkTheme({
                      accentColor: '#0d0e12',
                      accentColorForeground: '#70f7c9',
                      borderRadius: 'large',
                      
                    })}>
                      {children}
                    </RainbowKitProvider>
                  </QueryClientProvider>
                </WagmiProvider>    
              </ThemeProvider>
            </body>
          </html>
        );
}