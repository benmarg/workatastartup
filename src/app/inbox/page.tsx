import { MessageTextArea } from "@/components/MessageTextArea";
import { Input } from "@/components/ui/input";
import { firstNameLastInitial, formatDistanceCompact } from "@/lib/utils";
import { api } from "@/trpc/server";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";

const Inbox: FC = async ({}) => {
  const { userId } = auth();
  if (!userId) {
    return <div>You are not signed in</div>;
  }
  const threads = await api.user.getThreadsByUserId({ userId });
  const selectedThread = { id: "0" };

  return (
    <div className="grid grid-cols-4 gap-4 pt-4">
      <div className="h-[90vh] w-full border border-gray-300 bg-white">
        <div className="border-b border-gray-300 bg-neutral-100 p-4">
          <Input className="bg-white" placeholder="Search Inbox..." />
        </div>
        {threads.map((thread) => {
          let user;
          let userName;
          let userPictureUrl;
          //Figure out if the user is the sender or receiver by checking the logged in user id against the thread's startedById/sentToId
          if (thread.startedById === userId) {
            user = thread.sentToId;
            userName = thread.sentToName;
            userPictureUrl = thread.sentToPictureUrl;
          } else {
            user = thread.startedById;
            userName = thread.startedByName;
            userPictureUrl = thread.startedByPictureUrl;
          }
          return (
            <Link key={thread.id} href={`/inbox/${thread.id}`}>
              <div className="flex flex-col border-b border-gray-300 bg-white">
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-2">
                    <Image
                      className="aspect-square max-h-10 max-w-10 rounded-full"
                      src={userPictureUrl}
                      alt={userName}
                      width={100}
                      height={100}
                    />
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-bold">
                        {firstNameLastInitial(userName)}
                      </p>
                      <p className="text-sm font-medium text-gray-600">
                        {thread.Company.name}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-medium">
                    {formatDistanceCompact(
                      thread.messages[thread.messages.length - 1]?.createdAt ??
                        new Date(),
                    )}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="col-span-2 flex flex-col justify-between border border-gray-300 bg-white">
        <div>
          <div className="flex gap-3 border-b border-gray-300 bg-neutral-100 p-4">
            <div></div>
          </div>
          <div className="flex flex-col gap-6 overflow-y-scroll px-4 py-2"></div>
        </div>
        <div>
          <MessageTextArea threadId={selectedThread.id} />
        </div>
      </div>
      <div className="flex h-1/2 flex-col gap-3 border border-gray-300 bg-white p-4"></div>
    </div>
  );
};

export default Inbox;
