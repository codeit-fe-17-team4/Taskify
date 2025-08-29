import { useState, useEffect } from 'react';
import BaseModal from '../ui/base-modal';
import CreateTaskForm, { FormData } from './create-task-form';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskData: FormData) => void;
}

export default function CreateTaskModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateTaskModalProps) {
  const [formData, setFormData] = useState<FormData>({
    assignee: '',
    title: '',
    description: '',
    dueDate: '',
    tags: [],
    imageFile: null,
  });

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = () => {
    onSubmit(formData);
    handleClose();
  };

  const handleClose = () => {
    // 폼 데이터 초기화
    setFormData({
      assignee: '',
      title: '',
      description: '',
      dueDate: '',
      tags: [],
      imageFile: null,
    });
    onClose();
  };

  const isSubmitDisabled =
    !formData.title.trim() || !formData.description.trim();

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      title='할 일 생성'
      onSubmit={handleSubmit}
      submitText='생성'
      cancelText='취소'
      isSubmitDisabled={isSubmitDisabled}
    >
      <CreateTaskForm formData={formData} setFormData={setFormData} />
    </BaseModal>
  );
}
