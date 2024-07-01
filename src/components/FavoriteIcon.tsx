"use client";
import { api } from "@/trpc/react";
import { useUser } from "@clerk/nextjs";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FC } from "react";

type FavoriteIconProps = {
  jobId: string;
};

const FavoriteIcon: FC<FavoriteIconProps> = ({ jobId }) => {
  const utils = api.useUtils();
  const router = useRouter();
  const { isLoaded, user } = useUser();

  const { data: favoriteJobs } = api.user.getSavedJobs.useQuery({
    userId: user?.id ?? "",
  });
  const { mutate: addFavoriteJob } = api.user.addFavoriteJob.useMutation({
    onSuccess: async () => {
      await utils.user.getSavedJobs.invalidate({ userId: user?.id ?? "" });
      router.refresh();
    },
  });
  const { mutate: removeFavoriteJob } = api.user.removeFavoriteJob.useMutation({
    onSuccess: async () => {
      await utils.user.getSavedJobs.invalidate({ userId: user?.id ?? "" });
      router.refresh();
    },
  });

  if (!isLoaded || !user?.id) {
    return <></>;
  }

  if (favoriteJobs?.FavoriteJobs.includes(jobId)) {
    return (
      <Star
        className="w-1/5 cursor-pointer fill-yellow-500 text-yellow-500"
        onClick={() => removeFavoriteJob({ userId: user.id, jobId })}
      />
    );
  }

  return (
    <Star
      className="w-1/5 cursor-pointer text-yellow-500"
      onClick={() => addFavoriteJob({ userId: user.id, jobId })}
    />
  );
};

export default FavoriteIcon;
