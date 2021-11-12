import S3 from "react-aws-s3"
import { v4 as uuidv4} from "uuid"
import dotenv from "dotenv"

dotenv.config();

const ProfileUpload = () => {

  const handleClick = event => {
    let file = event.target.files[0]
    let newFileName = uuidv4()
    const config = {
      bucketName: process.env.REACT_APP_BUCKET_NAME,
      region: process.env.REACT_APP_REGION,
      accessKeyId: process.env.REACT_APP_ACCESS_ID,
      secretAccessKey: process.env.REACT_APP_ACCESS_KEY
    }
    const ReactS3Client = new S3(config)
    console.log(file.type)
    if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg') {
      ReactS3Client.uploadFile(file, newFileName).then(data => {
        console.log(data)
        if (data.status === 204) {
          console.log("success")
        } else {
          console.log("fail")
        }
      })
    }
    else {
        alert("Jpeg,Png 파일만 업로드 가능합니다.")
      }
  }
    
    

  return (
    <>
      <input type="file" onChange={handleClick} />
    </>
  )
}

export default ProfileUpload;