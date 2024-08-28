'use client';

import Image from "next/image";
import { useRouter } from "next/navigation"; // Update the import

const Logo = () => {
    const router = useRouter();

    return (
        <Image
            alt="Logo"
            src="/images/logo.png"
            width={150}
            height={150}
            className="hidden md:block cursor-pointer"
            onClick={() => router.push('/')} // Example of using the router to navigate
        />
    );
}

export default Logo;
