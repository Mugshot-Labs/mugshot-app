"use client";

import {
    Box,
    Flex,
    Heading,
    IconButton,
    Image,
    Text,
    useToast,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { MdDelete } from "react-icons/md";
import Sheet from "react-modal-sheet";

export const SubmitDrawer = ({
    isOpen,
    onClose,
    blobImage,
    setBlobImage,
}: {
    isOpen: boolean;
    onClose: () => void;
    blobImage: string | null;
    setBlobImage: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
    const toast = useToast();

    // TODO - Add theme and colorMode to bottom sheet

    return (
        <Sheet isOpen={isOpen} onClose={onClose} detent="content-height">
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

                        {!!blobImage && (
                            <Image
                                src={blobImage}
                                w="50%"
                                borderRadius={12}
                                overflow="clip"
                            />
                        )}
                    </Flex>
                </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop onTap={onClose} />
        </Sheet>
    );
};
