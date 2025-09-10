/* eslint-disable jsx-a11y/no-static-element-interactions */
// 인증 페이지용 통합 모달 컴포넌트 (성공/에러 메시지)
import type React from 'react';
import { createPortal } from 'react-dom';

interface UnifiedModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  type?: 'success' | 'error';
}

export default function UnifiedModal({
  isOpen,
  onClose,
  message,
}: UnifiedModalProps): React.ReactElement | null {
  if (!isOpen) {
    return null;
  }

  const modalContent = (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center'
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
      onClick={onClose}
    >
      <div
        className='relative h-[192px] w-[368px] rounded-lg bg-white shadow-lg max-[375px]:h-[220px] max-[375px]:w-[327px]'
        onClick={(e) => {
          e.stopPropagation();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            onClose();
          }
        }}
      >
        {/* 모달 내용 */}
        <div className='flex h-full flex-col items-center justify-center px-16 py-10 max-[375px]:px-0 max-[375px]:py-0'>
          {/* 내부 컨테이너 */}
          <div className='flex h-[112px] w-[240px] flex-col items-center justify-between max-[375px]:h-full max-[375px]:w-full max-[375px]:justify-start'>
            {/* 메시지 텍스트 - 한 줄로 표시 */}
            <h2 className='text-center text-[20px] leading-[28px] font-medium whitespace-nowrap text-black max-[375px]:mt-[81px] max-[375px]:text-[16px] max-[375px]:leading-[24px]'>
              {message}
            </h2>

            {/* 확인 버튼 */}
            <button
              className='flex h-[48px] w-[240px] items-center justify-center rounded-lg bg-[#5534DA] text-[16px] leading-[24px] font-semibold text-white transition-colors duration-200 hover:bg-[#4A2BC7] focus:ring-2 focus:ring-[#5534DA] focus:ring-offset-2 focus:outline-none max-[375px]:mt-[50px] max-[375px]:h-[42px] max-[375px]:w-[138px] max-[375px]:text-[14px] max-[375px]:leading-[20px]'
              aria-label='확인'
              onClick={onClose}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // 클라이언트 사이드에서만 Portal 사용
  if (typeof window !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return modalContent;
}
