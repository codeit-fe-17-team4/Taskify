import Button from '@/components/ui/button/button';
import BaseModal from '@/components/ui/modal/modal-base';
import type { ButtonModalProps } from '@/components/ui/type';

export default function ButtonModal({
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
}: ButtonModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <BaseModal isOpen={isOpen} width={width} onClose={onClose}>
      <div>
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
              <Button
                variant='modal'
                backgroundColor='white'
                label={cancelText}
                labelColor='gray'
                onClick={onCancel ?? onClose}
              />
            )}
            <Button
              variant='modal'
              backgroundColor='violet'
              label={submitText}
              disabled={isSubmitDisabled}
            />
          </div>
        </form>
      </div>
    </BaseModal>
  );
}
