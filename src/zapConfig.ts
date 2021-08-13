import Networks from '@gnosis.pm/safe-apps-sdk';
import { contractAddresses } from './contractAddresses';


export type TokenItem = {
    id: string;
    label: string;
    decimals: number;
    tokenAddr: string;
    //set which zap function to use
    useZapIn: boolean;
    useZapInToken: boolean;
    useZapOut: boolean;
    decompositionLabel: Array<string>;
};

export const getTokenList = (): Array<TokenItem> => {
    //deleted code for checking network
    const contractAddressesByNetwork = contractAddresses["polygon"];

    return [
        {
            id: 'Matic',
            label: 'MATIC',
            decimals: 18,
            tokenAddr: contractAddressesByNetwork.Matic,
            useZapIn: true,
            useZapInToken: false,
            useZapOut: false,
            decompositionLabel: [],
        },
        {
            id: 'Wmatic',
            label: 'WMATIC',
            decimals: 18,
            tokenAddr: contractAddressesByNetwork.Matic,
            useZapIn: false,
            useZapInToken: true,
            useZapOut: false,
            decompositionLabel: [],
        },
        {
            id: 'PolyBunny',
            label: 'polyBUNNY',
            decimals: 18,
            tokenAddr: contractAddressesByNetwork.PolyBunny,
            useZapIn: false,
            useZapInToken: true,
            useZapOut: false,
            decompositionLabel: [],
        },
        {
            id: 'Eth',
            label: 'ETH',
            decimals: 18,
            tokenAddr: contractAddressesByNetwork.Eth,
            useZapIn: false,
            useZapInToken: true,
            useZapOut: false,
            decompositionLabel: [],
        },
        {
            id: 'Usdt',
            label: 'USDT',
            decimals: 18,
            tokenAddr: contractAddressesByNetwork.Usdt,
            useZapIn: false,
            useZapInToken: true,
            useZapOut: false,
            decompositionLabel: [],
        },
        {
            id: 'Usdc',
            label: 'USDC',
            decimals: 18,
            tokenAddr: contractAddressesByNetwork.Usdc,
            useZapIn: false,
            useZapInToken: true,
            useZapOut: false,
            decompositionLabel: [],
        },
        {
            id: 'Quick',
            label: 'QUICK',
            decimals: 18,
            tokenAddr: contractAddressesByNetwork.Quick,
            useZapIn: false,
            useZapInToken: true,
            useZapOut: false,
            decompositionLabel: [],
        },
        {
            id: 'Aave',
            label: 'AAVE',
            decimals: 18,
            tokenAddr: contractAddressesByNetwork.Aave,
            useZapIn: false,
            useZapInToken: true,
            useZapOut: false,
            decompositionLabel: [],
        },
        {
            id: 'Dai',
            label: 'DAI',
            decimals: 18,
            tokenAddr: contractAddressesByNetwork.Dai,
            useZapIn: false,
            useZapInToken: true,
            useZapOut: false,
            decompositionLabel: [],
        },
        {
            id: 'PolyBunnyEthLp',
            label: 'polyBUNNY-ETH LP',
            decimals: 18,
            tokenAddr: contractAddressesByNetwork.PolyBunnyEthLp,
            useZapIn: false,
            useZapInToken: false,
            useZapOut: true,
            decompositionLabel: ['polyBUNNY','ETH'],
        },
        {
            id: 'PolyBunnyQuickLp',
            label: 'polyBUNNY-QUICK LP',
            decimals: 18,
            tokenAddr: contractAddressesByNetwork.PolyBunnyQuickLp,
            useZapIn: false,
            useZapInToken: false,
            useZapOut: true,
            decompositionLabel: ['polyBUNNY','QUICK'],
        },
        {
            id: 'UsdcEthLp',
            label: 'USDC-ETH LP',
            decimals: 18,
            tokenAddr: contractAddressesByNetwork.UsdcEthLp,
            useZapIn: false,
            useZapInToken: false,
            useZapOut: true,
            decompositionLabel: ['USDC','ETH']
        },
        {
            id: 'WbtcEthLp',
            label: 'WBTC-ETH LP',
            decimals: 18,
            tokenAddr: contractAddressesByNetwork.WbtcEthLp,
            useZapIn: false,
            useZapInToken: false,
            useZapOut: true,
            decompositionLabel: ['WBTC','ETH']
        },
        {
            id: 'EthMaticLp',
            label: 'ETH-MATIC LP',
            decimals: 18,
            tokenAddr: contractAddressesByNetwork.EthMaticLp,
            useZapIn: false,
            useZapInToken: false,
            useZapOut: true,
            decompositionLabel: ['ETH','MATIC']
        },
        {
            id: 'MaticQuickLp',
            label: 'MATIC-QUICK LP',
            decimals: 18,
            tokenAddr: contractAddressesByNetwork.MaticQuickLp,
            useZapIn: false,
            useZapInToken: false,
            useZapOut: true,
            decompositionLabel: ['MATIC','QUICK']
        },
        {
            id: 'EthAaveLp',
            label: 'ETH-AAVE LP',
            decimals: 18,
            tokenAddr: contractAddressesByNetwork.EthAaveLp,
            useZapIn: false,
            useZapInToken: false,
            useZapOut: true,
            decompositionLabel: ['ETH','AAVE']
        },
        {
            id: 'EthUsdtLp',
            label: 'ETH-USDT LP',
            decimals: 18,
            tokenAddr: contractAddressesByNetwork.EthUsdtLp,
            useZapIn: false,
            useZapInToken: false,
            useZapOut: true,
            decompositionLabel: ['ETH','USDT']
        },
        {
            id: 'WbtcUsdcLp',
            label: 'WBTC-USDC LP',
            decimals: 18,
            tokenAddr: contractAddressesByNetwork.WbtcUsdcLp,
            useZapIn: false,
            useZapInToken: false,
            useZapOut: true,
            decompositionLabel: ['WBTC','USDC']
        },
        {
            id: 'MaticUsdcLp',
            label: 'MATIC-USDC LP',
            decimals: 18,
            tokenAddr: contractAddressesByNetwork.MaticUsdcLp,
            useZapIn: false,
            useZapInToken: false,
            useZapOut: true,
            decompositionLabel: ['MATIC','USDC']
        },
        {
            id: 'EthDaiLp',
            label: 'ETH-DAI LP',
            decimals: 18,
            tokenAddr: contractAddressesByNetwork.EthDaiLp,
            useZapIn: false,
            useZapInToken: false,
            useZapOut: true,
            decompositionLabel: ['ETH','DAI']
        },
        {
            id: 'EthQuickLp',
            label: 'ETH-QUICK LP',
            decimals: 18,
            tokenAddr: contractAddressesByNetwork.EthQuickLp,
            useZapIn: false,
            useZapInToken: false,
            useZapOut: true,
            decompositionLabel: ['ETH','QUICK']
        },
        {
            id: 'UsdcQuickLp',
            label: 'USDC-QUICK LP',
            decimals: 18,
            tokenAddr: contractAddressesByNetwork.UsdcQuickLp,
            useZapIn: false,
            useZapInToken: false,
            useZapOut: true,
            decompositionLabel: ['USDC','QUICK']
        },
        {
            id: 'UsdcUsdtLp',
            label: 'USDC-USDT LP',
            decimals: 18,
            tokenAddr: contractAddressesByNetwork.UsdcUsdtLp,
            useZapIn: false,
            useZapInToken: false,
            useZapOut: true,
            decompositionLabel: ['USDC','USDT']
        },
        {
            id: 'DaiUsdcLp',
            label: 'DAI-USDC LP',
            decimals: 18,
            tokenAddr: contractAddressesByNetwork.DaiUsdcLp,
            useZapIn: false,
            useZapInToken: false,
            useZapOut: true,
            decompositionLabel: ['DAI','USDC']
        },
    ];
};