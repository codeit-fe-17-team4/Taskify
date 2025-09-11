import { motion } from 'framer-motion';
import Image from 'next/image';
import type { AddColumnButtonProps } from '@/components/dashboard/type';
import { useTheme } from '@/contexts/ThemeContext';

export default function AddColumnButton({ onClick }: AddColumnButtonProps) {
  const { theme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex h-[4.7rem] w-full cursor-pointer items-center justify-center gap-[0.7rem] rounded-[0.8rem] border whitespace-nowrap ${
        theme === 'dark'
          ? 'border-[#524f5b] bg-[#201f23]'
          : 'hover:bg-gray-4 border-gray-300 bg-white'
      }`}
      onClick={onClick}
    >
      <span
        className={`font-bold ${
          theme === 'dark' ? 'text-[#d6d5d9]' : 'text-black-500'
        }`}
      >
        새로운 칼럼 추가하기
      </span>
      <Image
        alt='칼럼 추가'
        width={22}
        height={22}
        src={
          theme === 'dark'
            ? '/darkauth/icon/add_box.svg'
            : '/dashboard/add-btn.svg'
        }
      />
    </motion.button>
  );
}
