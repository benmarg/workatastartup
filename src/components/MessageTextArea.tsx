"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, type FC } from "react";
import { useToast } from "./ui/use-toast";

type MessageTextAreaProps = {
  threadId: string;
};

export const MessageTextArea: FC<MessageTextAreaProps> = ({ threadId }) => {
  const [message, setMessage] = useState<string>("");
  const { toast } = useToast();
  const router = useRouter();
  const { isLoaded, user } = useUser();
  const utils = api.useUtils();
  const { mutate: sendMessage } = api.user.sendMessage.useMutation({
    onSuccess: async () => {
      toast({
        className: "bg-white",
        title: "Message sent",
        description:
          "Your message has been sent. You can expect a response within 24-48 hours.",
      });
      await utils.user.getThreadsByUserId.invalidate({
        userId: user?.id ?? "",
      });
      router.refresh();
      setMessage("");
    },
  });

  return (
    <div className="grid w-full gap-2 border-t border-gray-300 bg-neutral-100 p-6">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="bg-white"
        placeholder="Type your message here."
      />
      <Button
        className="w-full"
        disabled={!isLoaded || !user || threadId === "0"}
        onClick={() => {
          if (message.trim().length === 0) {
            toast({
              title: "Message is empty",
              description: "Please enter a message before sending.",
              variant: "destructive",
            });
            return;
          }
          sendMessage({
            threadId: threadId,
            message: message,
            sentById: user?.id ?? "",
            sentByName: user?.fullName ?? "",
            sentByPictureUrl: user?.imageUrl ?? "",
          });
        }}
      >
        Send Message
      </Button>
    </div>
  );
};
