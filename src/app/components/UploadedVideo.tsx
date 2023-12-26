"use client";

import React from "react";
import { useVideo } from "../hooks/useBlob";

function UploadedVideo() {
  const { uploadedVideo } = useVideo();
  const backetName = process.env.NEXT_PUBLIC_S3_BUCKET_NAME;
  const region = process.env.NEXT_PUBLIC_AWS_REGION;
  return (
    <div className="flex space-x-4">
      {uploadedVideo?.map((item) => {
        return (
          <video
            key={item.id}
            src={`https://${backetName}.s3.${region}.amazonaws.com/${item.src}`}
            preload="metadata"
            controls
          />
        );
      })}
    </div>
  );
}

export default UploadedVideo;
