'use client'
import { z } from 'zod';
import Button from './button';
import Input from './input';
import { useState } from 'react';

const formSchema = z.object({
  email: z.string().min(3, 'Email is required'),
  password: z.string().min(6, 'Password is required'),
  confirmPwd: z.string().min(6, 'Confirm Password is required'),
})
.refine((data) => data.password === data.confirmPwd, {
  message: 'Passwords do not match',
  path: ['confirmPwd'], // Error message will show up under confirmPassword
});

type FormData = z.infer<typeof formSchema>;


const Register = () => {
  const [data, setData] = useState<FormData>({
    password: '',
    email: '',
    confirmPwd: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  return (
    <form>
      <Input
        name='email'
        type={'email'}
        placeholder={'Email'}
        className={'h-10 border border-[gray] rounded-xl w-full mb-4 text-sm'}
        value={data.email}
        onChange={handleChange}
      />
       {errors.email && (
        <p className='text-red-500 text-[13px]'>{errors.email}</p>
      )}
      <Input
        name='password'
        type={'password'}
        placeholder={'Password'}
        className={'h-10 border border-[gray] rounded-xl w-full mb-4 text-sm'}
        value={data.password}
        onChange={handleChange}
      />
       {errors.password && (
        <p className='text-red-500 text-[13px]'>{errors.password}</p>
      )}
      <Input
        name='confirmPwd'
        type={'password'}
        placeholder={'Confirm password'}
        className={'h-10 border border-[gray] rounded-xl w-full mb-4 text-sm'}
        value={data.confirmPwd}
        onChange={handleChange}
      />
       {errors.confirmPwd && (
        <p className='text-red-500 text-[13px]'>{errors.confirmPwd}</p>
      )}
      <Button
        title={'Signup'}
        className={'bg-black text-white text-sm'}
        type='submit'
      />
    </form>
  );
};

export default Register;
