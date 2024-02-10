import { Flex, Heading, Text } from "@chakra-ui/react";

export const Header = () => {
    return (
        <Flex direction="column" p={6}>
            <Heading
                alignSelf="center"
                cursor="pointer"
                as="h1"
                size="4xl"
                noOfLines={1}
                mb={6}
            >
                Cuppify
            </Heading>

            <Text alignSelf="center" mb={2} fontSize="sm" align="center">
                Revolutionizing coffee breaks by rewarding users for choosing
                sustainability with each sip.
            </Text>

            <Text alignSelf="center" fontSize="sm" align="center">
                Enjoy your brew guilt-free while earning tokens for using
                eco-friendly cups
            </Text>
        </Flex>
    );
};
