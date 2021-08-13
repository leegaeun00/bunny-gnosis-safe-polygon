import Networks from '@gnosis.pm/safe-apps-sdk';
import { contractAddresses } from './contractAddresses';

export type PoolItem = {
    id: string;
    label: string;
    tokenLabel: string;
    //when twoTokenProfit is true, polyBUNNY must go second in profitLabel
    profitLabel: Array<string>;
    twoTokenProfit: boolean;
    decimals: number;
    tokenAddr: string;
    poolAddr: string;
    dashboardAddr: string;
};

export const getPoolList = (): Array<PoolItem> => {
    //deleted code for checking network
    const contractAddressesByNetwork = contractAddresses["polygon"];
    
    return [
        {
            id: 'PolyBunnyPool',
            label: 'polyBUNNY Pool',
            tokenLabel: 'polyBUNNY',
            profitLabel: ['polyBUNNY'],
            twoTokenProfit: false,
            decimals: 18,
            tokenAddr: contractAddressesByNetwork.PolyBunny,
            poolAddr: contractAddressesByNetwork.PolyBunnyPool,
            dashboardAddr: '',
        },
        {
            id: 'PolyBunnyEthLpPool',
            label: 'polyBUNNY-ETH LP Pool',
            tokenLabel: 'polyBUNNY-ETH',
            profitLabel: ['polyBUNNY'],
            twoTokenProfit: false,
            decimals: 18,
            tokenAddr: contractAddressesByNetwork.PolyBunnyEthLp,
            poolAddr: contractAddressesByNetwork.PolyBunnyEthLpPool,
            dashboardAddr: '',
        },
        {
            id: 'PolyBunnyQuickLpPool',
            label: 'polyBUNNY-QUICK LP Pool',
            tokenLabel: 'polyBUNNY-QUICK',
            profitLabel: ['polyBUNNY'],
            twoTokenProfit: false,
            decimals: 18,
            tokenAddr: contractAddressesByNetwork.PolyBunnyQuickLp,
            poolAddr: contractAddressesByNetwork.PolyBunnyQuickLpPool,
            dashboardAddr: '',
        },
        {
            id: 'UsdcEthLpPool',
            label: 'USDC-ETH LP Pool',
            tokenLabel: 'USDC-ETH LP',
            profitLabel: ['USDC-ETH LP','polyBUNNY'],
            twoTokenProfit: true,
            decimals: 18,
            tokenAddr: contractAddressesByNetwork.UsdcEthLp,
            poolAddr: contractAddressesByNetwork.UsdcEthLpPool,
            dashboardAddr: contractAddressesByNetwork.DashboardPolygon,
        },
        {
            id: 'WbtcEthLpPool',
            label: 'wBTC-ETH LP Pool',
            tokenLabel: 'wBTC-ETH LP',
            profitLabel: ['wBTC-ETH LP','polyBUNNY'],
            twoTokenProfit: true,
            decimals: 18,
            tokenAddr: contractAddressesByNetwork.WbtcEthLp,
            poolAddr: contractAddressesByNetwork.WbtcEthLpPool,
            dashboardAddr: contractAddressesByNetwork.DashboardPolygon,
        },
        {
            id: 'EthMaticLpPool',
            label: 'ETH-MATIC LP Pool',
            tokenLabel: 'ETH-MATIC LP',
            profitLabel: ['ETH-MATIC LP','polyBUNNY'],
            twoTokenProfit: true,
            decimals: 18,
            tokenAddr: contractAddressesByNetwork.EthMaticLp,
            poolAddr: contractAddressesByNetwork.EthMaticLpPool,
            dashboardAddr: contractAddressesByNetwork.DashboardPolygon,
        },
        {
            id: 'MaticQuickLpPool',
            label: 'MATIC-QUICK LP Pool',
            tokenLabel: 'MATIC-QUICK LP',
            profitLabel: ['MATIC-QUICK LP','polyBUNNY'],
            twoTokenProfit: true,
            decimals: 18,
            tokenAddr: contractAddressesByNetwork.MaticQuickLp,
            poolAddr: contractAddressesByNetwork.MaticQuickLpPool,
            dashboardAddr: contractAddressesByNetwork.DashboardPolygon,
        },
        {
            id: 'EthAaveLpPool',
            label: 'ETH-AAVE LP Pool',
            tokenLabel: 'ETH-AAVE LP',
            profitLabel: ['ETH-AAVE LP','polyBUNNY'],
            twoTokenProfit: true,
            decimals: 18,
            tokenAddr: contractAddressesByNetwork.EthAaveLp,
            poolAddr: contractAddressesByNetwork.EthAaveLpPool,
            dashboardAddr: contractAddressesByNetwork.DashboardPolygon,
        },
        {
            id: 'EthUsdtLpPool',
            label: 'ETH-USDT LP Pool',
            tokenLabel: 'ETH-USDT LP',
            profitLabel: ['ETH-USDT LP','polyBUNNY'],
            twoTokenProfit: true,
            decimals: 18,
            tokenAddr: contractAddressesByNetwork.EthUsdtLp,
            poolAddr: contractAddressesByNetwork.EthUsdtLpPool,
            dashboardAddr: contractAddressesByNetwork.DashboardPolygon,
        },
        {
            id: 'WbtcUsdcLpPool',
            label: 'wBTC-USDC LP Pool',
            tokenLabel: 'wBTC-USDC LP',
            profitLabel: ['wBTC-USDC LP','polyBUNNY'],
            twoTokenProfit: true,
            decimals: 18,
            tokenAddr: contractAddressesByNetwork.WbtcUsdcLp,
            poolAddr: contractAddressesByNetwork.WbtcUsdcLpPool,
            dashboardAddr: contractAddressesByNetwork.DashboardPolygon,
        },
        {
            id: 'MaticUsdcLpPool',
            label: 'MATIC-USDC LP Pool',
            tokenLabel: 'MATIC-USDC LP',
            profitLabel: ['MATIC-USDC LP','polyBUNNY'],
            twoTokenProfit: true,
            decimals: 18,
            tokenAddr: contractAddressesByNetwork.MaticUsdcLp,
            poolAddr: contractAddressesByNetwork.MaticUsdcLpPool,
            dashboardAddr: contractAddressesByNetwork.DashboardPolygon,
        },
        {
            id: 'EthDaiLpPool',
            label: 'ETH-DAI LP Pool',
            tokenLabel: 'ETH-DAI LP',
            profitLabel: ['ETH-DAI LP','polyBUNNY'],
            twoTokenProfit: true,
            decimals: 18,
            tokenAddr: contractAddressesByNetwork.EthDaiLp,
            poolAddr: contractAddressesByNetwork.EthDaiLpPool,
            dashboardAddr: contractAddressesByNetwork.DashboardPolygon,
        },
        {
            id: 'EthQuickLpPool',
            label: 'ETH-QUICK LP Pool',
            tokenLabel: 'ETH-QUICK LP',
            profitLabel: ['ETH-QUICK LP','polyBUNNY'],
            twoTokenProfit: true,
            decimals: 18,
            tokenAddr: contractAddressesByNetwork.EthQuickLp,
            poolAddr: contractAddressesByNetwork.EthQuickLpPool,
            dashboardAddr: contractAddressesByNetwork.DashboardPolygon,
        },
        {
            id: 'UsdcQuickLpPool',
            label: 'USDC-QUICK LP Pool',
            tokenLabel: 'USDC-QUICK LP',
            profitLabel: ['USDC-QUICK LP','polyBUNNY'],
            twoTokenProfit: true,
            decimals: 18,
            tokenAddr: contractAddressesByNetwork.UsdcQuickLp,
            poolAddr: contractAddressesByNetwork.UsdcQuickLpPool,
            dashboardAddr: contractAddressesByNetwork.DashboardPolygon,
        },
        {
            id: 'UsdcUsdtLpPool',
            label: 'USDC-USDT LP Pool',
            tokenLabel: 'USDC-USDT LP',
            profitLabel: ['USDC-USDT LP','polyBUNNY'],
            twoTokenProfit: true,
            decimals: 18,
            tokenAddr: contractAddressesByNetwork.UsdcUsdtLp,
            poolAddr: contractAddressesByNetwork.UsdcUsdtLpPool,
            dashboardAddr: contractAddressesByNetwork.DashboardPolygon,
        },
        {
            id: 'DaiUsdcLpPool',
            label: 'DAI-USDC LP Pool',
            tokenLabel: 'DAI-USDC LP',
            profitLabel: ['DAI-USDC LP','polyBUNNY'],
            twoTokenProfit: true,
            decimals: 18,
            tokenAddr: contractAddressesByNetwork.DaiUsdcLp,
            poolAddr: contractAddressesByNetwork.DaiUsdcLpPool,
            dashboardAddr: contractAddressesByNetwork.DashboardPolygon,
        },
    ];
};