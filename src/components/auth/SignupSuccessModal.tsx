import React from 'react';
import { createPortal } from 'react-dom';

interface SignupSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignupSuccessModal({
  isOpen,
  onClose,
}: SignupSuccessModalProps): React.ReactElement | null {
  if (!isOpen) return null;

  const modalContent = (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center'
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
      onClick={onClose}
      aria-hidden='true'
    >
      {/* 모달 컨테이너 */}
      <div
        className='relative h-[192px] w-[368px] rounded-lg bg-white shadow-lg max-[375px]:h-[220px] max-[375px]:w-[327px]'
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 내용 */}
        <div className='flex h-full flex-col items-center justify-center px-16 py-10 max-[375px]:px-0 max-[375px]:py-0'>
          {/* 내부 컨테이너 */}
          <div className='flex h-[112px] w-[240px] flex-col items-center justify-between max-[375px]:h-full max-[375px]:w-full max-[375px]:justify-start'>
            {/* 가입 완료 텍스트 */}
            <h2 className='text-center text-[20px] leading-[28px] font-medium text-black max-[375px]:mt-[81px] max-[375px]:text-[16px] max-[375px]:leading-[24px]'>
              가입이 완료되었습니다!
            </h2>

            {/* 확인 버튼 */}
            <button
              onClick={onClose}
              className='flex h-[48px] w-[240px] items-center justify-center rounded-lg bg-[#5534DA] text-[16px] leading-[24px] font-semibold text-white transition-colors duration-200 hover:bg-[#4A2BC7] focus:ring-2 focus:ring-[#5534DA] focus:ring-offset-2 focus:outline-none max-[375px]:mt-[50px] max-[375px]:h-[42px] max-[375px]:w-[138px] max-[375px]:text-[14px] max-[375px]:leading-[20px]'
              aria-label='확인'
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
