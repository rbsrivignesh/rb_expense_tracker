import axiosInstance from "./axiosInstance";
import { API_PATHS } from "./apiPaths";

const uploadImage = async (imageFile) => {
    try {
        const formData = new FormData();
        formData.append("image", imageFile);
        const respone = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return respone.data;

    } catch (error) {
        console.log("error while uploading the image", error);
        throw error;
    }
};

export default uploadImage;