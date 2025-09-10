import Image from 'next/image';

export default function PeekabooLoader() {
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <p className='mt-2 animate-pulse text-2xl font-bold text-gray-500'>
        까꿍
      </p>
      <Image
        priority
        src='/image/peekaboo.jpeg'
        alt='Peek-a-Boo 로딩'
        width={500}
        height={500}
      />
    </div>
  );
}
