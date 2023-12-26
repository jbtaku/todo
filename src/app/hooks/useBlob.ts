import { fetcher } from "@/utils/fetcher";
import { Image, Video } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postImage, postVideo } from "../actions/useBlob";

export const useImage = () => {
  const queryKey = ["uploadedImage"];
  const queryClient = useQueryClient();
  const { data, isPending } = useQuery({
    queryKey,
    queryFn: () => {
      return fetcher<Image[]>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/image`);
    },
  });
  const { mutate: post } = useMutation({
    mutationFn: postImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return { uploadedImage: data, isPending, postImage: post };
};

export const useVideo = () => {
  const queryKey = ["uploadedVideo"];
  const queryClient = useQueryClient();
  const { data, isPending } = useQuery({
    queryKey,
    queryFn: () => {
      return fetcher<Video[]>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/video`);
    },
  });

  const { mutate: post } = useMutation({
    mutationFn: postVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return { uploadedVideo: data, isPending, postVideo: post };
};
