import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mantaSepoliaTestnet } from 'viem/chains';

export const config = getDefaultConfig({
    appName: 'OPTI Finance',
    projectId: '04251f8180896efb96c57a0984864657',
    chains: [
      mantaSepoliaTestnet
    ],
});