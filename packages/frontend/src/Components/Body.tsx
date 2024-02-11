import { Flex, useDisclosure } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { SubmitDrawer } from "./SubmitDrawer";
import { CameraButton } from "./CameraButton";
import { FileType } from "../Models";

export const Body = () => {
    const {
        isOpen: isSubmitOpen,
        onOpen: onSubmitOpen,
        onClose: onSubmitClose,
    } = useDisclosure();

    const [file, setFile] = useState<FileType | null>(null);

    const onFotoTaken = useCallback(
        async (file: FileType) => {
            setFile(file);
            setTimeout(() => {
                onSubmitOpen();
            }, 200);
        },
        [onSubmitOpen]
    );

    return (
        <Flex p={6} justify="center" alignItems="center" direction="column">
            <CameraButton onFotoTaken={onFotoTaken} />

            <SubmitDrawer
                isOpen={isSubmitOpen}
                onClose={onSubmitClose}
                file={file}
                setFile={setFile}
            />
        </Flex>
    );
};
