import type { ReactNode } from 'react';

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
  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <div
      className='mobile:min-w-xs fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]'
      onClick={handleOverlayClick}
    >
      <div
        className={`scrollbar-hide max-h-[90vh] ${width} overflow-y-scroll rounded-lg bg-white p-8`}
        onClick={(e) => {
          e.stopPropagation();
        }}
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
                onClick={onCancel || onClose}
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
