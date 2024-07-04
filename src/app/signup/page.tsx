'use client';
import Button from '@/components/atomic/Button';
import Image from 'next/image';
import Link from 'next/link';
import { signup } from '../../actions/session';
import { useSession } from '@/contexts/SessionContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const SignupPage = () => {
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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    try {
      const user = await signup(formData);
      setSession(user);
    } catch (err: any) {
      console.log(err.message);
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col items-center gap-4 w-80'>
        <h1 className='font-semibold text-2xl'>Sign up to DesignHive</h1>
        {session && session.isLoggedIn && <p className='text-base-100'>You are already logged in as {session.name}</p>}
        <Button outline>
          <Image src={'/google.svg'} alt='Google' width={18} height={18} />Continue with Google
        </Button>
        <span className='text-base-100'>or</span>
        <form className='flex flex-col gap-4 w-full' onSubmit={handleSignup}>
          <input name='fname' className='border border-accent-200 rounded-xl h-12 px-4 text-sm' placeholder='Your name' />
          <input name='email' className='border border-accent-200 rounded-xl h-12 px-4 text-sm' placeholder='Email address' />
          <input name='password' type='password' className='border border-accent-200 rounded-xl h-12 px-4 text-sm' placeholder='Set a password, at least 8 characters' />
          <input name='cpassword' type='password' className='border border-accent-200 rounded-xl h-12 px-4 text-sm' placeholder='Confirm password' />
          <Button type='submit'>Sign up</Button>
        </form>
        <span className='text-base-200'>Already have an account? <Link href='/login' className='text-black cursor-pointer hover:underline'>Log in</Link></span>
      </div>
    </div >
  );
};

export default SignupPage;