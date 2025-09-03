import type { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  type ReactElement,
  type ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import BackButton from '@/components/auth/back-button';
import UnifiedModal from '@/components/auth/UnifiedModal';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { BASE_API_URL } from '@/lib/constants';
import type { UserType } from '@/lib/users/type';
import styles from '@/styles/auth-variables.module.css';

interface MyPageProps {
  isAuthenticated: boolean;
  userInfo: UserType | null;
  accessToken: string;
}

export default function MyPage({
  isAuthenticated,
  userInfo: initialUserInfo,
  accessToken,
}: MyPageProps): ReactElement {
  const router = useRouter();

  // 사용자 정보 상태
  const [userInfo, setUserInfo] = useState<UserType | null>(initialUserInfo);
  const [nickname, setNickname] = useState(initialUserInfo?.nickname || '');
  const [isLoading, setIsLoading] = useState(false);

  // 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState<'success' | 'error'>('success');

  // 모달 열기 헬퍼 함수
  const showModal = useCallback(
    ({
      message,
      type = 'success',
    }: {
      message: string;
      type?: 'success' | 'error';
    }) => {
      setModalMessage(message);
      setModalType(type);
      setIsModalOpen(true);
    },
    []
  );

  // 모달 닫기 함수
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // API 호출 헬퍼 함수
  const apiCall = useCallback(
    async ({ url, options = {} }: { url: string; options?: RequestInit }) => {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
          ...(options.headers as Record<string, string>),
        },
      });

      if (!response.ok) {
        const errorText = await response.text();

        throw new Error(`[${String(response.status)}] ${errorText}`);
      }

      // 응답이 비어있을 수 있는 경우 처리
      const contentType = response.headers.get('content-type');

      if (contentType?.includes('application/json')) {
        const text = await response.text();

        return text ? (JSON.parse(text) as unknown) : null;
      }

      return null;
    },
    [accessToken]
  );

  // 비밀번호 변경 폼 상태
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 인증되지 않은 경우 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  // 프로필 이미지 업로드 핸들러
  const handleImageUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (!file) {
        return;
      }

      try {
        setIsLoading(true);

        // FormData 생성
        const formData = new FormData();

        formData.append('image', file);

        // 프로필 이미지 업로드
        const response = await fetch(`${BASE_API_URL}/users/me/image`, {
          method: 'POST',
          headers: {
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
          },
          body: formData,
        });

        if (!response.ok) {
          const errorText = await response.text();

          throw new Error(`[${String(response.status)}] ${errorText}`);
        }

        const result = await response.json();

        // 사용자 정보 업데이트
        if (userInfo) {
          const updatedUserInfo = {
            ...userInfo,
            profileImageUrl: (result as { profileImageUrl: string })
              .profileImageUrl,
          };

          setUserInfo(updatedUserInfo);
        }
      } catch {
        showModal({ message: '이미지 업로드에 실패했습니다.', type: 'error' });
      } finally {
        setIsLoading(false);
      }
    },
    [accessToken, userInfo, showModal]
  );

  // 닉네임 수정 핸들러
  const handleUpdateNickname = useCallback(async () => {
    if (!userInfo || !nickname.trim()) {
      return;
    }

    // 닉네임 길이 검증 (10자 이하)
    if (nickname.trim().length > 10) {
      showModal({
        message: '닉네임은 10자 이하로 작성해주세요.',
        type: 'error',
      });

      return;
    }

    try {
      setIsLoading(true);
      const updatedUserInfo = await apiCall({
        url: `${BASE_API_URL}/users/me`,
        options: {
          method: 'PUT',
          body: JSON.stringify({
            nickname: nickname.trim(),
            ...(userInfo.profileImageUrl && {
              profileImageUrl: userInfo.profileImageUrl,
            }),
          }),
        },
      });

      setUserInfo(updatedUserInfo as UserType);
      showModal({ message: '닉네임이 변경되었습니다.', type: 'success' });
    } catch (error) {
      // API에서 반환한 구체적인 에러 메시지 추출
      let errorMessage = '닉네임 변경에 실패했습니다.';

      if (error instanceof Error) {
        try {
          // "[400] {"message":"닉네임은 10자 이하로 작성해주세요."}" 형태에서 message 추출
          const match = error.message.match(
            /\{[^}]*"message"\s*:\s*"([^"]*)"[^}]*\}/
          );

          if (match?.[1]) {
            errorMessage = match[1];
          }
        } catch {
          // JSON 파싱 실패 시 기본 메시지 사용
        }
      }

      showModal({ message: errorMessage, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  }, [userInfo, nickname, apiCall, showModal]);

  // 비밀번호 변경 핸들러
  const handlePasswordChange = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (newPassword !== confirmPassword) {
        showModal({ message: '비밀번호가 일치하지 않습니다.', type: 'error' });

        return;
      }

      if (newPassword.length < 8) {
        showModal({
          message: '비밀번호는 8자 이상이어야 합니다.',
          type: 'error',
        });

        return;
      }

      try {
        setIsLoading(true);
        await apiCall({
          url: `${BASE_API_URL}/auth/password`,
          options: {
            method: 'PUT',
            body: JSON.stringify({
              password: currentPassword,
              newPassword,
            }),
          },
        });

        // 폼 초기화
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');

        showModal({ message: '비밀번호가 변경되었습니다.', type: 'success' });
      } catch (error) {
        // API에서 반환한 구체적인 에러 메시지 추출
        let errorMessage = '비밀번호 변경에 실패했습니다.';

        if (error instanceof Error) {
          try {
            // "[400] {"message":"현재 비밀번호가 틀렸습니다."}" 형태에서 message 추출
            const match = error.message.match(
              /\{[^}]*"message"\s*:\s*"([^"]*)"[^}]*\}/
            );

            if (match?.[1]) {
              errorMessage = match[1];
            }
          } catch {
            // JSON 파싱 실패 시 기본 메시지 사용
          }
        }

        showModal({ message: errorMessage, type: 'error' });
      } finally {
        setIsLoading(false);
      }
    },
    [newPassword, confirmPassword, currentPassword, apiCall, showModal]
  );

  // 프로필 이미지 클릭 핸들러
  const handleProfileImageClick = useCallback(() => {
    const input = document.querySelector(
      '#profile-image-input'
    ) as HTMLInputElement;

    input.click();
  }, []);

  if (!isAuthenticated) {
    return <div>인증 확인 중...</div>;
  }

  return (
    <DashboardLayout>
      <div
        className='bg-gray-5 tablet:left-40 mobile:left-10 tablet:top-[4.375rem] mobile:top-[3.75rem] fixed top-[4.375rem] right-0 bottom-0 left-[18.75rem]'
        style={{ zIndex: 1 }}
      >
        <div className='pt-5 pl-5'>
          <BackButton />
        </div>

        {/* 메인 컨테이너 */}
        <div
          className='mt-[29px] ml-5'
          style={{
            width: '672.01px',
            height: '856px',
            padding: '0px',
          }}
        >
          {/* 프로필 컨테이너 */}
          <div
            className='w-full'
            style={{
              backgroundColor: '#ffffff',
              padding: '24px',
              height: '366px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h2
              className='mb-4'
              style={{
                color: '#333236',
                fontFamily: 'Pretendard',
                fontWeight: 700,
                fontSize: '24px',
              }}
            >
              프로필
            </h2>

            {/* 프로필 영역 */}
            <div className='flex' style={{ marginTop: '24px' }}>
              {/* 프로필 정사각형 상자 */}
              <button
                type='button'
                className='relative flex cursor-pointer items-center justify-center'
                style={{
                  width: '182px',
                  height: '182px',
                  backgroundColor: '#F5F5F5',
                  marginLeft: '0px',
                }}
                onClick={handleProfileImageClick}
              >
                {userInfo?.profileImageUrl ? (
                  <Image
                    src={userInfo.profileImageUrl}
                    alt='프로필 이미지'
                    width={182}
                    height={182}
                    style={{ objectFit: 'cover', borderRadius: '8px' }}
                  />
                ) : (
                  <Image
                    src='/auth/icon/addimage.svg'
                    alt='프로필 이미지 추가'
                    width={30.01}
                    height={30.01}
                  />
                )}
                <input
                  id='profile-image-input'
                  type='file'
                  accept='image/*'
                  className='hidden'
                  disabled={isLoading}
                  onChange={handleImageUpload}
                />
              </button>

              {/* 프로필 폼 */}
              <div
                className='flex flex-col'
                style={{
                  marginLeft: '42px',
                  width: '424px',
                  height: '182px',
                }}
              >
                {/* 이메일 */}
                <div
                  className='flex flex-col gap-0'
                  style={{ marginTop: '0px' }}
                >
                  <label
                    htmlFor='email'
                    className={`${styles.textStrong} mb-2 text-[16px] leading-[26px]`}
                  >
                    이메일
                  </label>
                  <input
                    disabled
                    id='email'
                    type='email'
                    value={userInfo?.email || ''}
                    placeholder='이메일 입력'
                    className='h-[50px] w-full cursor-not-allowed rounded-[8px] border border-[#D9D9D9] bg-gray-100 px-[16px] py-[12px] text-gray-500 placeholder:text-[#9FA6B2]'
                  />
                </div>

                {/* 닉네임 */}
                <div
                  className='flex flex-col gap-0'
                  style={{ marginTop: '16px' }}
                >
                  <label
                    htmlFor='nickname'
                    className={`${styles.textStrong} mb-2 text-[16px] leading-[26px]`}
                  >
                    닉네임
                  </label>
                  <input
                    id='nickname'
                    type='text'
                    value={nickname}
                    placeholder='닉네임 입력'
                    className='h-[50px] w-full rounded-[8px] border border-[#D9D9D9] bg-white px-[16px] py-[12px] placeholder:text-[#9FA6B2] focus:ring-2 focus:ring-[var(--auth-primary)] focus:outline-none focus-visible:outline-none'
                    onChange={(e) => {
                      setNickname(e.target.value);
                    }}
                  />
                </div>

                {/* 저장 버튼 */}
                <button
                  type='button'
                  className='w-full shrink-0 cursor-pointer rounded-[8px] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50'
                  disabled={isLoading || !nickname.trim()}
                  style={{
                    height: '54px',
                    marginTop: '24px',
                    backgroundColor: '#5534DA',
                    fontFamily: 'Pretendard',
                    fontWeight: 600,
                    fontSize: '16px',
                    textAlign: 'center',
                    color: '#ffffff',
                  }}
                  onClick={handleUpdateNickname}
                >
                  {isLoading ? '저장 중...' : '저장'}
                </button>
              </div>
            </div>
          </div>

          {/* 비밀번호 변경 컨테이너 */}
          <div
            className='mt-6 w-full'
            style={{
              backgroundColor: '#ffffff',
              padding: '24px',
              height: '466px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h2
              style={{
                color: '#333236',
                fontFamily: 'Pretendard',
                fontWeight: 700,
                fontSize: '24px',
              }}
            >
              비밀번호 변경
            </h2>

            {/* 비밀번호 변경 폼 */}
            <form
              className='flex flex-col'
              style={{ height: '362px' }}
              onSubmit={handlePasswordChange}
            >
              {/* 현재 비밀번호 */}
              <div
                className='flex flex-col gap-0'
                style={{ marginTop: '24px' }}
              >
                <label
                  htmlFor='currentPassword'
                  className={`${styles.textStrong} mb-2 text-[16px] leading-[26px]`}
                >
                  현재 비밀번호
                </label>
                <input
                  id='currentPassword'
                  type='password'
                  value={currentPassword}
                  placeholder='비밀번호 입력'
                  className='h-[50px] w-full rounded-[8px] border border-[#D9D9D9] bg-white px-[16px] py-[12px] placeholder:text-[#9FA6B2] focus:ring-2 focus:ring-[var(--auth-primary)] focus:outline-none focus-visible:outline-none'
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                  }}
                />
              </div>

              {/* 새 비밀번호 */}
              <div
                className='flex flex-col gap-0'
                style={{ marginTop: '16px' }}
              >
                <label
                  htmlFor='newPassword'
                  className={`${styles.textStrong} mb-2 text-[16px] leading-[26px]`}
                >
                  새 비밀번호
                </label>
                <input
                  id='newPassword'
                  type='password'
                  value={newPassword}
                  placeholder='새 비밀번호 입력'
                  className='h-[50px] w-full rounded-[8px] border border-[#D9D9D9] bg-white px-[16px] py-[12px] placeholder:text-[#9FA6B2] focus:ring-2 focus:ring-[var(--auth-primary)] focus:outline-none focus-visible:outline-none'
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
              </div>

              {/* 새 비밀번호 확인 */}
              <div
                className='flex flex-col gap-0'
                style={{ marginTop: '16px' }}
              >
                <label
                  htmlFor='confirmPassword'
                  className={`${styles.textStrong} mb-2 text-[16px] leading-[26px]`}
                >
                  새 비밀번호 확인
                </label>
                <input
                  id='confirmPassword'
                  type='password'
                  value={confirmPassword}
                  placeholder='새 비밀번호 입력'
                  className='h-[50px] w-full rounded-[8px] border border-[#D9D9D9] bg-white px-[16px] py-[12px] placeholder:text-[#9FA6B2] focus:ring-2 focus:ring-[var(--auth-primary)] focus:outline-none focus-visible:outline-none'
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </div>

              {/* 변경 버튼 */}
              <button
                type='submit'
                className='w-full shrink-0 cursor-pointer rounded-[8px] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50'
                style={{
                  height: '54px',
                  marginTop: '24px',
                  backgroundColor: '#5534DA',
                  fontFamily: 'Pretendard',
                  fontWeight: 600,
                  fontSize: '16px',
                  textAlign: 'center',
                  color: '#ffffff',
                }}
                disabled={
                  isLoading ||
                  !currentPassword ||
                  !newPassword ||
                  !confirmPassword
                }
                onClick={handlePasswordChange}
              >
                {isLoading ? '변경 중...' : '변경'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 모달 */}
      <UnifiedModal
        isOpen={isModalOpen}
        message={modalMessage}
        type={modalType}
        onClose={closeModal}
      />
    </DashboardLayout>
  );
}

/**
 * 서버사이드에서 인증 상태 확인 및 사용자 정보 가져오기
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;

  // HttpOnly 쿠키에서 access_token 확인
  const accessToken = req.cookies.access_token;
  const isAuthenticated = Boolean(accessToken);

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  // 서버에서 사용자 정보 가져오기
  let userInfo = null;

  try {
    const response = await fetch(`${BASE_API_URL}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${String(accessToken)}`,
      },
    });

    if (response.ok) {
      userInfo = await response.json();
    }
  } catch {
    // 서버에서 사용자 정보 조회 실패 시 기본값 사용
  }

  return {
    props: {
      isAuthenticated,
      userInfo,
      accessToken,
    },
  };
};

MyPage.getLayout = function getLayout(page: ReactNode) {
  return page;
};
