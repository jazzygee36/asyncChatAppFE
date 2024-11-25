'use client';
import { useState } from 'react';
import Button from './button';
import Input from './input';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().min(3, 'Email is required'),
  password: z.string().min(6, 'Password is required'),
});

type FormData = z.infer<typeof formSchema>;

const Login = () => {
  const [data, setData] = useState<FormData>({
    password: '',
    email: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {};
  return (
    <form onSubmit={handleSubmit}>
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
      <Button
        title={'Login'}
        className={'bg-black text-white text-sm'}
        type='submit'
      />
    </form>
  );
};

export default Login;
