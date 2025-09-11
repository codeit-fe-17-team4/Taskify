import { motion } from 'framer-motion';
import Image from 'next/image';
import type { AddColumnButtonProps } from '@/components/dashboard/type';

export default function AddColumnButton({ onClick }: AddColumnButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className='hover:bg-gray-4 flex h-[4.7rem] w-full cursor-pointer items-center justify-center gap-[0.7rem] rounded-[0.8rem] border border-gray-300 bg-white whitespace-nowrap'
      onClick={onClick}
    >
      <span className='text-black-500 font-bold'>새로운 칼럼 추가하기</span>
      <Image
        src='/dashboard/add-btn.svg'
        alt='칼럼 추가'
        width={22}
        height={22}
      />
    </motion.button>
  );
}
