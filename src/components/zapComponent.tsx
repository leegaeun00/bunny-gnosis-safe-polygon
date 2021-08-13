import React, {useEffect, useState} from "react";
import Web3 from 'web3';
import {AbiItem} from 'web3-utils';
import {Big} from "big.js";
import {BigNumberInput} from "big-number-input";
import {Button, Loader, Select, Text, TextField, Title} from "@gnosis.pm/safe-react-components";
import {useSafeAppsSDK} from "@gnosis.pm/safe-apps-react-sdk";

import {getTokenList, TokenItem} from "../zapConfig";
import {MaticAbi} from "../abis/MaticAbi";
import {PolyBunnyAbi as tokenAbi} from "../abis/PolyBunnyAbi";
import {ZapPolygonAbi as zapAbi} from "../abis/ZapPolygonAbi";
import {BottomSmallMargin, BottomLargeMargin, TopSmallMargin, ButtonContainer, Info, SelectContainer} from "./styleComponents";

export const ZapComponent: React.FC = () => {

    const zapAddr = '0x663462430834E220851a3E981D0E1199501b84F6'

    const [web3, setWeb3] = useState<Web3 | undefined>();
    const {sdk: appsSdk, safe: safeInfo, connected} = useSafeAppsSDK();

    const [tokenList, setTokenList] = useState<Array<TokenItem>>();
    const [selectedFromToken, setSelectedFromToken] = useState<any>();
    const [selectedToToken, setSelectedToToken] = useState<any>();

    const [fromTokenInstance, setFromTokenInstance] = useState<any>();
    const [toTokenInstance, setToTokenInstance] = useState<any>();
    const [zapInstance, setZapInstance] = useState<any>();

    const [maticBalance, setMaticBalance] = useState('0');
    const [fromTokenBalance, setFromTokenBalance] = useState<string>('0');
    const [isTokenApproved, setIsTokenApproved] = useState<boolean>();

    const [tokenInputValue, setTokenInputValue] = useState<string>('');
    const [tokenInputError, setTokenInputError] = useState<string | undefined>();

    // set web3 instance
    useEffect(() => {
        if (!safeInfo) {
            return;
        }
        const web3Instance = new Web3(`https://rpc-mainnet.matic.network`);

        console.log('zap web3Instance', web3Instance)

        setWeb3(web3Instance);
    }, [safeInfo]);

    // get Matic balance
    useEffect(() => {
        if (!safeInfo || !web3){
            return;
        }
        const getMaticBalance = async () => {
            try {
                if (safeInfo.safeAddress) {
                    const balance = await web3?.eth.getBalance(safeInfo.safeAddress);
                    if (balance) {
                        setMaticBalance(balance);
                    }
                }
            } catch (err) {
            }
        }
        getMaticBalance();
        console.log("maticBalance: ", maticBalance);
    }, [web3, safeInfo.safeAddress]);

    // load tokens list and initialize with Matic and Bunny
    useEffect(() => {
        if (!safeInfo) {
            return;
        }

        const tokenListRes = getTokenList();
        setTokenList(tokenListRes);

        var findSelectedFromToken = tokenListRes.find((t) => t.id === 'Matic');
        if (localStorage.getItem('selectedFromToken')) {
            findSelectedFromToken = tokenListRes.find((t) => t.id === localStorage.getItem('selectedFromToken'));
        }
        setSelectedFromToken(findSelectedFromToken);

        var findSelectedToToken = tokenListRes.find((t) => t.id === 'PolyBunny');
        if (localStorage.getItem('selectedToToken')) {
            findSelectedToToken = tokenListRes.find((t) => t.id === localStorage.getItem('selectedToToken'));
        }
        setSelectedToToken(findSelectedToToken);

    }, [safeInfo]);

    // make token and zap instances
    useEffect(() => {
        const setNewZap = async() => {
            if (!selectedFromToken || !selectedToToken || !web3) {
                return;
            }

            if (selectedFromToken.id === 'Matic' || selectedFromToken.id==='Wmatic') {
                await setFromTokenInstance(new web3.eth.Contract(MaticAbi as AbiItem[], selectedFromToken.tokenAddr));
            } else {
                await setFromTokenInstance(new web3.eth.Contract(tokenAbi as AbiItem[], selectedFromToken.tokenAddr));
            }

            // toToken instance is actually unnecessary, unless toToken is Wmatic
            if (selectedToToken.id === 'Matic' || selectedFromToken.id==='Wmatic') {
                await setToTokenInstance(new web3.eth.Contract(MaticAbi as AbiItem[], selectedToToken.tokenAddr));
            }
            else {
                await setToTokenInstance(new web3.eth.Contract(tokenAbi as AbiItem[], selectedToToken.tokenAddr));
            }
            
            setZapInstance(new web3.eth.Contract(zapAbi as AbiItem[], zapAddr))

            console.log(selectedFromToken);
            console.log('from, toToken, zap instance: ', fromTokenInstance, toTokenInstance, zapInstance);
        }
        setNewZap();
    }, [selectedFromToken, web3]);

    // get selectedFromToken balance
    useEffect(() => {
        const getData = async () => {
            if (!safeInfo.safeAddress || !selectedFromToken || !fromTokenInstance || !selectedToToken || !toTokenInstance) {
                return;
            }

            // wait until fromToken is correctly updated
            if (selectedFromToken.tokenAddr.toLocaleLowerCase() !== fromTokenInstance?._address.toLocaleLowerCase()) {
                // console.log(selectedFromToken.tokenAddr.toLocaleLowerCase(), fromTokenInstance?._address.toLocaleLowerCase())
                return;
            }

            console.log(selectedFromToken.tokenAddr.toLocaleLowerCase(), fromTokenInstance?._address.toLocaleLowerCase())

            // get selectedFromToken Balance
            let fromTokenBalance;
            if (selectedFromToken.id === 'Matic') {
                fromTokenBalance = maticBalance;
            } else {
                fromTokenBalance = await fromTokenInstance.methods.balanceOf(safeInfo.safeAddress).call();
            }
            
            let fromTokenAllowance = await fromTokenInstance.methods.allowance(safeInfo.safeAddress,zapAddr).call();

            console.log("fromTokenAllowance", fromTokenAllowance);

            let isTokenApproved;
            if (fromTokenAllowance >0){
                isTokenApproved=true
            } else {
                isTokenApproved=false
            }

            setFromTokenBalance(fromTokenBalance);
            setIsTokenApproved(isTokenApproved);
        };

        getData();
    }, [safeInfo, selectedFromToken, fromTokenInstance, maticBalance]);

    const bNumberToHumanFormat = (value: string) => {
        if (!selectedFromToken) {
            return '';
        }
        return new Big(value).div(10 ** selectedFromToken.decimals).toFixed(4);
    };

    // approve fromToken
    const tokenApprove = async () => {
        if (!selectedFromToken || !web3) {
            return;
        }

        //maximum unint256 as allowance
        const allowance = web3.utils.toBN("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");

        const txs = [
            {
                to: selectedFromToken.tokenAddr,
                value: '0',
                data: fromTokenInstance.methods.approve(zapAddr, allowance).encodeABI(),
            },
        ];

        const params = {
            safeTxGas: 30000,
        };

        appsSdk.txs.send({txs, params});

    }

    //zap
    const zap = () => {
        if (!selectedFromToken || !selectedToToken || !web3) {
            return;
        }
        
        const zapParameter = web3.utils.toBN(tokenInputValue.toString());
        console.log('tokenInputValue: ', tokenInputValue)
        console.log('zapParameter: ',zapParameter)
        console.log('maticBalance: ',maticBalance)
        console.log('fromTokenBalance: ',fromTokenBalance)

        let txs;
        if (selectedFromToken.id==='Matic' && selectedToToken.id==='Wmatic'){
            txs = [
                {
                    to: selectedToToken.tokenAddr,
                    value: zapParameter.toString(),
                    data: toTokenInstance.methods.deposit().encodeABI(),
                },
            ];
        } else if (selectedFromToken.id==='Wmatic' && selectedToToken.id==='Matic'){
            txs = [
                {
                    to: selectedFromToken.tokenAddr,
                    value: '0',
                    data: fromTokenInstance.methods.withdraw(zapParameter).encodeABI(),
                },
            ];
        } else if (selectedFromToken.useZapInToken) {
            txs = [
                {
                    to: zapAddr,
                    value: '0',
                    data: zapInstance.methods.zapInToken(selectedFromToken.tokenAddr,zapParameter,selectedToToken.tokenAddr).encodeABI(),
                },
            ];
        } else if (selectedFromToken.useZapOut) {
            txs = [
                {
                    to: zapAddr,
                    value: '0',
                    data: zapInstance.methods.zapOut(selectedFromToken.tokenAddr,zapParameter).encodeABI(),
                },
            ];
            // when fromToken uses ZapIn function (when fromToken is Matic)
        } else {
            txs = [
                {
                    to: zapAddr,
                    value: zapParameter.toString(),
                    data: zapInstance.methods.zapIn(selectedToToken.tokenAddr).encodeABI(),
                },
            ];
        }

        const params = {
            safeTxGas: 1000000,
        };

        appsSdk.txs.send({txs, params});

        setTokenInputValue('');
    };

    //zap all
    const zapAll = () => {
        if (!selectedFromToken || !selectedToToken || !web3) {
            return;
        }
        
        const zapParameter = web3.utils.toBN(fromTokenBalance.toString());

        console.log('fromTokenBalance: ',fromTokenBalance)
        console.log('zapParameter: ',zapParameter)
        console.log('maticBalance: ',maticBalance)

        let txs;
        if (selectedFromToken.id==='Matic' && selectedToToken.id==='Wmatic'){
            txs = [
                {
                    to: selectedToToken.tokenAddr,
                    value: maticBalance.toString(),
                    data: toTokenInstance.methods.deposit().encodeABI(),
                },
            ];
        } else if (selectedFromToken.id==='Wmatic' && selectedToToken.id==='Matic'){
            txs = [
                {
                    to: selectedFromToken.tokenAddr,
                    value: '0',
                    data: fromTokenInstance.methods.withdraw(zapParameter).encodeABI(),
                },
            ];
        } else if (selectedFromToken.useZapInToken) {
            txs = [
                {
                    to: zapAddr,
                    value: '0',
                    data: zapInstance.methods.zapInToken(selectedFromToken.tokenAddr,zapParameter,selectedToToken.tokenAddr).encodeABI(),
                },
            ];
        } else if (selectedFromToken.useZapOut) {
            txs = [
                {
                    to: zapAddr,
                    value: '0',
                    data: zapInstance.methods.zapOut(selectedFromToken.tokenAddr,zapParameter).encodeABI(),
                },
            ];
            // when fromToken uses ZapIn function (when fromToken is Matic)
        } else {
            txs = [
                {
                    to: zapAddr,
                    value: maticBalance.toString(),
                    data: zapInstance.methods.zapIn(selectedToToken.tokenAddr).encodeABI(),
                },
            ];
        }

        const params = {
            safeTxGas: 1000000,
        };

        appsSdk.txs.send({txs, params});

        setTokenInputValue('');
    };


    const isZapDisabled = () => {
        if (!!tokenInputError || !tokenInputValue || !isTokenApproved || !selectedFromToken || !selectedToToken) {
            return true;
        }

        const bigInput = new Big(tokenInputValue);

        if (!selectedFromToken.useZapOut) {
            return (bigInput.eq('0') || bigInput.gt(fromTokenBalance)) || (selectedFromToken.id === selectedToToken.id);
            // when fromToken uses ZapOut function (when fromToken is Pancakeswap LP)
        } else {
            return (bigInput.eq('0') || bigInput.gt(fromTokenBalance))
        }

    };

    const isZapMaxDisabled = () => {
        if (!!tokenInputError || !isTokenApproved || !selectedFromToken || !selectedToToken) {
            return true;
        }

        if (!selectedFromToken.useZapOut) {
            return fromTokenBalance === '0' || (selectedFromToken.id === selectedToToken.id);
            // when fromToken uses ZapOut function (when fromToken is Pancakeswap LP)
        } else {
            return fromTokenBalance === '0'
        }

    };

    const onSelectFromToken = async (id: string) => {
        if (!tokenList) {
            return;
        }
        const selectedFromToken = await tokenList.find((t) => t.id === id);
        if (!selectedFromToken) {
            return;
        }
        await setSelectedFromToken(selectedFromToken);
        await localStorage.setItem('selectedFromToken', selectedFromToken.id);
    };

    const onSelectToToken = async (id: string) => {
        if (!tokenList) {
            return;
        }
        const selectedToToken = await tokenList.find((t) => t.id === id);
        if (!selectedToToken) {
            return;
        }
        await setSelectedToToken(selectedToToken);
        await localStorage.setItem('selectedToToken', selectedToToken.id);
    };

    const onTokenInputChange = (value: string) => {
        setTokenInputError(undefined);
        setTokenInputValue(value);
    };

    if (!selectedFromToken || !selectedToToken || !connected) {
        return <Loader size="md"/>;
    }

    return (
        <BottomLargeMargin>
            <Title size={'xs'}>
                Zap
                <div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
            </Title>
            <ButtonContainer>
                <SelectContainer>
                    From: &nbsp;&nbsp; <Select items={tokenList || []} activeItemId={selectedFromToken.id} onItemClick={onSelectFromToken}/>
                </SelectContainer>
                {/*//if fromToken is not Pancake Swap LP token*/}
                {!selectedFromToken.useZapOut ?
                    <SelectContainer>
                        To: &nbsp;&nbsp; <Select items={tokenList || []} activeItemId={selectedToToken.id} onItemClick={onSelectToToken}/>
                    </SelectContainer>
                    :
                    <SelectContainer>
                        To: &nbsp;{selectedFromToken.decompositionLabel[0]} and {selectedFromToken.decompositionLabel[1]}
                    </SelectContainer>
                }
            </ButtonContainer>

            <BottomSmallMargin>
                <Info>
                    <div>
                        <Text size="lg"> Available to Zap </Text>
                        <Text size="lg"> {bNumberToHumanFormat(fromTokenBalance)} {selectedFromToken.label} </Text>
                    </div>
                </Info>
            </BottomSmallMargin>


            {!isTokenApproved ?
                <TopSmallMargin>
                    <ButtonContainer>
                        <Button size="lg" color="primary" variant="contained" onClick={tokenApprove}> Approve PancakeBunny <br/> to Zap your &nbsp;{selectedFromToken.label} </Button>
                    </ButtonContainer>
                </TopSmallMargin>
                :
                <div>
                    <ButtonContainer>
                        <BigNumberInput
                            decimals={selectedFromToken.decimals}
                            onChange={onTokenInputChange}
                            value={tokenInputValue}
                            renderInput={(props: any) => <TextField label="Amount" {...props} />}
                        />
                        <div>&nbsp;&nbsp;&nbsp;</div>
                        <Button size='md' style={{height: '55px'}} color="primary" variant="contained"
                                onClick={() => {setTokenInputValue(fromTokenBalance)}} disabled={isZapMaxDisabled()}>
                            Max
                        </Button>
                    </ButtonContainer>
                    <ButtonContainer>
                        <Button size="lg" color="primary" variant="contained" onClick={zap}
                                disabled={isZapDisabled()}>
                            Zap
                        </Button>
                    </ButtonContainer>
                </div>
            }
        </BottomLargeMargin>
    );
}