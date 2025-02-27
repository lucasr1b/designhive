'use client';
import { login } from '@/actions/session';
import Button from '@/components/atomic/Button';
import { useSession } from '@/contexts/SessionContext';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LoginPage = () => {
  const { session, setSession, sessionLoading } = useSession();

  const { push } = useRouter();

  useEffect(() => {
    if (session?.isLoggedIn) {
      push('/');
    }
  }, [session, push]);

  if (session?.isLoggedIn || sessionLoading) {
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    try {
      const user = await login(formData);
      setSession(user);
    } catch (err: any) {
      console.log(err.message);
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col items-center gap-4 w-80'>
        <h1 className='font-semibold text-2xl'>Log in to DesignHive</h1>
        <Button outline>
          <Image src={'/google.svg'} alt='Google' width={18} height={18} />Continue with Google
        </Button>
        <span className='text-base-100'>or</span>
        <form className='flex flex-col gap-4 w-full' onSubmit={handleLogin}>
          <input name='username' className='border border-accent-200 rounded-xl h-12 px-4 text-sm' placeholder='Email or username' />
          <input name='password' type='password' className='border border-accent-200 rounded-xl h-12 px-4 text-sm' placeholder='Password' />
          <Button type='submit'>Log in</Button>
        </form>
        <span className='text-base-200'>Don&apos;t have an account? <Link href='/signup' className='text-black cursor-pointer hover:underline'>Sign up</Link></span>
      </div>
    </div >
  );
};

export default LoginPage;