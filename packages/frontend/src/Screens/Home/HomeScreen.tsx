import { Body, Footer, Header, NavigationBar } from "../../Components";
import { Flex, Spacer } from "@chakra-ui/react";

export const HomeScreen = () => {
    return (
        <Flex direction="column" h="100vh">
            <NavigationBar />
            <Header />
            <Body />
            <Spacer />
            <Footer />
        </Flex>
    );
};
