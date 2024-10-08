import Link from 'next/link';

export default function NavigationLinks({}: {}) {
  return (
    <nav>
      <Link href='/'>Home</Link>
      <Link href='/register'>Sign Up</Link>
      <Link href='/login'>Sign In</Link>
    </nav>
  );
}
