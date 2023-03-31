import { useState } from "react";
import { ethers, BigNumber } from "ethers";
import bigotFamNFT from './BigotFamNFT.json';
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";


const bigotFamNFTAddress = "0x7C537A2591bCAFfB372010105118e09e4EB96b89";

const MainMint = ({ accounts, setAccounts }) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const singer = provider.getSigner();
            const contract = new ethers.Contract(
                bigotFamNFTAddress,
                bigotFamNFT.abi,
                singer
            );
            try {
                const response = await contract.mint(BigNumber.from(mintAmount),{
                    value: ethers.utils.parseEther((0.044 * mintAmount).toString()),
                });
                console.log('response: ', response);
            } catch (err) {
                console.log('error:', err)
            }
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    }

    const handleIncrement = () => {
        if (mintAmount >= 5) return;
        setMintAmount(mintAmount + 1);
    }

    return (
        <Flex justify='center' align='center' height='100vh' paddingBottom='150px'>
            <Box width='520px'>
                <div>
                    <Text fontSize='48px' textShadow="0 5px #000000">Bigot Fam</Text>
                    <Text fontSize='30px' letterSpacing='-5.5%'>Welcome Bigot Fams. Lets create a new world!</Text>
                    {isConnected ? (
                        <div>
                            <Flex align='center' justify='center'>
                            <Button
                                backgroundColor='white'
                                borderRadius='5px'
                                boxShadow='0px 2px 2px 1px #D64424'
                                color='#D64424'
                                cursor={"pointer"}
                                fontFamily={"inherit"}
                                padding='15px'
                                marginTop='10px'
                                fontWeight='bold'
                                onClick={handleDecrement}
                            >
                                -
                            </Button>
                            <Input
                                readOnly
                                fontFamily={"inherit"}
                                width='100px'
                                height='40px'
                                textAlign='center'
                                marginTop='10px'
                                paddingLeft='18px'
                                type="number"
                                value={mintAmount}
                            />
                            <Button
                                backgroundColor='white'
                                borderRadius='5px'
                                boxShadow='0px 2px 2px 1px #D64424'
                                color='#D64424'
                                cursor={"pointer"}
                                fontFamily={"inherit"}
                                padding='15px'
                                marginTop='10px'
                                fontWeight='bold'
                                onClick={handleIncrement}
                            >
                                +
                            </Button>
                        </Flex>
                        <Button
                            backgroundColor='#FA8072'
                            borderRadius='5px'
                            boxShadow='0px 2px 2px 1px #FA8072'
                            color='white'
                            cursor={"pointer"}
                            fontFamily={"inherit"}
                            padding='15px'
                            marginTop='10px'
                            fontWeight='bold'
                            onClick={handleMint}
                        >
                            Mint Now
                        </Button>
                    </div>
                    ) : (
                        <p>You must be connected to mint</p>
                    ) }
                </div>
            </Box>
        </Flex>
    )
}

export default MainMint;
