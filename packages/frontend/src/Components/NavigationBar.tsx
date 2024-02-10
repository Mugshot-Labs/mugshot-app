import {
    Flex,
    HStack,
    Heading,
    IconButton,
    Image,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";
import { useWalletModal } from "@vechain/dapp-kit-react";
import { useEffect, useState } from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import { GoLink } from "react-icons/go";

export const NavigationBar = () => {
    const [connected, setConnected] = useState(false);
    console.log({ connected });

    const { onConnectionStatusChange, open: openWalletModal } =
        useWalletModal();

    useEffect(() => {
        onConnectionStatusChange((address) => {
            setConnected(!!address);
        });
    }, [onConnectionStatusChange]);

    const logoSrc = useColorModeValue(
        "/logo/cleanify_light.png",
        "/logo/cleanify_dark.png"
    );

    const { toggleColorMode } = useColorMode();

    return (
        <Flex
            justify="space-between"
            position="static"
            top={0}
            right={0}
            w="100vw"
            boxShadow="md"
            px={[3, 8]}
            py={[3, 2]}
        >
            <HStack spacing={0}>
                <Image
                    src={logoSrc}
                    alt="Cleanify logo"
                    boxSize={10}
                    w="full"
                    objectFit="cover"
                />
                <Heading size="md" flex={2} cursor="pointer">
                    Cuppify
                </Heading>
            </HStack>
            <HStack gap={2}>
                <IconButton
                    aria-label="Mode Change"
                    variant="empty"
                    colorScheme="black"
                    size="lg"
                    icon={useColorModeValue(<BsMoon />, <BsSun />)}
                    onClick={toggleColorMode}
                />
                <IconButton
                    aria-label="Connect wallet"
                    icon={<GoLink />}
                    onClick={openWalletModal}
                />
            </HStack>
        </Flex>
    );
};
