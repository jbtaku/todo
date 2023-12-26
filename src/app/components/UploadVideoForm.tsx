"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadS3 } from "@/utils/uploadS3";
import { startTransition, useState } from "react";
import { useDropzone } from "react-dropzone";
import { createFileName } from "@/utils/createFileName";
import { useVideo } from "../hooks/useBlob";

function UploadVideoForm() {
  const [file, setFile] = useState<File>();
  const { postVideo } = useVideo();

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setFile(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "video/*": [] },
  });

  const onClick = async () => {
    if (file) {
      const name = createFileName({ id: "", fileName: file.name });
      await uploadS3(file, name);
      postVideo(name);
      setFile(undefined);
    }
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className="w-full h-40 border-2 border-slate-700 grid place-items-center"
      >
        <p className="text-3xl">動画をアップロード</p>
        <Input {...getInputProps()} />
      </div>
      <Button onClick={onClick} className="mt-4">
        upload to S3
      </Button>
    </div>
  );
}

export default UploadVideoForm;
