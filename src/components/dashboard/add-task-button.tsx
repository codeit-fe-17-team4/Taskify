import { motion } from 'framer-motion';
import Image from 'next/image';
import type { AddTaskButtonProps } from '@/components/dashboard/type';
import { useTheme } from '@/contexts/ThemeContext';

export default function AddTaskButton({ onClick }: AddTaskButtonProps) {
  const { theme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex h-11 w-full flex-shrink-0 cursor-pointer items-center justify-center gap-3 rounded-lg border ${
        theme === 'dark'
          ? 'border-[#524f5b] bg-[#201f23]'
          : 'hover:bg-gray-4 border-gray-300 bg-white'
      }`}
      onClick={onClick}
    >
      <Image
        src={
          theme === 'dark'
            ? '/darkauth/icon/add_box.svg'
            : '/dashboard/add-btn.svg'
        }
        alt='카드 추가'
        width={22}
        height={22}
      />
    </motion.button>
  );
}
