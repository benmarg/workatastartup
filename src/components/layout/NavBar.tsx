import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";

const NavBar: FC = () => {
  return (
    <div className="mt-2 font-medium">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image src="/image.png" alt="logo" width={48} height={48} />
          </Link>
          <Link href="/">Companies & Jobs</Link>
          <Link href="/">Inbox</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/">My Profile</Link>
          <Link href="/"></Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
