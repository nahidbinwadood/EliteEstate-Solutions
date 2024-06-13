
import axios from "axios"

//image upload
export const imageUpload=async(photo)=>{
    const userImage = new FormData();
    userImage.append("image", photo);
  const { data } =await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`,userImage
  )
  return data.data.display_url
}