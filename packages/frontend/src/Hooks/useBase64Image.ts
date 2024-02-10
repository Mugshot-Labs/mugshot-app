import { useCallback } from "react";

export const downloadBlob = async (url: string) => {
    const response = await fetch(url);
    return response.blob();
};

export const blobToBase64 = async (blob: Blob): Promise<string> =>
    new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
    });

export const base64ToBlob = async (base64: string): Promise<Blob> => {
    const response = await fetch(base64);
    return response.blob();
};

export const useBase64Image = () => {
    const base2Blob = useCallback(async (image: string) => {
        const blob = await base64ToBlob(image);
        const blobUrl = URL.createObjectURL(blob);
        return blobUrl;
    }, []);

    return { base2Blob };
};
