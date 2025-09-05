import { useState } from 'react';
import CreateTaskForm from '@/components/dashboard/create-task-form';
import type { CreateTaskFormData } from '@/components/dashboard/type';
import BaseModal from '@/components/ui/modal/modal-base';
import { useModalKeyHandler } from '@/hooks/useModal';
import type { UserType } from '@/lib/users/type';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskData: CreateTaskFormData) => void;
  userInfo: UserType | null;
}

export default function CreateTaskModal({
  isOpen,
  onClose,
  onSubmit,
  userInfo,
}: CreateTaskModalProps) {
  const [formData, setFormData] = useState<CreateTaskFormData>({
    assignee: '',
    title: '',
    description: '',
    dueDate: '',
    tags: [],
    imageFile: null,
  });

  const handleClose = () => {
    console.log('CreateTaskModal handleClose called');
    setFormData({
      assignee: '',
      title: '',
      description: '',
      dueDate: '',
      tags: [],
      imageFile: null,
    });
    console.log('Calling onClose');
    onClose();
  };

  useModalKeyHandler(isOpen, handleClose);

  const handleSubmit = () => {
    console.log('CreateTaskModal handleSubmit called');
    onSubmit(formData);
    console.log('Calling handleClose');
    handleClose();
  };

  const isSubmitDisabled =
    !formData.title.trim() || !formData.description.trim();

  return (
    <BaseModal
      isOpen={isOpen}
      title='할 일 생성'
      submitText='생성'
      cancelText='취소'
      isSubmitDisabled={isSubmitDisabled}
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <CreateTaskForm
        formData={formData}
        setFormData={setFormData}
        userInfo={userInfo}
      />
    </BaseModal>
  );
}
