'use client';
import { useUser } from '@/hooks/user';
import { useState } from 'react';
import AvatarIcon from '@/assets/icons/avatar';
import EditProfile from '@/assets/icons/edit';
import Button from '../button';

const ProfileInfo = () => {
  const { data: user, isLoading } = useUser(true);

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
              className='w-24 h-24 rounded-full object-cover'
              onClick={() => document.getElementById('avatar-upload')?.click()}
            />
          ) : (
            <div
              className='w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center'
              onClick={() => document.getElementById('avatar-upload')?.click()}
            >
              <AvatarIcon />
            </div>
          )}
          <div>{username}</div>
        </div>

        <div
          onClick={() => {
            window.location.href = '/profile';
          }}
        >
          <EditProfile />
        </div>
        <Button
          onClick={handleLogOut}
          title={'LogOut'}
          type={'button'}
          className={
            'bg-transparent w-full text-[red] absolute  rounded-none mt-12 font-bold cursor-pointer'
          }
        />

        {/* </div> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default ProfileInfo;
