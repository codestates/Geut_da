import S3 from 'react-aws-s3';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();
// console.log((JSON.parse(localStorage.userInfo).image = data.location));
const ProfileUpload = () => {
  const imagePatchConfig = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
      'Content-Type': 'application/json',
    },
  };
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
              axios
                .patch('/api/users/image', { image: data.location }, imagePatchConfig)
                .then((res) => {
                  console.log(res, '이미지 보내짐');
                  if (JSON.parse(localStorage.getItem('userInfo')).image.split('.')[0] === 'https://geutdaimage') {
                    ReactS3Client.deleteFile(JSON.parse(localStorage.getItem('userInfo')).image.split('/')[3])
                      .then((res) => {
                        localStorage.setItem('userInfo', JSON.stringify({ ...JSON.parse(localStorage.userInfo), image: data.location }));
                        window.location.reload();
                        console.log(res, '삭제');
                      })
                      .catch((err) => {
                        console.log(err, '삭제안됨');
                        console.log(JSON.parse(localStorage.getItem('userInfo')).image, 'tet');
                      });
                  } else {
                    localStorage.setItem('userInfo', JSON.stringify({ ...JSON.parse(localStorage.userInfo), image: data.location }));
                    window.location.reload();
                  }
                })
                .catch((err) => {
                  console.log(err, '이미지 변경 안됨');
                });
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
      <input type='file' accept='image/*' onChange={handleClick} />
    </>
  );
};

export default ProfileUpload;
