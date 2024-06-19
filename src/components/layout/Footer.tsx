import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";

const Footer: FC = () => {
  return (
    <div className="bg-yc mt-10 flex h-40 w-full items-center justify-center gap-24 px-96 font-medium">
      <Image
        className="h-[40px] w-[188px]"
        src="https://bookface-static.ycombinator.com/assets/waas/workatastartup_logo_white-fd90bda8fa88dcee932508c8c3edcb6b0c0c06901e773171dd96549a577c4a1b.svg"
        alt="logo"
        width={188}
        height={40}
      />
      <div className="flex gap-8 text-white">
        <Link href="/">About</Link>
        <Link href="/">FAQ</Link>
        <Link href="/">Press</Link>
        <Link href="/">Legal</Link>
        <Link href="/">Sign In</Link>
      </div>
    </div>
  );
};

export default Footer;
