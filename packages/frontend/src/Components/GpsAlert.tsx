import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Flex,
} from "@chakra-ui/react";
import { useRef } from "react";

export const GpsAlert = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    const cancelRef = useRef(null);

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <Flex>
                    <AlertDialogContent m={4} py={4}>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Geolocation Services
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            This app requires access to your location to work
                            properly. Please enable location services in your
                            browser (App) settings.
                        </AlertDialogBody>
                    </AlertDialogContent>
                </Flex>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};
