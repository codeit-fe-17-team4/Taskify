import Image from 'next/image';
import { useCallback, useState } from 'react';
import { useCursorInfiniteScroll } from '@/hooks/useCursorInfiniteScroll';
import type { CommentType } from '@/lib/comments/type';
import { cn } from '@/utils/cn';

interface InfiniteCommentListProps {
  cardId: number;
  fetchComments: (
    cardId: number,
    cursorId?: number
  ) => Promise<{
    data: CommentType[];
    nextCursorId: number | null;
  }>;
  onDeleteComment?: (commentId: number) => Promise<void>;
  onEditComment?: (commentId: number, content: string) => Promise<void>;
  className?: string;
  onRefreshRef?: React.RefObject<(() => void) | null>;
}

export default function InfiniteCommentList({
  cardId,
  fetchComments,
  onDeleteComment,
  onEditComment,
  className,
  onRefreshRef,
}: InfiniteCommentListProps) {
  const fetchData = useCallback(
    async (cursorId?: number) => fetchComments(cardId, cursorId),
    [cardId, fetchComments]
  );

  const {
    data: comments,
    isLoading,
    hasMore,
    error,
    ref,
    refresh,
  } = useCursorInfiniteScroll<CommentType>({
    fetchData,
    deps: [cardId],
  });

  if (onRefreshRef) {
    onRefreshRef.current = () => {
      refresh();
    };
  }

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');

  const handleDeleteComment = useCallback(
    async (commentId: number) => {
      if (!onDeleteComment) {
        return;
      }

      try {
        await onDeleteComment(commentId);
        await refresh();
      } catch (error) {
        console.error('댓글 삭제 실패:', error);
      }
    },
    [onDeleteComment, refresh]
  );

  const handleEditComment = useCallback(
    async (commentId: number) => {
      if (!onEditComment || !editContent.trim()) {
        return;
      }

      try {
        await onEditComment(commentId, editContent.trim());
        setEditingCommentId(null);
        setEditContent('');
        await refresh();
      } catch (error) {
        console.error('댓글 수정 실패:', error);
      }
    },
    [onEditComment, editContent, refresh]
  );

  const startEdit = useCallback((comment: CommentType) => {
    setEditingCommentId(comment.id);
    setEditContent(comment.content);
  }, []);

  const cancelEdit = useCallback(() => {
    setEditingCommentId(null);
    setEditContent('');
  }, []);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);

      return date.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  if (error) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center p-4',
          className
        )}
      >
        <p className='mb-2 text-sm text-red-500'>
          댓글을 불러오는 중 오류가 발생했습니다.
        </p>
        <button
          className='rounded bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600'
          onClick={refresh}
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {comments.length > 0 ? (
        <div className='space-y-6'>
          {comments.map((comment) => {
            return (
              <div key={comment.id} className='flex gap-3'>
                <div className='flex-shrink-0'>
                  <div className='h-8 w-8 overflow-hidden rounded-full bg-gray-300'>
                    {comment.author.profileImageUrl ? (
                      <Image
                        src={comment.author.profileImageUrl}
                        alt={comment.author.nickname}
                        width={32}
                        height={32}
                        className='h-full w-full object-cover'
                      />
                    ) : (
                      <div className='flex h-full w-full items-center justify-center bg-gray-400 text-sm font-medium text-white'>
                        {comment.author.nickname.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>

                <div className='min-w-0 flex-1'>
                  <div className='mb-1 flex items-center gap-2'>
                    <span className='text-black-2 text-sm font-semibold'>
                      {comment.author.nickname}
                    </span>
                    <span className='text-gray-2 text-xs'>
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>

                  {editingCommentId !== comment.id ? (
                    <>
                      <p className='text-black-2 text-sm whitespace-pre-wrap'>
                        {comment.content}
                      </p>

                      <div className='mt-2 flex gap-3'>
                        {onEditComment && (
                          <button
                            className='text-gray-2 text-xs underline'
                            onClick={() => {
                              startEdit(comment);
                            }}
                          >
                            수정
                          </button>
                        )}
                        {onDeleteComment && (
                          <button
                            className='text-gray-2 text-xs underline'
                            onClick={() => {
                              handleDeleteComment(comment.id);
                            }}
                          >
                            삭제
                          </button>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className='space-y-2'>
                      <textarea
                        className='w-full resize-none rounded border border-gray-300 p-2 text-sm'
                        rows={3}
                        placeholder='댓글을 수정하세요...'
                        value={editContent}
                        onChange={(e) => {
                          setEditContent(e.target.value);
                        }}
                      />
                      <div className='flex gap-3'>
                        <button
                          className='text-gray-2 text-xs underline'
                          onClick={() => {
                            handleEditComment(comment.id);
                          }}
                        >
                          저장
                        </button>
                        <button
                          className='text-gray-2 text-xs underline'
                          onClick={() => {
                            cancelEdit();
                          }}
                        >
                          취소
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        !isLoading && (
          <div className='py-8 text-center text-gray-500'>
            <p className='text-sm'>아직 댓글이 없습니다.</p>
          </div>
        )
      )}

      {isLoading && (
        <div className='flex justify-center py-4'>
          <div className='h-6 w-6 animate-spin rounded-full border-b-2 border-blue-500'></div>
        </div>
      )}

      {hasMore && !isLoading && <div ref={ref} className='h-4' />}
    </div>
  );
}
