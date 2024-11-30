'use client';
import { useUser } from '@/hooks/user';
import { useState } from 'react';
import AvatarIcon from '@/assets/icons/avatar';
import EditProfile from '@/assets/icons/edit';
import Logout from '@/assets/icons/logout';

const ProfileInfo = () => {
  const { data: user } = useUser(true);

  const username = user?.user?.username;
  const userImage = user?.user?.image;

  const [avatarImage, setAvatarImage] = useState<string | null>(
    user?.user?.image ?? null
  );

  const handleLogOut = () => {
    localStorage.clear();
    window.location.href = '/login';
  };
  return (
    <div className='bg-[#282b33] absolute bottom-0 py-3  w-full'>
      <div className=' flex items-center justify-between px-5 w-full '>
        {/* <div className='flex gap-3 items-center '> */}
        {/* <div className='flex  items-center justify-between '> */}
        <div className='cursor-pointer flex gap-2 items-center'>
          {avatarImage ? (
            <img
              src={userImage ? userImage : avatarImage}
              alt='User Avatar'
              className='w-12 h-12 rounded-full object-cover'
              onClick={() => document.getElementById('avatar-upload')?.click()}
            />
          ) : (
            <div
              className='text-[green] font-bold uppercase w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center'
              onClick={() => document.getElementById('avatar-upload')?.click()}
            >
              {/* <AvatarIcon /> */}
              {username?.[0]}
            </div>
          )}
          <div className='capitalized '>{username}</div>
        </div>

        <div className='flex items-center gap-4'>
          <div
            onClick={() => {
              window.location.href = '/profile';
            }}
          >
            <EditProfile />
          </div>
          <div onClick={handleLogOut}>
            <Logout />
          </div>
        </div>

        {/* </div> */}
      </div>
    </div>
  );
};

export default ProfileInfo;
