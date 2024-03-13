import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import { fileURLToPath } from "url";

      
cloudinary.config({ 
  cloud_name: 'dyc0vvshz', 
  api_key: '894413726277644', 
  api_secret: 'ME9qXHaFEBeCxUo6y-KYGgRqBhU' 
});

const uploadFileCloudinary = async(localFilePath)=>{
    try {
        if(!localFilePath) return null;

        // upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type:"auto"
        })

        console.log(response.url);
        console.log(response);
     
    } catch (error) {
        try {
            // remove file if file is not upload to cloudinary
            await fs.unlink(localFilePath);
            console.log('File successfully deleted');
          } catch (err) {
            console.error('Error deleting the file:', err);
          }
          console.log(error)
    }
}

export default uploadFileCloudinary;