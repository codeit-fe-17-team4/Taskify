import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import InfiniteCommentList from '@/components/dashboard/infinite-comment-list';
import type { TaskDetailModalProps } from '@/components/dashboard/type';
import ChipProfile, {
  getProfileColorByIdHash,
} from '@/components/ui/chip/chip-profile';
import ChipTag from '@/components/ui/chip/chip-tag';
import Dropdown from '@/components/ui/dropdown';
import BaseModal from '@/components/ui/modal/modal-base';
import { useModalKeyHandler } from '@/hooks/useModal';
import {
  createComment,
  deleteComment,
  editComment,
  getCommentList,
} from '@/lib/comments/api';

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
  dashboardId,
  columnId,
  onEdit,
  onDelete,
}: TaskDetailModalProps): React.ReactElement | null {
  const [newComment, setNewComment] = useState('');
  const commentRefreshRef = useRef<(() => void) | null>(null);

  // 모달이 열리거나 task가 변경될 때마다 newComment 초기화
  useEffect(() => {
    if (isOpen) {
      setNewComment('');
    }
  }, [isOpen, task?.id]);

  const handleClose = (): void => {
    setNewComment('');
    onClose();
  };

  useModalKeyHandler(isOpen, handleClose);

  /**
   * 댓글 생성 함수
   */
  const handleCommentSubmit = async () => {
    if (!newComment.trim() || !task || !dashboardId || !columnId) {
      return;
    }

    try {
      await createComment({
        content: newComment.trim(),
        cardId: Number(task.id),
        columnId: Number(columnId),
        dashboardId: Number(dashboardId),
      });

      setNewComment('');

      if (commentRefreshRef.current) {
        commentRefreshRef.current();
      }
    } catch (error) {
      // 댓글 생성 실패
    }
  };

  /**
   * 댓글 수정 함수
   */
  const handleEditComment = async (commentId: number, content: string) => {
    try {
      await editComment({
        commentId,
        body: { content },
      });

      if (commentRefreshRef.current) {
        commentRefreshRef.current();
      }
    } catch (error) {
      // 댓글 수정 실패
    }
  };

  /**
   * 댓글 삭제 함수
   */
  const handleDeleteComment = async (commentId: number) => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      try {
        await deleteComment(commentId);

        if (commentRefreshRef.current) {
          commentRefreshRef.current();
        }
      } catch (error) {
        // 댓글 삭제 실패
      }
    }
  };

  /**
   * 댓글 목록 가져오기 함수
   */
  const fetchComments = useCallback(
    async (cardId: number, cursorId?: number) => {
      try {
        const result = await getCommentList({
          cardId,
          size: 4,
          cursorId,
        });

        return {
          data: result.comments,
          nextCursorId: result.cursorId,
        };
      } catch (error) {
        return {
          data: [],
          nextCursorId: null,
        };
      }
    },
    []
  );

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
        <h2 className='text-xl font-bold'>{task.title}</h2>
        <div className='flex items-center gap-3'>
          {/* 메뉴 버튼 */}
          <div className='relative'>
            <Dropdown>
              <Dropdown.Toggle>
                <div className='flex-center h-8 w-8 rounded hover:bg-gray-100'>
                  <Image
                    src='/dashboard/menu-icon.svg'
                    alt='메뉴'
                    width={28}
                    height={28}
                  />
                </div>
              </Dropdown.Toggle>
              <Dropdown.List additionalClassName='w-24 top-full mt-1 -left-16'>
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
                {task.description || '설명이 없습니다.'}
              </p>
            </div>

            {task.imageUrl &&
              task.imageUrl.trim() !== '' &&
              !(
                JSON.parse(
                  localStorage.getItem('deletedImageCards') || '[]'
                ) as string[]
              ).includes(task.id) && (
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
                  color={getProfileColorByIdHash(Number(task.manager.id))}
                  size='md'
                  profileImageUrl={task.manager.profileImageUrl}
                  label={
                    typeof task.manager.nickname === 'string'
                      ? task.manager.nickname.slice(0, 1)
                      : ''
                  }
                />
                <span className='text-sm font-medium'>{task.manager.name}</span>
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
            onKeyDown={(e) => {
              if (e.key !== 'Enter' || e.shiftKey) {
                return;
              }
              e.preventDefault();
              handleCommentSubmit();
            }}
          />
          <button
            disabled={!newComment.trim()}
            className={`absolute right-4 bottom-4 rounded-lg border px-6 py-2 text-sm font-medium ${
              newComment.trim()
                ? 'text-violet cursor-pointer border-gray-300 bg-white hover:bg-gray-50'
                : 'cursor-not-allowed border-gray-200 bg-gray-50 text-gray-400'
            }`}
            onClick={handleCommentSubmit}
          >
            입력
          </button>
        </div>

        {/* 댓글 목록 */}
        <div className='mt-6'>
          <InfiniteCommentList
            cardId={Number(task.id)}
            fetchComments={fetchComments}
            onEditComment={handleEditComment}
            onDeleteComment={handleDeleteComment}
            onRefreshRef={commentRefreshRef}
          />
        </div>
      </div>
    </BaseModal>
  );
}
