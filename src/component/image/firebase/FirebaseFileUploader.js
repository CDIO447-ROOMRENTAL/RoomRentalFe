import { getDownloadURL, uploadBytesResumable, getMetadata, updateMetadata } from "firebase/storage";

const FirebaseFileUploader = async (imageUpload, storageRef) => {
    if (imageUpload && storageRef) {
        try {
            // Upload the bytes of the image
            const uploadTask = uploadBytesResumable(storageRef, imageUpload, {
                contentType: imageUpload.type // Set the content type
            });
            await uploadTask;

            // Ensure the content type is correctly set
            const metadata = await getMetadata(storageRef);
            const uploadedContentType = metadata.contentType || '';
            if (!uploadedContentType.startsWith(imageUpload.type.split('/')[0])) {
                await updateMetadata(storageRef, {
                    contentType: imageUpload.type
                });
            }

            // Get the download URL of the uploaded file
            const url = await getDownloadURL(storageRef);

            return url; // Return the download URL
        } catch (error) {
            console.error("Error uploading the file: ", error);
            throw error;
        }
    } else {
        console.error("Both imageUpload and storageRef must be provided.");
        return null;
    }
};

export default FirebaseFileUploader; // Export FirebaseFileUploader as default
