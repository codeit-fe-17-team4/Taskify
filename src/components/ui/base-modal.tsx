import { type ReactNode, useRef } from 'react';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  onSubmit?: () => void;
  onCancel?: () => void;
  submitText?: string;
  cancelText?: string;
  isSubmitDisabled?: boolean;
  width?: string;
  hideCancelButton?: boolean;
  errorMessage?: string;
}

export default function BaseModal({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  onCancel,
  submitText = '생성',
  cancelText = '취소',
  isSubmitDisabled = false,
  width = 'w-[40rem]',
  hideCancelButton = false,
  errorMessage,
}: BaseModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit();
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
      className='mobile:min-w-xs fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]'
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <div
        role='dialog'
        aria-modal='true'
        className={`scrollbar-hide max-h-[90vh] ${width} overflow-y-scroll rounded-lg bg-white p-8`}
      >
        <h2 className='mb-8 text-left text-2xl font-bold'>{title}</h2>

        <form onSubmit={handleSubmit}>
          <div className='space-y-6'>
            {children}

            {/* 에러 메시지 */}
            {errorMessage && (
              <div className='-mt-2 text-sm text-red-500'>{errorMessage}</div>
            )}
          </div>

          {/* 버튼들 */}
          <div className='mt-6 flex gap-3'>
            {!hideCancelButton && (
              <button
                type='button'
                className='flex-1 cursor-pointer rounded-lg border border-gray-300 py-4 text-gray-600 hover:bg-gray-50'
                onClick={onCancel ?? onClose}
              >
                {cancelText}
              </button>
            )}
            <button
              type='submit'
              disabled={isSubmitDisabled}
              className={`${hideCancelButton ? 'w-full' : 'flex-1'} cursor-pointer rounded-lg py-4 text-white ${
                isSubmitDisabled
                  ? 'cursor-not-allowed bg-gray-400'
                  : 'bg-violet hover:bg-violet-800'
              }`}
            >
              {submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
