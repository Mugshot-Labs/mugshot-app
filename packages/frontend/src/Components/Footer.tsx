import { Flex, Link, Text } from "@chakra-ui/react";

export const Footer = () => {
    return (
        <Flex p={6}>
            <Text alignSelf="center" fontSize="xx-small" align="center">
                Cuppify is a decentralized application (dApp) that rewards users
                for choosing sustainability with each sip. Enjoy your brew
                guilt-free while earning tokens for using eco-friendly cups.
                <Link href="www.google.com" about="_blank" color="blue" px={1}>
                    Learn more.
                </Link>
            </Text>
        </Flex>
    );
};
