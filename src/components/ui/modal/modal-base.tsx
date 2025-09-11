import { type ReactNode, useRef } from 'react';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: string;
}

export default function BaseModal({
  isOpen,
  onClose,
  children,
  width = 'w-[40rem]',
}: BaseModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      role='button'
      aria-label='모달 오버레이: 클릭하면 모달이 종료됩니다.'
      tabIndex={0}
      className='flex-center mobile:min-w-xs fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]'
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <div
        role='dialog'
        aria-modal='true'
        className={`scrollbar-hide max-h-[90vh] ${width} overflow-y-scroll rounded-lg bg-[var(--auth-input-bg)] p-8`}
      >
        {children}
      </div>
    </div>
  );
}
