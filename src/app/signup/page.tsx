import Button from '@/components/atomic/Button';
import Image from 'next/image';
import Link from 'next/link';

const SignupPage = () => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col items-center gap-4 w-80'>
        <h1 className='font-semibold text-2xl'>Sign up to DesignHive</h1>
        <Button outline>
          <Image src={'/google.svg'} alt='Google' width={18} height={18} />Continue with Google
        </Button>
        <span className='text-base-100'>or</span>
        <form className='flex flex-col gap-4 w-full'>
          <input className='border border-accent-200 rounded-xl h-12 px-4 text-sm' placeholder='Your name' />
          <input className='border border-accent-200 rounded-xl h-12 px-4 text-sm' placeholder='Email address' />
          <input className='border border-accent-200 rounded-xl h-12 px-4 text-sm' placeholder='Set a password, at least 8 characters' />
          <input className='border border-accent-200 rounded-xl h-12 px-4 text-sm' placeholder='Confirm password' />
          <Button>Sign up</Button>
        </form>
        <span className='text-base-100'>Already have an account? <Link href='/login' className='text-base-200 cursor-pointer hover:text-black'>Log in</Link></span>
      </div>
    </div >
  );
};

export default SignupPage;