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
            //@ts-expect-error - window.vechain.isVewWorldExclusive is not typed
            const isExclusive = window?.vechain?.isVewWorldExclusive ?? false;

            if (!isExclusive) {
                toast({
                    title: "VewWorld Exclusive",
                    description:
                        "This app is currently only available to VewWorld users Please use the VewWorld app to access this feature.",
                    status: "error",
                    duration: 6000,
                    isClosable: true,
                });

                // cancel operation
                event.preventDefault();
                return;
            }

            if (!isGeolocationAvailable || !isGeolocationEnabled) {
                toast({
                    title: "Geolocation Services",
                    description:
                        "  This app requires access to your location to work properly. Please enable location services in your system settings for Veworld.",
                    status: "error",
                    duration: 6000,
                    isClosable: true,
                });

                // cancel operation
                event.preventDefault();
                return;
            }

            if (!account) {
                openWalletModal();

                // cancel operation
                event.preventDefault();
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
                name="image"
                accept="image/*"
                style={{ display: "none" }}
                capture="environment"
                onClick={interceptOnClick}
                onChange={handleFileChange}
            />
        </>
    );
};
