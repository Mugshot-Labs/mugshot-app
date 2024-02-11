import { Flex, useDisclosure, useToast } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
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
            }, 300);
        },
        [onSubmitOpen]
    );

    const toast = useToast();

    useEffect(() => {
        async function init() {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();

                // filter on video inputs, and map to query object
                const queries = devices
                    .filter(({ kind }) => kind === "videoinput")
                    .map(({ deviceId }) => ({ name: "camera", deviceId }));

                const promises = queries.map((queryObj) =>
                    navigator.permissions.query(
                        queryObj as PermissionDescriptor
                    )
                );

                const results = await Promise.all(promises);
                // log the state of each camera
                results.forEach(({ state }, i) =>
                    console.log(`Camera ${i}: ${state}`)
                );
            } catch (error) {
                toast({
                    title: "Error getting camera permissions.",
                    description:
                        "Please enable camera access in your phone settings for VeWWorld.",
                    status: "error",
                    duration: 6000,
                    isClosable: true,
                });
            }
        }

        init();
    }, [toast]);

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
