// import AWS from "aws-sdk";
// export async function uploadToS3(file:File){

//   if(!process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || !process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || !process.env.NEXT_PUBLIC_AWS_BUCKET_NAME){
//     console.log(process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,process.env.AWS_ACCESS_KEY_ID,process.env.NEXT_PUBLIC_AWS_BUCKET_NAME)
//      throw new Error("please give the .env of aws")
//      return 
//   }
//     console.log(process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,process.env.AWS_ACCESS_KEY_ID,process.env.NEXT_PUBLIC_AWS_BUCKET_NAME)


//     try{

//         AWS.config.update({
//             accessKeyId:process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
//             secretAccessKey:process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!
//         })
//         const s3=new AWS.S3({
//             params:{
//                 Bucket:process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,


//             },
//             region:"us-east-1"
//         })

//         const fileKey='/uploads/'+Date.now().toString() +file.name.replace(' ','-')

//         const params={
//             Bucket:process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
//             Key:fileKey,
//             Body:file
//         }

//         const upload=s3.putObject(params).on('httpDownloadProgress',evt=>{
//             console.log('uploading to S3..',parseInt(((evt.loaded*100)/evt.total).toString()+"%"))
//         }).promise()

//         await upload.then(data=>{
//             console.log('sucessfully uploaded to s3!',fileKey)
//         })

//         return Promise.resolve({
//             fileKey,
//             file_name:file.name
//         })


//     }catch(err){
//         console.log(err);


//     }

// }



// export async function getUrl(fileKey:string){
//     const url=`https://${process.env.AWS_BUCKET_NAME}.s3.us-east-1.amazonaws.com/${fileKey}`
//     return url

// }
import AWS from "aws-sdk";

// ✅ Using NEXT_PUBLIC_ variables (not recommended for secrets, but okay for demo)
const bucket = process.env.NEXT_PUBLIC_R2_BUCKET
const endpoint = process.env.NEXT_PUBLIC_JURIDISCTION_SPECIFIC_ENDPOINTS
const s3 = new AWS.S3({
  accessKeyId: process.env.NEXT_PUBLIC_R2_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_R2_SECRET_ACCESS_KEY,
  endpoint: new AWS.Endpoint(process.env.NEXT_PUBLIC_JURIDISCTION_SPECIFIC_ENDPOINTS!),
  region: 'auto',
  signatureVersion: 'v4',
});

export async function uploadToS3(file: File) {
  const fileKey = 'uploads/' + Date.now().toString() + file.name.replace(/\s+/g, '-');

  const params = {
    Bucket: process.env.NEXT_PUBLIC_R2_BUCKET!,
    Key: fileKey,
    Body: file,
    ContentType: file.type,
  };

  try {
    const upload = s3
      .putObject(params)
      .on('httpUploadProgress', (evt) => {
        const percent = ((evt.loaded * 100) / (evt.total || 1)).toFixed(2);
        // console.log(`Uploading to S3... ${percent}%`);
      })
      .promise();

    await upload.then(() => {
      // console.log('✅ Successfully uploaded to S3:', fileKey);
    });

    return {
      fileKey,
      fileName: file.name,
      fileUrl: `${process.env.NEXT_PUBLIC_R2_PUBLIC_BASE_URL}/${fileKey}`

    };
  } catch (err) {
    console.error('❌ Upload failed:', err);
  }
}
