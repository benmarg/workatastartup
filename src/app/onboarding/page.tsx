import { Button } from "@/components/ui/button";
import { type FC } from "react";

const page: FC = ({}) => {
  return (
    <div className="flex h-[60vh] w-full flex-col items-center justify-center gap-16">
      <h1 className="text-2xl font-bold text-yc">
        Welcome to WorkatYourStartup
      </h1>
      <div>Are you a founder or looking to join a startup?</div>
      <div className="flex gap-8">
        <Button>Founder</Button>
        <Button>Applicant</Button>
      </div>
    </div>
  );
};

export default page;
