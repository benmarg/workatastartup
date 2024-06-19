"use client";

import { api } from "@/trpc/react";
import { EyeIcon, EyeOff, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FC } from "react";
import { Button } from "./ui/button";

interface JobsButtonsProps {
  jobId: string;
  userId: string;
}

const JobsButtons: FC<JobsButtonsProps> = ({ jobId, userId }) => {
  const utils = api.useUtils();
  const router = useRouter();

  const { data: savedJobs } = api.user.getSavedJobs.useQuery({
    userId: userId,
  });
  const { mutate: addFavoriteJob } = api.user.addFavoriteJob.useMutation({
    onSuccess: async () => {
      await utils.user.getSavedJobs.invalidate({ userId: userId });
      router.refresh();
    },
  });
  const { mutate: removeFavoriteJob } = api.user.removeFavoriteJob.useMutation({
    onSuccess: async () => {
      await utils.user.getSavedJobs.invalidate({ userId: userId });
      router.refresh();
    },
  });
  const { mutate: addHiidenJob } = api.user.addHiddenJob.useMutation({
    onSuccess: async () => {
      await utils.user.getSavedJobs.invalidate({ userId: userId });
      router.refresh();
    },
  });
  const { mutate: removeHiidenJob } = api.user.removeHiddenJob.useMutation({
    onSuccess: async () => {
      await utils.user.getSavedJobs.invalidate({ userId: userId });
      router.refresh();
    },
  });

  return (
    <div className="flex gap-2">
      {savedJobs?.HiddenJobs.includes(jobId) && (
        <Button
          variant={"outline"}
          onClick={() => removeHiidenJob({ userId, jobId })}
        >
          <EyeIcon className="mr-1 h-4 w-4" /> Show
        </Button>
      )}
      {!savedJobs?.HiddenJobs.includes(jobId) && (
        <Button
          variant={"outline"}
          onClick={() => addHiidenJob({ userId, jobId })}
        >
          <EyeOff className="mr-1 h-4 w-4" /> Hide
        </Button>
      )}
      {savedJobs?.FavoriteJobs.includes(jobId) && (
        <Button
          variant={"outline"}
          onClick={() => removeFavoriteJob({ userId, jobId })}
        >
          <Star className="mr-1 h-4 w-4 fill-yellow-500 stroke-yellow-500" />{" "}
          Saved
        </Button>
      )}
      {!savedJobs?.FavoriteJobs.includes(jobId) && (
        <Button
          variant={"outline"}
          onClick={() => addFavoriteJob({ userId, jobId })}
        >
          <Star className="mr-1 h-4 w-4 stroke-yellow-500" /> Save
        </Button>
      )}
      <Button className="">Apply</Button>
    </div>
  );
};

export default JobsButtons;
