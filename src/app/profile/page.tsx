'use client';
import Avatar from '@/assets/icons/avatar';
import BackArrow from '@/assets/icons/backArrow';
import Button from '@/components/button';
import Input from '@/components/input';
import { useUser } from '@/hooks/user';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { z } from 'zod';

const formSchema = z.object({
  username: z.string().min(3, 'Username is required'),
  email: z.string().min(3, 'Email is required'),
  image: z.string().min(1, 'Image is required'),
  profileSetup: z.string().min(1, 'Image is required'),
  color: z.string().min(1, 'Color is required'),
});

type FormData = z.infer<typeof formSchema>;

const UserProfile = () => {
  const queryClient = useQueryClient();
  const { data: user } = useUser(true);
  console.log('userssss', user);
  // const userEmail = user?.userId?.email;

  const [data, setData] = useState<FormData>({
    username: '',
    email: '',
    image: '',
    profileSetup: '',
    color: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-md'>
        <BackArrow />
        <div className='grid grid-cols-2 gap-4 mt-3 justify-evenly items-center '>
          <div className='flex justify-center'>
            <Avatar />
          </div>
          <form>
            <Input
              type={'text'}
              placeholder={'Username'}
              className='h-10 border border-gray-300 rounded-xl w-full mt-4 text-sm'
              value={data.username}
              onChange={handleChange}
              name={'username'}
            />
            <Input
              type={'email'}
              placeholder={'Email'}
              className='h-10 border border-gray-300 rounded-xl w-full mt-4 text-sm'
              value={data.email}
              onChange={handleChange}
              name={'email'}
              readOnly={true}
            />
          </form>
        </div>
        <Button
          title={'Save Changes'}
          type={'submit'}
          className={'bg-black text-white text-sm mt-4'}
        />
      </div>
    </div>
  );
};

export default UserProfile;
