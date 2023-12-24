import { ClassName } from "@/types/common";
import { countGrapheme } from "@/utils/countGrapheme";
import { Control, useWatch } from "react-hook-form";

interface Props extends ClassName {
  name: string;
  control: Control<any>;
  maxLength: number
}

function TextLength({ className, name, control, maxLength }: Props) {
  const text = useWatch({ control, name, defaultValue: "" });
  const textLength = countGrapheme(text as string);
  return (
    <p
      className={`${className} ${
        textLength > maxLength ? "text-red-500" : "text-green-500"
      } text-sm`}
    >{`${textLength}/${maxLength}文字`}</p>
  );
}

export default TextLength;
