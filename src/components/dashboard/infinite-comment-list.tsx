import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import type { CommentType } from '@/lib/comments/type';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import { useCallback, useState } from 'react';

interface InfiniteCommentListProps {
  /** 카드 ID */
  cardId: number;
  /** 댓글을 가져오는 함수 */
  fetchComments: (
    cardId: number,
    page: number,
    pageSize: number
  ) => Promise<{
    data: CommentType[];
    hasMore: boolean;
    totalCount?: number;
  }>;
  /** 댓글 삭제 함수 */
  onDeleteComment?: (commentId: number) => Promise<void>;
  /** 댓글 수정 함수 */
  onEditComment?: (commentId: number, content: string) => Promise<void>;
  /** 현재 사용자 ID (댓글 삭제 권한 확인용) */
  currentUserId?: number;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 댓글 새로고침 함수를 외부에서 호출할 수 있도록 ref 전달 */
  onRefreshRef?: React.MutableRefObject<(() => void) | null>;
}

export default function InfiniteCommentList({
  cardId,
  fetchComments,
  onDeleteComment,
  onEditComment,
  currentUserId,
  className,
  onRefreshRef,
}: InfiniteCommentListProps) {
  const fetchData = useCallback(
    async (page: number) => {
      return await fetchComments(cardId, page, 10); // 10개씩 로드
    },
    [cardId, fetchComments]
  );

  const {
    data: comments,
    isLoading,
    hasMore,
    error,
    ref,
    refresh,
  } = useInfiniteScroll<CommentType>({
    fetchData,
    pageSize: 10, // 10개씩 로드
    deps: [cardId], // cardId가 변경되면 댓글 새로고침
  });

  // refresh 함수를 외부에서 호출할 수 있도록 ref에 할당
  if (onRefreshRef) {
    onRefreshRef.current = () => {
      console.log('InfiniteCommentList refresh 호출됨');
      refresh();
    };
  }

  // 댓글 수정 상태
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');

  const handleDeleteComment = useCallback(
    async (commentId: number) => {
      if (!onDeleteComment) return;

      try {
        await onDeleteComment(commentId);
        await refresh(); // 댓글 삭제 후 목록 새로고침
      } catch (error) {
        console.error('댓글 삭제 실패:', error);
      }
    },
    [onDeleteComment, refresh]
  );

  const handleEditComment = useCallback(
    async (commentId: number) => {
      if (!onEditComment || !editContent.trim()) return;

      try {
        await onEditComment(commentId, editContent.trim());
        setEditingCommentId(null);
        setEditContent('');
        await refresh(); // 댓글 수정 후 목록 새로고침
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
      return dateString; // 파싱 실패하면 원본 문자열 그대로
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
          onClick={refresh}
          className='rounded bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600'
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* 댓글 목록 */}
      {comments.length > 0 ? (
        <div className='space-y-3'>
          {comments.map((comment) => (
            <div
              key={comment.id}
              className='flex gap-3 rounded-lg bg-gray-50 p-3'
            >
              {/* 프로필 이미지 */}
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

              {/* 댓글 내용 */}
              <div className='min-w-0 flex-1'>
                <div className='mb-1 flex items-center gap-2'>
                  <span className='text-sm font-medium text-gray-900'>
                    {comment.author.nickname}
                  </span>
                  <span className='text-xs text-gray-500'>
                    {formatDate(comment.createdAt)}
                  </span>
                </div>

                {/* 수정 모드가 아닌 경우 */}
                {editingCommentId !== comment.id ? (
                  <>
                    <p className='text-sm whitespace-pre-wrap text-gray-700'>
                      {comment.content}
                    </p>

                    {/* 수정/삭제 버튼 - 모든 댓글에 표시 */}
                    <div className='mt-2 flex gap-3'>
                      {onEditComment && (
                        <button
                          onClick={() => startEdit(comment)}
                          className='text-xs text-gray-500 underline hover:text-gray-700'
                        >
                          수정
                        </button>
                      )}
                      {onDeleteComment && (
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className='text-xs text-gray-500 underline hover:text-gray-700'
                        >
                          삭제
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  /* 수정 모드인 경우 */
                  <div className='space-y-2'>
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className='w-full resize-none rounded border border-gray-300 p-2 text-sm'
                      rows={3}
                      placeholder='댓글을 수정하세요...'
                    />
                    <div className='flex gap-2'>
                      <button
                        onClick={() => handleEditComment(comment.id)}
                        className='rounded bg-blue-500 px-3 py-1 text-xs text-white hover:bg-blue-600'
                      >
                        저장
                      </button>
                      <button
                        onClick={cancelEdit}
                        className='rounded bg-gray-300 px-3 py-1 text-xs text-gray-700 hover:bg-gray-400'
                      >
                        취소
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        !isLoading && (
          <div className='py-8 text-center text-gray-500'>
            <p className='text-sm'>아직 댓글이 없습니다.</p>
          </div>
        )
      )}

      {/* 로딩 상태 */}
      {isLoading && (
        <div className='flex justify-center py-4'>
          <div className='h-6 w-6 animate-spin rounded-full border-b-2 border-blue-500'></div>
        </div>
      )}

      {/* 무한 스크롤 트리거 */}
      {hasMore && !isLoading && <div ref={ref} className='h-4' />}
    </div>
  );
}
