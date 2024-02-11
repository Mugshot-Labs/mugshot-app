import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useCallback } from "react";
import Sheet from "react-modal-sheet";
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
    // URL.createObjectURL(file.file)

    // TODO - Add theme and colorMode to bottom sheet
    const onCloseSheet = useCallback(() => {
        setFile(null);
        onClose();
    }, [onClose, setFile]);

    return (
        <Sheet isOpen={isOpen} onClose={onCloseSheet} detent="content-height">
            <Sheet.Container>
                <Sheet.Header />
                <Sheet.Content>
                    <Flex
                        justify="center"
                        alignItems="flex-start"
                        direction="column"
                    >
                        <Heading
                            alignSelf="center"
                            cursor="pointer"
                            as="h1"
                            size="4xl"
                            noOfLines={1}
                            mb={6}
                        >
                            Submit
                        </Heading>

                        <Text
                            alignSelf="center"
                            mb={2}
                            fontSize="sm"
                            align="center"
                        >
                            Blah blah
                        </Text>

                        {!!file?.file && (
                            <Image
                                src={URL.createObjectURL(file.file)}
                                w="50%"
                                borderRadius={12}
                                overflow="clip"
                            />
                        )}
                    </Flex>
                </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop onTap={onCloseSheet} />
        </Sheet>
    );
};
