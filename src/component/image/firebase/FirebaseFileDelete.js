import { deleteObject, ref } from "firebase/storage";
import { storage } from "./firebaseConfig";

const FirebaseFileDelete = (filePath) => {
    const fileRef = ref(storage, filePath); // Create a reference to the file

    // Delete the file
    return deleteObject(fileRef).then(() => {
        console.log("File deleted successfully");
    }).catch((error) => {
        console.error("Error deleting file:", error);
        throw error;
    });
}
export default FirebaseFileDelete;