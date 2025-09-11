import Image from 'next/image';
import { useState } from 'react';
import type {
  CommentType,
  TaskDetailModalProps,
} from '@/components/dashboard/type';
import ChipProfile from '@/components/ui/chip/chip-profile';
import ChipTag from '@/components/ui/chip/chip-tag';
import Dropdown from '@/components/ui/dropdown';
import BaseModal from '@/components/ui/modal/modal-base';
import { useTheme } from '@/contexts/ThemeContext';
import { useModalKeyHandler } from '@/hooks/useModal';
import { getProfileColor } from '@/utils/profile-color';

const formatDueDate = (dueDate: string) => {
  if (!dueDate) {
    return '';
  }

  const date = new Date(dueDate);
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export default function TaskDetailModal({
  isOpen,
  onClose,
  task,
  columnTitle,
  currentUser,
  onEdit,
  onDelete,
}: TaskDetailModalProps): React.ReactElement | null {
  const { theme } = useTheme();
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const [comments, setComments] = useState<CommentType[]>([]);

  const DARK_TEXT_COLOR = '#d6d5d9';
  const LIGHT_TEXT_COLOR = 'text-gray-900';
  const DARK_TEXT_COLOR_CLASS = 'text-[#d6d5d9]';
  const LIGHT_GRAY_700 = 'text-gray-700';
  const LIGHT_GRAY_500 = 'text-gray-500';
  const handleClose = (): void => {
    setNewComment('');
    setEditingCommentId(null);
    setEditingContent('');
    onClose();
  };

  useModalKeyHandler(isOpen, handleClose);

  const handleCommentSubmit = () => {
    if (!newComment.trim()) {
      return;
    }

    const newCommentObj: CommentType = {
      id: `comment_${String(Date.now())}_${Math.random().toString(36).slice(2, 11)}`,
      content: newComment.trim(),
      author: {
        id: currentUser?.id || 'current-user',
        name: currentUser?.name || '사용자',
        profileColor: currentUser?.profileColor || '#8B5CF6',
      },
      createdAt: new Date()
        .toLocaleString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        })
        .replaceAll('.', '.')
        .replaceAll(',', ''),
    };

    setComments((prev) => [...prev, newCommentObj]);
    setNewComment('');
  };

  const handleEditComment = (commentId: string, content: string) => {
    setEditingCommentId(commentId);
    setEditingContent(content);
  };

  const handleUpdateComment = () => {
    if (!editingCommentId || !editingContent.trim()) {
      return;
    }

    setComments((prev) => {
      return prev.map((comment) => {
        return comment.id === editingCommentId
          ? { ...comment, content: editingContent.trim() }
          : comment;
      });
    });
    setEditingCommentId(null);
    setEditingContent('');
  };

  const handleDeleteComment = (commentId: string) => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingContent('');
  };

  const handleEdit = () => {
    if (!task || !onEdit) {
      return;
    }
    onEdit(task);
    handleClose();
  };

  const handleDelete = () => {
    if (!task || !onDelete) {
      return;
    }
    onDelete(task.id);
    handleClose();
  };

  if (!isOpen || !task) {
    return null;
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      {/* 헤더 */}
      <div className='flex items-center justify-between p-6'>
        <h2
          className={`text-xl font-bold ${
            theme === 'dark' ? `text-[${DARK_TEXT_COLOR}]` : LIGHT_TEXT_COLOR
          }`}
        >
          {task.title}
        </h2>
        <div className='flex items-center gap-3'>
          {/* 메뉴 버튼 */}
          <Dropdown>
            <Dropdown.Toggle>
              <div className='flex-center h-8 w-8 rounded hover:bg-gray-100'>
                <Image
                  alt='메뉴'
                  width={28}
                  height={28}
                  src={
                    theme === 'dark'
                      ? '/darkauth/icon/menu-icon.svg'
                      : '/dashboard/menu-icon.svg'
                  }
                />
              </div>
            </Dropdown.Toggle>
            <Dropdown.List additionalClassName='w-24 top-1 -left-16'>
              <Dropdown.Item
                additionalClassName='justify-center py-1'
                onClick={handleEdit}
              >
                <div className='text-sm'>수정하기</div>
              </Dropdown.Item>
              <Dropdown.Item
                additionalClassName='justify-center py-1'
                onClick={handleDelete}
              >
                <div className='text-sm'>삭제하기</div>
              </Dropdown.Item>
            </Dropdown.List>
          </Dropdown>
          {/* 닫기 버튼 */}
          <button
            className='flex h-8 w-8 cursor-pointer items-center justify-center rounded hover:bg-gray-100'
            onClick={handleClose}
          >
            <Image
              alt='닫기'
              width={28}
              height={28}
              src={
                theme === 'dark'
                  ? '/darkauth/icon/close-icon.svg'
                  : '/dashboard/close-icon.svg'
              }
            />
          </button>
        </div>
      </div>

      {/* 카테고리와 태그 */}
      <div className='px-6 pb-6'>
        <div className='flex flex-wrap items-center gap-2'>
          <span className='bg-violet-light text-violet flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium'>
            <span className='bg-violet h-2 w-2 rounded-full' />
            {columnTitle || 'To Do'}
          </span>

          {task.tags.length > 0 && (
            <>
              <div className='h-4 w-px bg-gray-300' />
              {task.tags.map((tag) => {
                return (
                  <ChipTag
                    key={tag.label}
                    label={tag.label}
                    size='md'
                    color={tag.color}
                  />
                );
              })}
            </>
          )}
        </div>
      </div>

      {/* 본문 */}
      <div className='px-6 pb-6'>
        <div className='flex gap-6'>
          <div className='flex-1 space-y-6'>
            <div>
              <p
                className={`leading-relaxed ${
                  theme === 'dark' ? DARK_TEXT_COLOR_CLASS : LIGHT_GRAY_700
                }`}
              >
                {task.description ||
                  'Lorem Ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum finibus nibh arcu, quis consequat ante cursus eget. Cras mattis, nulla non laceret porttitor, diam justo laceret eros, vel aliquet diam elit sit et leo.'}
              </p>
            </div>

            {task.imageUrl && (
              <div>
                <Image
                  src={task.imageUrl}
                  alt='할일 이미지'
                  width={400}
                  height={240}
                  className='w-full rounded-lg object-cover'
                />
              </div>
            )}
          </div>

          <div
            className={`flex w-52 flex-col gap-6 self-start rounded-lg border p-4 ${
              theme === 'dark' ? 'border-[#524f5b]' : 'border-gray-300'
            }`}
          >
            <div>
              <span
                className={`mb-2 block text-sm font-bold ${
                  theme === 'dark'
                    ? `text-[${DARK_TEXT_COLOR}]`
                    : LIGHT_TEXT_COLOR
                }`}
              >
                담당자
              </span>
              <div className='flex items-center gap-2'>
                <ChipProfile
                  color={getProfileColor(task.manager.profileColor)}
                  size='md'
                  label={
                    typeof task.manager.nickname === 'string'
                      ? task.manager.nickname.slice(0, 1)
                      : ''
                  }
                />
                <span
                  className={`text-sm font-medium ${
                    theme === 'dark'
                      ? `text-[${DARK_TEXT_COLOR}]`
                      : LIGHT_TEXT_COLOR
                  }`}
                >
                  {task.manager.name}
                </span>
              </div>
            </div>

            {task.dueDate && (
              <div>
                <span
                  className={`mb-2 block text-sm font-bold ${
                    theme === 'dark'
                      ? `text-[${DARK_TEXT_COLOR}]`
                      : LIGHT_TEXT_COLOR
                  }`}
                >
                  마감일
                </span>
                <p
                  className={`text-sm font-medium ${
                    theme === 'dark'
                      ? `text-[${DARK_TEXT_COLOR}]`
                      : LIGHT_TEXT_COLOR
                  }`}
                >
                  {formatDueDate(task.dueDate)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 댓글 섹션 */}
      <div className='px-6 pt-6 pb-6'>
        <h3
          className={`mb-4 text-lg font-medium ${
            theme === 'dark' ? `text-[${DARK_TEXT_COLOR}]` : LIGHT_TEXT_COLOR
          }`}
        >
          댓글
        </h3>

        <div className='relative'>
          <textarea
            placeholder='댓글 작성하기'
            rows={3}
            value={newComment}
            className={`w-full resize-none overflow-hidden rounded-lg border p-4 pr-20 focus:outline-none ${
              theme === 'dark'
                ? 'border-[#524f5b] bg-[#201f23] text-white placeholder:text-gray-400 focus:border-green-500'
                : 'focus:border-violet border-gray-300 bg-white text-gray-900 placeholder:text-gray-500'
            }`}
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
          />
          <button
            className={`absolute right-4 bottom-4 cursor-pointer rounded-lg border px-3 py-2 text-sm font-medium ${
              theme === 'dark'
                ? 'border-[#524f5b] bg-[#201f23] text-green-400 hover:bg-[#2a2930]'
                : 'text-violet border-gray-300 bg-white hover:bg-gray-50'
            }`}
            onClick={handleCommentSubmit}
          >
            입력
          </button>
        </div>

        {/* 댓글 목록 */}
        {comments.length > 0 && (
          <div className='mt-6 space-y-6'>
            {comments.map((comment) => {
              return (
                <div key={comment.id} className='flex gap-3'>
                  <ChipProfile
                    label={(comment.author.name || '').slice(0, 1)}
                    color={getProfileColor(comment.author.profileColor)}
                    size='md'
                  />
                  <div className='flex-1'>
                    <div className='mb-1 flex items-center gap-2'>
                      <span
                        className={`text-sm font-medium ${
                          theme === 'dark' ? 'text-[#d6d5d9]' : 'text-gray-900'
                        }`}
                      >
                        {comment.author.name}
                      </span>
                      <span
                        className={`text-xs ${
                          theme === 'dark'
                            ? DARK_TEXT_COLOR_CLASS
                            : LIGHT_GRAY_500
                        }`}
                      >
                        {comment.createdAt}
                      </span>
                    </div>

                    {editingCommentId === comment.id ? (
                      <div className='space-y-3'>
                        <textarea
                          value={editingContent}
                          rows={3}
                          className={`w-full resize-none rounded-lg border p-3 text-sm focus:outline-none ${
                            theme === 'dark'
                              ? 'border-[#524f5b] bg-[#201f23] text-white placeholder:text-gray-400 focus:border-green-500'
                              : 'focus:border-violet border-gray-300 bg-white text-gray-900 placeholder:text-gray-500'
                          }`}
                          onChange={(e) => {
                            setEditingContent(e.target.value);
                          }}
                        />
                        <div className='flex gap-3'>
                          <button
                            className={`cursor-pointer text-xs underline ${
                              theme === 'dark'
                                ? DARK_TEXT_COLOR_CLASS
                                : LIGHT_GRAY_500
                            }`}
                            onClick={handleUpdateComment}
                          >
                            저장
                          </button>
                          <button
                            className={`cursor-pointer text-xs underline ${
                              theme === 'dark'
                                ? DARK_TEXT_COLOR_CLASS
                                : LIGHT_GRAY_500
                            }`}
                            onClick={handleCancelEdit}
                          >
                            취소
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p
                          className={`text-sm ${
                            theme === 'dark'
                              ? DARK_TEXT_COLOR_CLASS
                              : LIGHT_GRAY_700
                          }`}
                        >
                          {comment.content}
                        </p>
                        <div className='mt-2 flex gap-3'>
                          <button
                            className={`cursor-pointer text-xs underline ${
                              theme === 'dark'
                                ? DARK_TEXT_COLOR_CLASS
                                : LIGHT_GRAY_500
                            }`}
                            onClick={() => {
                              handleEditComment(comment.id, comment.content);
                            }}
                          >
                            수정
                          </button>
                          <button
                            className={`cursor-pointer text-xs underline ${
                              theme === 'dark'
                                ? DARK_TEXT_COLOR_CLASS
                                : LIGHT_GRAY_500
                            }`}
                            onClick={() => {
                              handleDeleteComment(comment.id);
                            }}
                          >
                            삭제
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </BaseModal>
  );
}
