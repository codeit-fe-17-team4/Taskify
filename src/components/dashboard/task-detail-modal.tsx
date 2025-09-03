import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import ChipProfile from '@/components/ui/chip/chip-profile';
import ChipState from '@/components/ui/chip/chip-state';
import ChipTag from '@/components/ui/chip/chip-tag';
import { useModalKeyHandler } from '@/hooks/useModal';
import type { CommentType, TaskDetailModalProps } from './type';

// 임시 댓글 데이터
const mockComments: CommentType[] = [
  {
    id: '1',
    content: '오늘안에 CCC 까지 만들 수 있을까요?',
    author: {
      id: '1',
      name: '정만철',
      profileColor: '#FEF3C7',
    },
    createdAt: '2022.12.27 14:00',
  },
];

const getTagColor = (color: string): 'blue' | 'pink' | 'green' | 'brown' => {
  switch (color) {
    case 'orange': {
      return 'brown';
    }
    case 'green': {
      return 'green';
    }
    case 'blue': {
      return 'blue';
    }
    case 'red': {
      return 'pink';
    }
    case 'purple': {
      return 'pink';
    }
    default: {
      return 'blue';
    }
  }
};

export default function TaskDetailModal({
  isOpen,
  onClose,
  task,
  onEdit,
  onDelete,
}: TaskDetailModalProps) {
  const [newComment, setNewComment] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setNewComment('');
    setIsMenuOpen(false);
    setEditingCommentId(null);
    setEditingContent('');
    onClose();
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  useModalKeyHandler(isOpen, handleClose);

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      console.log('New comment:', newComment);
      setNewComment('');
    }
  };

  const handleEditComment = (commentId: string, content: string) => {
    setEditingCommentId(commentId);
    setEditingContent(content);
  };

  const handleSaveComment = () => {
    if (editingContent.trim()) {
      console.log('Save comment:', editingCommentId, editingContent);
      setEditingCommentId(null);
      setEditingContent('');
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingContent('');
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleEdit = () => {
    if (task && onEdit) {
      onEdit(task);
      handleClose();
    }
  };

  const handleDelete = () => {
    if (task && onDelete) {
      onDelete(task.id);
      handleClose();
    }
  };

  if (!isOpen || !task) {
    return null;
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.7)]'
      onClick={handleOverlayClick}
    >
      <div
        className='scrollbar-hide max-h-[90vh] w-[40rem] overflow-y-scroll rounded-lg bg-white'
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* 헤더 */}
        <div className='flex items-center justify-between p-6'>
          <h2 className='text-xl font-bold'>{task.title}</h2>
          <div className='flex items-center gap-3'>
            {/* 메뉴 버튼 */}
            <div className='relative' ref={menuRef}>
              <button
                className='flex h-8 w-8 cursor-pointer items-center justify-center rounded hover:bg-gray-100'
                onClick={handleMenuToggle}
              >
                <Image
                  src='/dashboard/menu-icon.svg'
                  alt='메뉴'
                  width={28}
                  height={28}
                />
              </button>

              {/* 드롭다운 메뉴 */}
              {isMenuOpen && (
                <div
                  className='absolute top-10 right-0 z-10 w-24 rounded-lg border border-gray-200 bg-white p-1'
                  style={{ boxShadow: '0 .4rem 2rem 0 rgba(0, 0, 0, .08)' }}
                >
                  <button
                    className='hover:bg-violet-light hover:text-violet w-full cursor-pointer rounded-md px-3 py-2 text-center text-sm'
                    onClick={handleEdit}
                  >
                    수정하기
                  </button>
                  <button
                    className='hover:bg-violet-light hover:text-violet w-full cursor-pointer rounded-md px-3 py-2 text-center text-sm'
                    onClick={handleDelete}
                  >
                    삭제하기
                  </button>
                </div>
              )}
            </div>

            {/* 닫기 버튼 */}
            <button
              className='flex h-8 w-8 cursor-pointer items-center justify-center rounded hover:bg-gray-100'
              onClick={handleClose}
            >
              <Image
                src='/dashboard/close-icon.svg'
                alt='닫기'
                width={28}
                height={28}
              />
            </button>
          </div>
        </div>

        {/* 카테고리와 태그 */}
        <div className='px-6 pb-6'>
          <div className='flex flex-wrap items-center gap-2'>
            <ChipState label='To Do' size='md' />

            {task.tags.length > 0 && (
              <div className='h-4 w-px bg-gray-300'></div>
            )}

            {task.tags.length > 0 && (
              <>
                {task.tags.map((tag, index) => {
                  return (
                    <ChipTag
                      key={index}
                      label={tag.label}
                      color={getTagColor(tag.color)}
                      size='md'
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
                <p className='leading-relaxed text-gray-700'>
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
              className='w-52 self-start rounded-lg border border-gray-300 p-4'
              style={{
                gap: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div>
                <span className='mb-2 block text-sm font-bold'>담당자</span>
                <div className='flex items-center gap-2'>
                  <ChipProfile
                    label={task.manager.nickname.slice(0, 2)}
                    size='md'
                    color='green'
                  />
                  <span className='text-sm font-medium'>
                    {task.manager.name}
                  </span>
                </div>
              </div>

              {task.dueDate && (
                <div>
                  <span className='mb-2 block text-sm font-bold'>마감일</span>
                  <p className='text-sm font-medium'>{task.dueDate}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 댓글 섹션 */}
        <div className='px-6 pt-6 pb-6'>
          <h3 className='mb-4 text-lg font-medium'>댓글</h3>

          <div className='relative mb-6'>
            <textarea
              placeholder='댓글 작성하기'
              rows={3}
              className='w-full resize-none rounded-lg border border-gray-300 p-4 pr-20 focus:outline-none'
              value={newComment}
              onChange={(e) => {
                setNewComment(e.target.value);
              }}
            />
            <button
              className='absolute right-4 bottom-4 cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-indigo-600 hover:bg-gray-50'
              onClick={handleCommentSubmit}
            >
              입력
            </button>
          </div>

          {/* 댓글 목록 */}
          <div className='space-y-4'>
            {mockComments.map((comment) => {
              return (
                <div key={comment.id} className='flex gap-3'>
                  <ChipProfile
                    label={comment.author.name.slice(0, 2)}
                    size='md'
                    color='brown'
                  />
                  <div className='flex-1'>
                    <div className='mb-1 flex items-center gap-2'>
                      <span className='text-sm font-medium'>
                        {comment.author.name}
                      </span>
                      <span className='text-xs text-gray-500'>
                        {comment.createdAt}
                      </span>
                    </div>

                    {editingCommentId === comment.id ? (
                      <div className='space-y-3'>
                        <textarea
                          value={editingContent}
                          className='w-full resize-none rounded-lg border border-gray-300 p-3 text-sm focus:outline-none'
                          rows={3}
                          onChange={(e) => {
                            setEditingContent(e.target.value);
                          }}
                        />
                        <div className='flex gap-3'>
                          <button
                            className='cursor-pointer text-xs text-gray-500 underline'
                            onClick={handleSaveComment}
                          >
                            저장
                          </button>
                          <button
                            className='cursor-pointer text-xs text-gray-500 underline'
                            onClick={handleCancelEdit}
                          >
                            취소
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className='text-sm text-gray-700'>
                          {comment.content}
                        </p>
                        <div className='mt-2 flex gap-3'>
                          <button
                            className='cursor-pointer text-xs text-gray-500 underline'
                            onClick={() => {
                              handleEditComment(comment.id, comment.content);
                            }}
                          >
                            수정
                          </button>
                          <button className='cursor-pointer text-xs text-gray-500 underline'>
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
        </div>
      </div>
    </div>
  );
}
