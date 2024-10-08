import Image from 'next/image';

export default function Logo() {
  return (
    <Image
      src='./logo.svg'
      alt='Logo of a black circle with letters NB89 in white letters positioned in the center.'
      width='35'
      height='35'></Image>
  );
}
