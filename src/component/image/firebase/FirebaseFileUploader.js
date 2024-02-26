import { uploadBytes, getDownloadURL } from "firebase/storage";

const FirebaseFileUploader = async (imageUpload, storageRef) => {
    if (imageUpload && storageRef) {
        try {
            // Upload the bytes of the image
            const snapshot = await uploadBytes(storageRef, imageUpload);

            // Get the download URL of the uploaded file
            const url = await getDownloadURL(snapshot.ref);

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
