import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function ArrowToHome() {
          return (
                    <Link href="/">
                              <ArrowLeftIcon className="flex items-center cursor-pointer h-10 w-15 mt-5 ml-8" />
                    </Link>
          );
}