import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface ButtonPaginationProps {
  onPrevClick: () => void;
  onNextClick: () => void;
  /** 왼쪽 버튼 disabled 여부 */
  isPrevDisabled?: boolean;
  /** 오른쪽 버튼 disabled 여부 */
  isNextDisabled?: boolean;
  /** 추가적인 tailwind className */
  additionalClass?: string;
}
export default function ButtonPagination({
  onPrevClick,
  onNextClick,
  isPrevDisabled = false,
  isNextDisabled = false,
  additionalClass = '',
}: ButtonPaginationProps): ReactNode {
  const buttonClassName =
    'border-gray-3 flex-center *:fill-black-2 disabled:*:fill-gray-3 h-9 w-9 cursor-pointer  border-1';
  return (
    <div className={cn('flex', additionalClass)}>
      <button
        className={cn(buttonClassName, 'rounded-l-sm')}
        onClick={onPrevClick}
        disabled={isPrevDisabled}
      >
        <PrevPageIcon />
      </button>
      <button
        className={cn(buttonClassName, 'rounded-r-sm')}
        onClick={onNextClick}
        disabled={isNextDisabled}
      >
        <NextPageIcon />
      </button>
    </div>
  );
}
const NextPageIcon = () => {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 8 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M5.8874 7.00063L0.865603 1.97883C0.733126 1.84636 0.668592 1.68867 0.672003 1.50577C0.675426 1.32286 0.743375 1.16517 0.875853 1.0327C1.00833 0.900224 1.16602 0.833984 1.34892 0.833984C1.53182 0.833984 1.68951 0.900224 1.82199 1.0327L6.92584 6.1468C7.04635 6.26731 7.13566 6.40235 7.19379 6.55192C7.2519 6.7015 7.28095 6.85107 7.28095 7.00063C7.28095 7.1502 7.2519 7.29977 7.19379 7.44935C7.13566 7.59892 7.04635 7.73396 6.92584 7.85447L1.81174 12.9686C1.67926 13.101 1.52328 13.1656 1.34379 13.1622C1.16431 13.1587 1.00833 13.0908 0.875853 12.9583C0.743375 12.8258 0.677136 12.6682 0.677136 12.4853C0.677136 12.3024 0.743375 12.1447 0.875853 12.0122L5.8874 7.00063Z' />
    </svg>
  );
};
const PrevPageIcon = () => {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 8 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M2.1126 6.99937L7.1344 12.0212C7.26687 12.1536 7.33141 12.3113 7.328 12.4942C7.32457 12.6771 7.25662 12.8348 7.12415 12.9673C6.99167 13.0998 6.83398 13.166 6.65108 13.166C6.46818 13.166 6.31049 13.0998 6.17801 12.9673L1.07416 7.8532C0.953652 7.73269 0.864336 7.59765 0.806213 7.44808C0.748102 7.2985 0.719047 7.14893 0.719047 6.99937C0.719047 6.8498 0.748102 6.70023 0.806213 6.55065C0.864336 6.40108 0.953652 6.26604 1.07416 6.14553L6.18826 1.03143C6.32074 0.898955 6.47673 0.834421 6.65621 0.837832C6.83569 0.841254 6.99167 0.909204 7.12415 1.04168C7.25663 1.17416 7.32286 1.33185 7.32286 1.51475C7.32286 1.69765 7.25663 1.85534 7.12415 1.98782L2.1126 6.99937Z' />
    </svg>
  );
};
