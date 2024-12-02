'use client';
import { useEffect, useState } from 'react';
import AvatarIcon from '@/assets/icons/avatar';
import BackArrow from '@/assets/icons/backArrow';
import Button from '@/components/button';
import Input from '@/components/input';
import { useUser } from '@/hooks/user';
import { useMutation } from '@tanstack/react-query';

import { updateProfile } from '@/api/auth';
import Toast from '@/components/toast';

const UserProfile = () => {
  const { data: user, isLoading } = useUser(true);
  const userEmail = user?.user?.email;
  const userId = user?.user?.id;
  const username = user?.user?.username;
  const userImage = user?.user?.image;
  const profileSetup = user?.user?.profileSetup;

  const [avatarImage, setAvatarImage] = useState<string | null>(
    user?.user?.image ?? null
  );
  // const [username, setUsername] = useState(user?.user?.username ?? '');
  const [toastMessage, setToastMessage] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarImage(reader.result as string); // Set image as base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      setToastMessage({
        message: 'Profile updated successfully!',
        type: 'success',
      });
    },
    onError: () => {
      setToastMessage({
        message: 'Failed to update profile.',
        type: 'error',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId || !avatarImage) {
      setToastMessage({
        message: 'Please provide image.',
        type: 'error',
      });
      return;
    }

    if (userId) {
      mutate({ userId, image: avatarImage });
    }
  };

  useEffect(() => {
    if (!isLoading && profileSetup) {
      window.location.href = '/chat';
    }
  }, [isLoading, profileSetup]);

  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <div className='bg-white shadow-lg rounded-lg p-6 w-[90%] md:max-w-md'>
        <div className='flex items-center justify-center gap-5'>
          <div>
            <BackArrow />
          </div>
          <div className='text-sm text-center'>Complete your profile</div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 justify-evenly items-center'>
            {/* Avatar with Upload */}
            <div className='flex justify-center relative'>
              <div className='cursor-pointer'>
                {avatarImage ? (
                  <img
                    src={userImage ? userImage : avatarImage}
                    alt='User Avatar'
                    className='w-24 h-24 rounded-full object-cover'
                    onClick={() =>
                      document.getElementById('avatar-upload')?.click()
                    }
                  />
                ) : (
                  <div
                    className='w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center'
                    onClick={() =>
                      document.getElementById('avatar-upload')?.click()
                    }
                  >
                    <AvatarIcon />
                  </div>
                )}
              </div>
              <input
                id='avatar-upload'
                type='file'
                accept='image/*'
                className='hidden'
                onChange={handleImageUpload}
              />
            </div>

            {/* User Info */}
            <div>
              <Input
                type='text'
                name='username'
                placeholder='Username'
                className='capitalise h-10 border border-gray-300 rounded-xl w-full mt-4 text-sm text-black'
                value={username ?? ''}
                readOnly={true}
              />
              <Input
                type='email'
                name='email'
                placeholder='Email'
                className='h-10 border border-gray-300 rounded-xl w-full mt-4 text-sm'
                value={userEmail ?? ''}
                readOnly={true}
              />
              <Button
                title={isPending ? 'Saving...' : 'Save Changes'}
                type='submit'
                className={`bg-black text-white text-sm mt-4 ${
                  isPending ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isPending}
              />
            </div>
          </div>
        </form>
        {toastMessage && (
          <Toast
            message={toastMessage.message}
            type={toastMessage.type}
            onClose={() => setToastMessage(null)}
          />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
