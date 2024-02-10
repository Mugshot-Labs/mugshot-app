"use client";

import { Box, Flex, IconButton, useToast } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { IoMdReverseCamera } from "react-icons/io";
import Sheet from "react-modal-sheet";

import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

export const CameraDrawer = ({
    isOpen,
    onClose,
    onFotoTaken,
}: {
    isOpen: boolean;
    onClose: () => void;
    onFotoTaken: (uri: string) => void;
}) => {
    const toast = useToast();

    const [cameraFaciingMode, setCameraFacingMode] = useState<
        typeof FACING_MODES.ENVIRONMENT | typeof FACING_MODES.USER
    >(FACING_MODES.ENVIRONMENT);

    function handleTakePhoto(dataUri: string) {
        onFotoTaken(dataUri);
    }

    function handleCameraError(error: Error) {
        console.log("handleCameraError", error);
        toast({
            title: "Error",
            description: "Error while accessing the camera. Please try again.",
            status: "error",
            duration: 9000,
            isClosable: true,
        });
    }

    function handleCameraStart() {
        console.log("handleCameraStart");
    }

    function handleCameraStop() {
        console.log("handleCameraStop");
    }

    const handleCameraFacingMode = useCallback(() => {
        setCameraFacingMode((prevState) =>
            prevState === FACING_MODES.ENVIRONMENT
                ? FACING_MODES.USER
                : FACING_MODES.ENVIRONMENT
        );
    }, []);

    // TODO - Add theme and colorMode to bottom sheet

    return (
        <Sheet isOpen={isOpen} onClose={onClose} detent="content-height">
            <Sheet.Container>
                <Sheet.Header />
                <Sheet.Content>
                    <Box
                        style={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                        }}
                    >
                        <IconButton
                            m={6}
                            bg="transparent"
                            alignSelf="flex-end"
                            aria-label="close"
                            style={{ zIndex: 99999 }}
                            onClick={handleCameraFacingMode}
                        >
                            <IoMdReverseCamera size={32} />
                        </IconButton>
                    </Box>

                    {isOpen && (
                        <Flex direction="column">
                            <Box m={6} borderRadius={12} overflow="clip">
                                <Camera
                                    imageType={IMAGE_TYPES.JPG}
                                    isSilentMode
                                    isImageMirror
                                    imageCompression={0}
                                    isMaxResolution
                                    idealFacingMode={cameraFaciingMode}
                                    onCameraError={handleCameraError}
                                    onCameraStart={handleCameraStart}
                                    onCameraStop={handleCameraStop}
                                    onTakePhotoAnimationDone={handleTakePhoto}
                                    isDisplayStartCameraError={true}
                                />
                            </Box>
                        </Flex>
                    )}
                </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop onTap={onClose} />
        </Sheet>
    );
};
