"use client"

import Image from "next/image";
import React from "react";
import { useImage } from "../hooks/useBlob";

function UploadedImage() {
  const { uploadedImage } = useImage();
  const backetName = process.env.NEXT_PUBLIC_S3_BUCKET_NAME;
  const region = process.env.NEXT_PUBLIC_AWS_REGION;
  return (
    <div className="flex space-x-4">
      {uploadedImage?.map((item) => {
        return (
          <Image key={item.id}
            src={`https://${backetName}.s3.${region}.amazonaws.com/${item.src}`}
            width={80}
            height={80}
            alt=""
          />
        );
      })}
    </div>
  );
}

export default UploadedImage;
