import { Credentials } from "aws-sdk";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";

export const uploadS3 = async (file: File, name: string) => {
  const accessKeyId = process.env.NEXT_PUBLIC_S3_ACCESS_KEY;
  const secretAccessKey = process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY;
  const creds = new Credentials(
    accessKeyId as string,
    secretAccessKey as string
  );

  try {
    const parallelUploads3 = new Upload({
      client: new S3Client({
        region: process.env.NEXT_PUBLIC_AWS_REGION as string,
        credentials: creds,
      }),
      params: {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME as string,
        Key: name,
        Body: file,
        ContentType: file.type
      },
      leavePartsOnError: false,
    });

    await parallelUploads3.done();
  } catch (e) {
    console.log(e);
  }
};
