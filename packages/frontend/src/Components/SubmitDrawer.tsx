import {
    Flex,
    Image,
    Text,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Spacer,
    Button,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { FileType } from "../Models";

export const SubmitDrawer = ({
    isOpen,
    onClose,
    file,
    setFile,
}: {
    isOpen: boolean;
    onClose: () => void;
    file: FileType | null;
    setFile: React.Dispatch<React.SetStateAction<FileType | null>>;
}) => {
    // const toast = useToast();
    // const { base2Blob } = useBase64Image();

    const onCloseSheet = useCallback(() => {
        setFile(null);
        onClose();
    }, [onClose, setFile]);

    const onSubmit = useCallback(() => {
        console.log("submitting file", file);
    }, [file]);

    return (
        <Drawer isOpen={isOpen} placement="bottom" onClose={onCloseSheet}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Let the AI do the rest...</DrawerHeader>

                <DrawerBody>
                    <Flex
                        justify="center"
                        alignItems="center"
                        direction="column"
                    >
                        <Flex
                            justify="center"
                            alignItems="flex-start"
                            direction="row"
                        >
                            {!!file?.file && (
                                <Image
                                    src={URL.createObjectURL(file.file)}
                                    w={120}
                                    h={180}
                                    objectFit="cover"
                                    borderRadius={12}
                                    overflow="clip"
                                />
                            )}

                            <Flex
                                justify="center"
                                alignItems="flex-start"
                                direction="column"
                            >
                                <Text
                                    alignSelf="center"
                                    mb={2}
                                    fontSize="sm"
                                    align="center"
                                >
                                    Data we share with the AI
                                </Text>

                                <Text mb={2} fontSize="x-small">
                                    Foto was taken at: {file?.file.lastModified}
                                </Text>

                                <Text mb={2} fontSize="x-small" noOfLines={1}>
                                    Foto name : {file?.file.name}
                                </Text>

                                <Text mb={2} fontSize="x-small">
                                    GPS(Lattitude): {file?.gps.latitude}
                                </Text>

                                <Text mb={2} fontSize="x-small">
                                    GPS(Longitude): {file?.gps.longitude}
                                </Text>

                                <Text mb={2} fontSize="x-small">
                                    GPS(Accuracy): {file?.gps.accuracy}
                                </Text>
                            </Flex>
                        </Flex>

                        <Flex h={300} mt={22} bg="tomato">
                            <Text mb={2} fontSize="lg">
                                Comms with the server and info space?
                            </Text>
                        </Flex>

                        <Spacer />

                        <Button
                            mb={8}
                            bgGradient={
                                "linear(to-br, primary.400, secondary.600, tertiary.100)"
                            }
                            p={6}
                            w={282}
                            borderRadius={8}
                            onClick={onSubmit}
                        >
                            Submit
                        </Button>
                    </Flex>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};
