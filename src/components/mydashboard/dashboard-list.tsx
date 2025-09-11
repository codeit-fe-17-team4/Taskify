import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeIcon } from '@/utils/getThemeIcon';

const colorCode: { [key: string]: string } = {
  '#7AC555': 'bg-green-500',
  '#760DDE': 'bg-purple-700',
  '#FFA500': 'bg-orange-500',
  '#76A5EA': 'bg-blue-300',
  '#E876EA': 'bg-pink-400',
};

interface DashboardListProps {
  dashboards: {
    id: number;
    title: string;
    color: string;
    createdByMe: boolean;
  }[];
  totalPages: number;
  currentPage: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  onOpenModal: () => void;
}

export default function DashboardList({
  dashboards,
  totalPages,
  currentPage,
  onPrevPage,
  onNextPage,
  onOpenModal,
}: DashboardListProps) {
  const { theme } = useTheme();

  const BUTTON_STYLES = {
    base: 'tablet:w-3xs mobile:w-2xs flex h-[60px] w-full cursor-pointer items-center justify-center gap-2 rounded-lg border hover:opacity-80',
    dark: 'border-[var(--auth-border)] bg-[var(--auth-input-bg)] hover:bg-[var(--auth-input-bg)]',
    light: 'border-gray-200 bg-white hover:bg-gray-100',
  };

  const TEXT_STYLES = {
    dark: 'text-[var(--auth-text-strong)]',
    light: 'text-gray-600',
  };

  const PAGINATION_STYLES = {
    dark: 'border-[var(--auth-border)] bg-[var(--auth-input-bg)] hover:bg-[var(--auth-input-bg)]',
    light: 'border-gray-200 bg-white hover:bg-gray-100',
  };

  if (dashboards.length === 0) {
    return (
      <button
        className={`tablet:w-3xs mobile:w-3xs flex h-[60px] w-2xs cursor-pointer items-center justify-center gap-1 rounded-lg border hover:opacity-80 ${
          theme === 'dark' ? BUTTON_STYLES.dark : BUTTON_STYLES.light
        }`}
        onClick={onOpenModal}
      >
        <span
          className={`text-base font-bold ${
            theme === 'dark' ? TEXT_STYLES.dark : TEXT_STYLES.light
          }`}
        >
          새로운 대시보드
        </span>
        <Image
          alt='새로운 대시보드'
          height={15}
          src={getThemeIcon('newDashboard', theme)}
          width={15}
        />
      </button>
    );
  }

  return (
    <div className='tablet:w-lg mobile:w-2xs mb-10 w-full max-w-4xl'>
      <div className='tablet:grid-cols-2 mobile:grid-cols-1 relative grid grid-cols-3 gap-2'>
        {/* 새로운 대시보드 버튼 */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          className={`${BUTTON_STYLES.base} ${
            theme === 'dark' ? BUTTON_STYLES.dark : BUTTON_STYLES.light
          }`}
          onClick={onOpenModal}
        >
          <span
            className={`text-base font-bold ${
              theme === 'dark' ? TEXT_STYLES.dark : TEXT_STYLES.light
            }`}
          >
            새로운 대시보드
          </span>
          <Image
            alt='새로운 대시보드'
            height={20}
            src={getThemeIcon('newDashboard', theme)}
            width={20}
          />
        </motion.button>

        {/* 대시보드 카드 */}
        {dashboards.map((dashboard) => {
          return (
            <Link
              key={dashboard.id}
              href={`/dashboard/${String(dashboard.id)}`}
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className={`tablet:w-3xs mobile:w-2xs relative flex h-[60px] w-full cursor-pointer items-center gap-3 rounded-md border p-4 hover:opacity-80 ${
                  theme === 'dark' ? BUTTON_STYLES.dark : BUTTON_STYLES.light
                }`}
              >
                <div
                  className={`h-2 w-2 rounded-full ${colorCode[dashboard.color]}`}
                />
                <div>
                  <span
                    className={`text-base font-bold ${
                      theme === 'dark' ? TEXT_STYLES.dark : TEXT_STYLES.light
                    }`}
                  >
                    {dashboard.title} {dashboard.createdByMe && '👑'}
                  </span>
                </div>
              </motion.button>
            </Link>
          );
        })}

        {/* 페이지네이션 */}
        <div className='col-span-full mt-4 flex items-center justify-end gap-2'>
          <p
            className={`text-sm ${
              theme === 'dark' ? TEXT_STYLES.dark : TEXT_STYLES.light
            }`}
          >
            {totalPages} 페이지 중 {currentPage}
          </p>
          <div className='flex'>
            <button
              disabled={currentPage === 1}
              className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded border hover:opacity-80 disabled:cursor-not-allowed ${
                theme === 'dark'
                  ? PAGINATION_STYLES.dark
                  : PAGINATION_STYLES.light
              }`}
              onClick={onPrevPage}
            >
              <Image
                alt='이전 페이지'
                height={7}
                src={getThemeIcon('prevPage', theme)}
                width={7}
              />
            </button>
            <button
              disabled={currentPage === totalPages}
              className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded border hover:opacity-80 disabled:cursor-not-allowed ${
                theme === 'dark'
                  ? PAGINATION_STYLES.dark
                  : PAGINATION_STYLES.light
              }`}
              onClick={onNextPage}
            >
              <Image
                alt='다음 페이지'
                height={7}
                src={getThemeIcon('nextPage', theme)}
                width={7}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
