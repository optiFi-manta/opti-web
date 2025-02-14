"use client";

import '@rainbow-me/rainbowkit/styles.css';

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { WagmiProvider } from 'wagmi';
import { useWagmiConfig } from "@/lib/wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { mantaSepoliaTestnet } from "viem/chains";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

const queryClient = new QueryClient();

export default function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  const wagmiConfig = useWagmiConfig();

  return (
    <HeroUIProvider navigate={router.push}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider modalSize="compact" initialChain={mantaSepoliaTestnet}>
            <NextThemesProvider {...themeProps}>
              {children}
            </NextThemesProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </HeroUIProvider>
  );
}
