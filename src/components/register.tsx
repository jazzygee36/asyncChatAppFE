'use client';
import { z } from 'zod';
import Button from './button';
import Input from './input';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signUp } from '@/api/auth';
import { QUERIES } from '@/utils/constants';
import { AxiosError } from 'axios';
import Toast from './toast';

const formSchema = z
  .object({
    username: z.string().min(3, 'Username is required'),
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
  const queryClient = useQueryClient();
  const [data, setData] = useState<FormData>({
    password: '',
    email: '',
    confirmPwd: '',
    username: '',
  });
  console.log('dataaa', data);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [toastMessage, setToastMessage] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const { mutate, isPending } = useMutation({
    mutationFn: signUp,
    onSuccess: (data: unknown) => {
      const successMessage =
        (data as { response?: { data?: { message: string } } })?.response?.data
          ?.message || 'Registered Successfully';

      setToastMessage({
        message: successMessage,
        type: 'success',
      });

      // queryClient.invalidateQueries({
      //   queryKey: [QUERIES.USERPROFILE],
      // });
      // Additional logic for post-registratio

      // setTimeout(() => {
      //   window.location.href = '/confirm-email';
      // }, 300); // Adjust delay as needed
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage =
        error?.response?.data?.message || 'Error during registration';
      setToastMessage({ message: errorMessage, type: 'error' });
      console.log(error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    const parsedData = formSchema.safeParse(data);
    if (!parsedData.success) {
      // Collect validation errors
      const fieldErrors: { [key: string]: string } = {};
      parsedData.error.errors.forEach((error) => {
        if (error.path[0]) {
          fieldErrors[error.path[0]] = error.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    // If validation passes, call the mutation
    mutate(parsedData.data);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          name='username'
          type={'username'}
          placeholder={'Username'}
          className={'h-10 border border-[gray] rounded-xl w-full text-sm'}
          value={data.username}
          onChange={handleChange}
        />
        {errors.username && (
          <p className='text-red-500 text-[13px]'>{errors.username}</p>
        )}
        <Input
          name='email'
          type={'email'}
          placeholder={'Email'}
          className={'h-10 border border-[gray] rounded-xl w-full mt-4 text-sm'}
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
          className={'h-10 border border-[gray] rounded-xl w-full mt-4 text-sm'}
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
          className={'h-10 border border-[gray] rounded-xl w-full mt-4 text-sm'}
          value={data.confirmPwd}
          onChange={handleChange}
        />
        {errors.confirmPwd && (
          <p className='text-red-500 text-[13px]'>{errors.confirmPwd}</p>
        )}
        <Button
          title={isPending ? 'Loading' : 'Signup'}
          className={'bg-black text-white text-sm mt-4'}
          type='submit'
        />
      </form>
      {toastMessage && (
        <Toast
          message={toastMessage.message}
          type={toastMessage.type}
          onClose={() => setToastMessage(null)}
        />
      )}
    </>
  );
};

export default Register;
