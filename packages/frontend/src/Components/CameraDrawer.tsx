"use client";

import { Box, Flex, useToast } from "@chakra-ui/react";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import Sheet from "react-modal-sheet";
import { useGeolocated } from "react-geolocated";

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

    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: true,
            },
            userDecisionTimeout: 10000,
        });

    console.log({ coords, isGeolocationAvailable, isGeolocationEnabled });

    const RenderGPS = useMemo(() => {
        return !isGeolocationAvailable ? (
            <div>Your browser does not support Geolocation</div>
        ) : !isGeolocationEnabled ? (
            <div>Geolocation is not enabled</div>
        ) : coords ? (
            <table>
                <tbody>
                    <tr>
                        <td>latitude</td>
                        <td>{coords.latitude}</td>
                    </tr>
                    <tr>
                        <td>longitude</td>
                        <td>{coords.longitude}</td>
                    </tr>
                    <tr>
                        <td>altitude</td>
                        <td>{coords.altitude}</td>
                    </tr>
                    <tr>
                        <td>heading</td>
                        <td>{coords.heading}</td>
                    </tr>
                    <tr>
                        <td>speed</td>
                        <td>{coords.speed}</td>
                    </tr>
                </tbody>
            </table>
        ) : (
            <div>Getting the location data&hellip; </div>
        );
    }, [coords, isGeolocationAvailable, isGeolocationEnabled]);

    console.log({ RenderGPS });

    // TODO - Add theme and colorMode to bottom sheet

    const handleClose = useCallback(() => {
        // cancel();
        onClose();
        onFotoTaken("dataUri");
        toast({});
    }, [onClose, onFotoTaken, toast]);

    const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Access the selected file
        if (file) {
            setSelectedPhoto(file); // Update the state with the selected file
        }

        /*
            {selectedPhoto && (
                <div>
                <h2>Selected Photo:</h2>
                <img src={URL.createObjectURL(selectedPhoto)} alt="Selected" />
                </div>
            )}
        */
    };

    return (
        <Sheet isOpen={isOpen} onClose={handleClose} detent="content-height">
            <Sheet.Container>
                <Sheet.Header />
                <Sheet.Content>
                    {isOpen && (
                        <Flex direction="column">
                            <Box m={6} borderRadius={12} overflow="clip">
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    capture="environment"
                                    onChange={handleFileChange}
                                />
                            </Box>
                        </Flex>
                    )}
                </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop onTap={handleClose} />
        </Sheet>
    );
};
