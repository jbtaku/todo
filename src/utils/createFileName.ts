interface Props {
  id: string;
  fileName: string;
}

export const createFileName = ({ id, fileName }: Props) => {
  const extension = fileName.split(".").pop();
  const timeStamp = Date.now();
  const newFileName = `${id}-${timeStamp}.${extension}`;
  return newFileName;
};
