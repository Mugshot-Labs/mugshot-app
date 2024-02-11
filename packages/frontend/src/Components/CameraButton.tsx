import { Flex, FormLabel, Input, Text, useToast } from "@chakra-ui/react";
import { ChangeEvent, useCallback } from "react";
import { useGeolocated } from "react-geolocated";
import { FileType } from "../Models";
import { FaCameraRetro } from "react-icons/fa";
import { useWallet, useWalletModal } from "@vechain/dapp-kit-react";

export const CameraButton = ({
    onFotoTaken,
}: {
    onFotoTaken: (file: FileType) => void;
}) => {
    const toast = useToast();

    const { account } = useWallet();
    const { open: openWalletModal } = useWalletModal();

    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: true,
            },
            userDecisionTimeout: 10000,
        });

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] as File;

        if (file && coords) {
            onFotoTaken({
                file: file,
                gps: coords,
            });
        } else {
            toast({
                title: "Oops! We couldn't analyze the photo.",
                description: "Please try again.",
                status: "error",
                duration: 6000,
                isClosable: true,
            });
        }
    };

    const interceptOnClick = useCallback(
        (event: React.MouseEvent<HTMLInputElement>) => {
            if (!isGeolocationAvailable || !isGeolocationEnabled) {
                toast({
                    title: "Geolocation Services",
                    description:
                        "  This app requires access to your location to work properly. Please enable location services in your browser (App) settings.",
                    status: "error",
                    duration: 6000,
                    isClosable: true,
                });

                event.preventDefault();
                // cancel operation
                return;
            }

            if (!account) {
                openWalletModal();
                event.preventDefault();
                // cancel operation
                return;
            }
        },
        [
            account,
            isGeolocationAvailable,
            isGeolocationEnabled,
            openWalletModal,
            toast,
        ]
    );

    return (
        <>
            <FormLabel
                htmlFor="imageUpload"
                bgGradient={
                    "linear(to-br, primary.400, secondary.600, tertiary.100)"
                }
                p={3}
                w={282}
                borderRadius={8}
            >
                <Flex alignItems="center" justify="space-evenly">
                    <Text fontWeight={700}>Take a photo of your cup</Text>
                    <FaCameraRetro size={22} />
                </Flex>
            </FormLabel>
            <Input
                type="file"
                id="imageUpload"
                accept="image/*"
                style={{ display: "none" }}
                onClick={interceptOnClick}
                onChange={handleFileChange}
            />
        </>
    );
};