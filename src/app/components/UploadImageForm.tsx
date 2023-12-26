"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadS3 } from "@/utils/uploadS3";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { createFileName } from "@/utils/createFileName";
import { useImage } from "../hooks/useBlob";

function UploadImageForm() {
  const [file, setFile] = useState<File>();
  const { postImage } = useImage();

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setFile(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const onClick = async () => {
    if (file) {
      const name = createFileName({ id: "", fileName: file.name });
      await uploadS3(file, name);
      postImage(name);
      setFile(undefined);
    }
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className="w-full h-40 border-2 border-slate-700 grid place-items-center"
      >
        <p className="text-3xl">画像をアップロード</p>
        <Input {...getInputProps()} />
      </div>
      <Button onClick={onClick} className="mt-4">
        upload to S3
      </Button>
    </div>
  );
}

export default UploadImageForm;
