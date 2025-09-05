import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type {
  CommentType,
  TaskDetailModalProps,
} from '@/components/dashboard/type';
import ChipProfile from '@/components/ui/chip/chip-profile';
import ChipTag from '@/components/ui/chip/chip-tag';
import Dropdown from '@/components/ui/dropdown';
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
  const [newComment, setNewComment] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const [comments, setComments] = useState<CommentType[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const handleClose = (): void => {
    setNewComment('');
    setIsMenuOpen(false);
    setEditingCommentId(null);
    setEditingContent('');
    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

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

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
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

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (!overlayRef.current) {
      return;
    }
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.7)]'
      role='button'
      aria-label='모달 오버레이: 클릭하면 모달이 종료됩니다.'
      tabIndex={0}
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <div
        className='scrollbar-hide max-h-[90vh] w-[40rem] overflow-y-scroll rounded-lg bg-white'
        role='dialog'
        aria-modal='true'
      >
        {/* 헤더 */}
        <div className='flex items-center justify-between p-6'>
          <h2 className='text-xl font-bold'>{task.title}</h2>
          <div className='flex items-center gap-3'>
            {/* 메뉴 버튼 */}
            <Dropdown>
              <Dropdown.Toggle onClick={handleMenuToggle}>
                <div className='flex-center h-8 w-8 rounded hover:bg-gray-100'>
                  <Image
                    src='/dashboard/menu-icon.svg'
                    alt='메뉴'
                    width={28}
                    height={28}
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

            <div className='flex w-52 flex-col gap-6 self-start rounded-lg border border-gray-300 p-4'>
              <div>
                <span className='mb-2 block text-sm font-bold'>담당자</span>
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
                  <span className='text-sm font-medium'>
                    {task.manager.name}
                  </span>
                </div>
              </div>

              {task.dueDate && (
                <div>
                  <span className='mb-2 block text-sm font-bold'>마감일</span>
                  <p className='text-sm font-medium'>
                    {formatDueDate(task.dueDate)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 댓글 섹션 */}
        <div className='px-6 pt-6 pb-6'>
          <h3 className='mb-4 text-lg font-medium'>댓글</h3>

          <div className='relative'>
            <textarea
              placeholder='댓글 작성하기'
              rows={3}
              className='focus:border-violet w-full resize-none overflow-hidden rounded-lg border border-gray-300 p-4 pr-20 focus:outline-none'
              value={newComment}
              onChange={(e) => {
                setNewComment(e.target.value);
              }}
            />
            <button
              className='text-violet absolute right-4 bottom-4 cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium hover:bg-gray-50'
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
                            className='focus:border-violet w-full resize-none rounded-lg border border-gray-300 p-3 text-sm focus:outline-none'
                            rows={3}
                            onChange={(e) => {
                              setEditingContent(e.target.value);
                            }}
                          />
                          <div className='flex gap-3'>
                            <button
                              className='cursor-pointer text-xs text-gray-500 underline'
                              onClick={handleUpdateComment}
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
                            <button
                              className='cursor-pointer text-xs text-gray-500 underline'
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
      </div>
    </div>
  );
}
