import React from 'react';
import {SocialIcon} from "react-social-icons";
import {Box, Button, Flex, Input, Spacer} from "@chakra-ui/react";

const NavBar = ({ accounts, setAccounts }) => {
    const isConnected = Boolean(accounts[0]);

    async function connectAccount() {
        if(window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccounts(accounts);
        }
    }
    return(
        <Flex justify="space-between" align="center" padding="30px">
            {/* Left Side - Social Media Icons */}
            <Flex justify="space-around" width="40%" padding="0 75px">
                <SocialIcon url="https://twitter.com/bigot_fam" target="_blank" style={{ boxSize: '42px', margin: '0 15px' }}/>
                <SocialIcon url="https://opensea.io/bigot_fam" target="_blank" style={{ boxSize: '42px', margin: '0 15px' }}/>
            </Flex>

            {isConnected ? (
                <Box margin="0 15px">Connected</Box>
            ) : (
                <Button
                    backgroundColor="white"
                    borderRadius="5px"
                    boxShadow="0px 2px 2px 1px #0F0F0F"
                    color="#371414"
                    cursor="pointer"
                    fontFamily="inherit"
                    padding="15px"
                    margin="0 15px"
                    onClick={connectAccount}
                >Connect</Button>
            )
            }
        </Flex>
    )
};

export default NavBar;
