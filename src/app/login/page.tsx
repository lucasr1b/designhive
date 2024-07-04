'use client';
import Button from '@/components/atomic/Button';
import Image from 'next/image';
import Link from 'next/link';

const LoginPage = () => {

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    console.log(formData.get('username'));
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
        <span className='text-base-100'>Don&apos;t have an account? <Link href='/signup' className='text-base-200 cursor-pointer hover:text-black'>Sign up</Link></span>
      </div>
    </div >
  );
};

export default LoginPage;