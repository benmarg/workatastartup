"use client";
import { api } from "@/trpc/react";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FC } from "react";

type FavoriteIconProps = {
  jobId: string;
};

const FavoriteIcon: FC<FavoriteIconProps> = ({ jobId }) => {
  const utils = api.useUtils();
  const router = useRouter();
  const { data: favoriteJobs } = api.user.getSavedJobs.useQuery({
    userId: "123",
  });
  const { mutate: addFavoriteJob } = api.user.addFavoriteJob.useMutation({
    onSuccess: async () => {
      await utils.user.getSavedJobs.invalidate({ userId: "123" });
      router.refresh();
    },
  });
  const { mutate: removeFavoriteJob } = api.user.removeFavoriteJob.useMutation({
    onSuccess: async () => {
      await utils.user.getSavedJobs.invalidate({ userId: "123" });
      router.refresh();
    },
  });

  if (favoriteJobs?.FavoriteJobs.includes(jobId)) {
    return (
      <Star
        className="w-1/5 cursor-pointer fill-yellow-500 text-yellow-500"
        onClick={() => removeFavoriteJob({ userId: "123", jobId })}
      />
    );
  }

  return (
    <Star
      className="w-1/5 cursor-pointer text-yellow-500"
      onClick={() => addFavoriteJob({ userId: "123", jobId })}
    />
  );
};

export default FavoriteIcon;
