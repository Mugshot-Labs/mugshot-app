import {
    Button,
    ButtonGroup,
    Flex,
    IconButton,
    useDisclosure,
} from "@chakra-ui/react";
import { useWallet, useWalletModal } from "@vechain/dapp-kit-react";
import { useCallback, useEffect, useState } from "react";
import { FaCameraRetro } from "react-icons/fa";

import { CameraDrawer } from "./CameraDrawer";
import { useBase64Image } from "../Hooks";
import { SubmitDrawer } from "./SubmitDrawer";

export const Body = () => {
    const { account, source } = useWallet();
    const { open: openWalletModal } = useWalletModal();
    const { base2Blob } = useBase64Image();

    const {
        isOpen: isCameraOpen,
        onOpen: onCameraOpen,
        onClose: onCaneraClose,
    } = useDisclosure();

    const {
        isOpen: isSubmitOpen,
        onOpen: onSubmitOpen,
        onClose: onSubmitClose,
    } = useDisclosure();

    const [blobImage, setBlobImage] = useState<string | null>(null);

    useEffect(() => {
        console.log({ account, source });
    }, [account, source]);

    const onOpenCamera = useCallback(() => {
        if (account) {
            onCameraOpen();
        } else {
            openWalletModal();
        }
    }, [account, onCameraOpen, openWalletModal]);

    const onFotoTaken = useCallback(
        async (uri: string) => {
            const img = await base2Blob(uri);
            setBlobImage(img);
            onCaneraClose();
            setTimeout(() => {
                onSubmitOpen();
            }, 200);
        },
        [base2Blob, onCaneraClose, onSubmitOpen]
    );

    return (
        <Flex p={6} justify="center" alignItems="center" direction="column">
            <ButtonGroup size="lg" isAttached variant="outline">
                <Button
                    onClick={onOpenCamera}
                    bgGradient={
                        "linear(to-br,  primary.400, secondary.600, tertiary.100)"
                    }
                >
                    Take a photo of your cup
                </Button>
                <IconButton
                    size="lg"
                    onClick={onOpenCamera}
                    bgGradient={"linear(to-b,  secondary.600, tertiary.300)"}
                    aria-label="Add to friends"
                    icon={<FaCameraRetro size={26} />}
                />
            </ButtonGroup>

            <CameraDrawer
                isOpen={isCameraOpen}
                onClose={onCaneraClose}
                onFotoTaken={onFotoTaken}
            />

            <SubmitDrawer
                isOpen={isSubmitOpen}
                onClose={onSubmitClose}
                setBlobImage={setBlobImage}
                blobImage={blobImage}
            />
        </Flex>
    );
};
