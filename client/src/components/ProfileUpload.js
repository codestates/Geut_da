import S3 from 'react-aws-s3';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const ProfileUpload = () => {
  const handleClick = (event) => {
    const file = event.target.files[0];
    const newFileName = uuidv4();
    const config = {
      bucketName: process.env.REACT_APP_BUCKET_NAME,
      region: process.env.REACT_APP_REGION,
      accessKeyId: process.env.REACT_APP_ACCESS_ID,
      secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
    };
    const ReactS3Client = new S3(config);
    if (file) {
      if (file.size >= 1 * 1024 * 1024) {
        alert('1mb 이하의 파일만 업로드 가능합니다.');
        event.target.value = null;
      } else {
        if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg') {
          ReactS3Client.uploadFile(file, newFileName).then((data) => {
            console.log(data);
            if (data.status === 204) {
              console.log('success');
            } else {
              console.log('fail');
            }
          });
        } else {
          alert('JPEG, PNG, JPG 파일만 업로드 가능합니다.');
          event.target.value = null;
        }
      }
    }
  };

  return (
    <>
      <input type='file' accept="image/*" onChange={handleClick} />
    </>
  );
};

export default ProfileUpload;
