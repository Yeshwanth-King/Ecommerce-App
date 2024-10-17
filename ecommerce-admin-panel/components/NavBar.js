import React from 'react'
import { useSession } from "next-auth/react";
import { FaUser } from "react-icons/fa";
import { HiOutlineBell } from "react-icons/hi";
import Image from 'next/image';
import Link from 'next/link';

const NavBar = () => {
  const { data: session, status } = useSession();

  return (
    <div className="flex flex-col h-20 border shadow-red-500 w-screen md:w-full">
      <div className="py-2 flex w-full justify-end md:justify-between px-3 text-lg items-center">
        <span className='hidden md:block'>Welcome <span className='font-semibold'>{session?.user.name}</span></span>
        <div className='flex w-1/6 gap-1 justify-end md:justify-between'>
          <div className='hidden md:flex flex-col justify-center items-center'>
            <Link href={"/inbox"} className='bg-red-50 border cursor-pointer p-3 flex justify-center items-center rounded-full'>

              <HiOutlineBell className='' />
            </Link>
          </div>
          <div className="flex gap-2 justify-end md:justify-center items-center md:py-1 bg-red-500 rounded-full md:px-1 cursor-pointer">
            {/* <span className="text-white hidden md:flex text-sm">{session?.user.name}</span> */}
            <div className="rounded-full overflow-hidden">
              {session ? (
                <Image src={session?.user.image} priority width={60} height={60} alt='Profile' />
              ) : (
                <FaUser />
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default NavBar
