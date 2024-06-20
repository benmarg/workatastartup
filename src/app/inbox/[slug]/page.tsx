import { Input } from "@/components/ui/input";
import { firstNameLastInitial, formatDistanceCompact } from "@/lib/utils";
import { api } from "@/trpc/server";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";

type InboxProps = {
  params: { slug: string };
};

const Inbox: FC<InboxProps> = async ({ params }) => {
  const { userId } = auth();
  if (!userId) {
    return <div>You are not signed in</div>;
  }
  const threads = await api.user.getThreadsByUserId({ userId });
  const selectedThread = threads.find((thread) => thread.id === params.slug);

  let selectedUser;
  let selectedUserName;
  let selectedUserPictureUrl;
  //Figure out if the user is the sender or receiver by checking the logged in user id against the thread's startedById/sentToId
  if (!selectedThread) {
    return <div>Thread not found</div>;
  }
  if (selectedThread?.startedById === userId) {
    selectedUser = selectedThread.sentToId;
    selectedUserName = selectedThread.sentToName;
    selectedUserPictureUrl = selectedThread.sentToPictureUrl;
  } else {
    selectedUser = selectedThread.startedById;
    selectedUserName = selectedThread.startedByName;
    selectedUserPictureUrl = selectedThread.startedByPictureUrl;
  }

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
            <Image
              className="aspect-square max-h-10 max-w-10 rounded-full"
              src={selectedUserPictureUrl}
              alt={selectedUserName}
              width={100}
              height={100}
            />
            <div>
              <p className="font-bold">{selectedUserName}</p>
              <p>Founder</p>
            </div>
          </div>
          <div className="flex flex-col gap-6 px-4 py-2">
            {selectedThread.messages.map((message) => {
              return (
                <div
                  key={message.id}
                  className="flex w-full items-center gap-2"
                >
                  <Image
                    className="aspect-square max-h-10 max-w-10 rounded-full"
                    src={message.sentByPictureUrl}
                    alt={message.sentByName}
                    width={100}
                    height={100}
                  />
                  <div className="flex w-full flex-col gap-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">
                        {message.sentByName}
                      </p>
                      <p className="text-sm font-medium text-gray-600">
                        {formatDistanceCompact(message.createdAt ?? new Date())}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-600">
                      {message.message}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <Input className="bg-white" placeholder="Send a message..." />
        </div>
      </div>
      <div className="flex h-1/2 flex-col bg-white"></div>
    </div>
  );
};

export default Inbox;
