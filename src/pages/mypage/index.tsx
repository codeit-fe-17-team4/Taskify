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
import { useTheme } from '@/contexts/ThemeContext';
import { BASE_API_URL } from '@/lib/constants';
import type { UserType } from '@/lib/users/type';
import styles from '@/styles/auth-variables.module.css';
import mypageStyles from '@/styles/mypage.module.css';

// 상수들
const ERROR_MESSAGES = {
  IMAGE_UPLOAD_FAILED: '이미지 업로드에 실패했습니다.',
  NICKNAME_CHANGE_FAILED: '닉네임 변경에 실패했습니다.',
  PASSWORD_CHANGE_FAILED: '비밀번호 변경에 실패했습니다.',
  PASSWORD_MISMATCH: '비밀번호가 일치하지 않습니다.',
  PASSWORD_TOO_SHORT: '비밀번호는 8자 이상이어야 합니다.',
  NICKNAME_TOO_LONG: '닉네임은 10자 이하로 작성해주세요.',
} as const;

const SUCCESS_MESSAGES = {
  NICKNAME_CHANGED: '닉네임이 변경되었습니다.',
  PASSWORD_CHANGED: '비밀번호가 변경되었습니다.',
} as const;

/**
 * 테마별 스타일 함수
 */
const getThemeStyles = (theme: string) => {
  const isDark = theme === 'dark';

  return {
    container: {
      backgroundColor: isDark ? '#201f23' : '#ffffff',
      padding: '24px',
      borderRadius: '8px',
      boxShadow: isDark
        ? '0 2px 8px rgba(0, 0, 0, 0.3)'
        : '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    title: {
      color: isDark ? 'var(--auth-text-strong)' : '#333236',
      fontFamily: 'Pretendard',
      fontWeight: 700,
      fontSize: '24px',
    },
    button: {
      backgroundColor: 'var(--auth-primary)',
      fontFamily: 'Pretendard',
      fontWeight: 600,
      fontSize: '16px',
      textAlign: 'center' as const,
      color: '#ffffff',
    },
  };
};

// 입력 필드 스타일 상수
const INPUT_STYLES = {
  base: 'h-[50px] w-full rounded-[8px] border px-[16px] py-[12px] placeholder:text-[var(--auth-placeholder)] focus:outline-none focus-visible:outline-none',
  light: 'border-[#D9D9D9] bg-white',
  lightDisabled: 'border-[#D9D9D9] bg-gray-100 text-gray-500',
  dark: 'border-[var(--auth-input-border)] bg-[var(--auth-input-bg)] text-[var(--auth-text-strong)]',
  focus: 'focus:ring-2 focus:ring-[var(--auth-primary)]',
};

/**
 * 유틸리티 함수들
 */
const extractErrorMessage = (
  error: unknown,
  defaultMessage: string
): string => {
  if (error instanceof Error) {
    try {
      const match = error.message.match(
        /\{[^}]*"message"\s*:\s*"([^"]*)"[^}]*\}/
      );

      return match?.[1] || defaultMessage;
    } catch {
      return defaultMessage;
    }
  }

  return defaultMessage;
};

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
  const { theme } = useTheme();

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
        showModal({
          message: ERROR_MESSAGES.IMAGE_UPLOAD_FAILED,
          type: 'error',
        });
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
        message: ERROR_MESSAGES.NICKNAME_TOO_LONG,
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
      showModal({
        message: SUCCESS_MESSAGES.NICKNAME_CHANGED,
        type: 'success',
      });
    } catch (error) {
      const errorMessage = extractErrorMessage(
        error,
        ERROR_MESSAGES.NICKNAME_CHANGE_FAILED
      );

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
        showModal({ message: ERROR_MESSAGES.PASSWORD_MISMATCH, type: 'error' });

        return;
      }

      if (newPassword.length < 8) {
        showModal({
          message: ERROR_MESSAGES.PASSWORD_TOO_SHORT,
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

        showModal({
          message: SUCCESS_MESSAGES.PASSWORD_CHANGED,
          type: 'success',
        });
      } catch (error) {
        const errorMessage = extractErrorMessage(
          error,
          ERROR_MESSAGES.PASSWORD_CHANGE_FAILED
        );

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
    <div
      style={{ zIndex: 1, height: 'calc(100vh - 4.375rem)' }}
      className={`tablet:left-40 mobile:left-10 tablet:top-[4.375rem] mobile:top-[3.75rem] fixed top-[4.375rem] right-0 left-[18.75rem] overflow-y-auto ${
        theme === 'dark' ? 'bg-[var(--auth-bg)]' : 'bg-gray-5'
      }`}
    >
      <div className='pt-5 pl-5'>
        <BackButton />
      </div>

      {/* 메인 컨테이너 - 최대 레이아웃, 오른쪽 간격 20px일 때부터 줄어듦 */}
      <div
        className='mt-[29px] mr-3 ml-3 max-[375px]:mt-[6px]'
        style={{
          width: 'calc(100% - 24px)', // 좌우 마진 12px씩 제외
          maxWidth: '672.01px',
          height: '856px',
          padding: '0px',
        }}
      >
        {/* 프로필 컨테이너 */}
        <div
          className={`${mypageStyles.mobilePaddingOverride} ${mypageStyles.mobileProfileContainer} w-full`}
          style={{
            ...getThemeStyles(theme).container,
            height: '366px',
          }}
        >
          <h2
            className={`${mypageStyles.mobileTitleFont} mb-4 max-[375px]:mb-10`}
            style={getThemeStyles(theme).title}
          >
            프로필
          </h2>

          {/* 프로필 영역 */}
          <div
            className='flex max-[375px]:flex-col max-[375px]:gap-4'
            style={{ marginTop: '24px' }}
          >
            {/* 프로필 정사각형 상자 */}
            <button
              type='button'
              className={`${mypageStyles.mobileProfileImage} relative flex cursor-pointer items-center justify-center overflow-hidden max-[375px]:mx-auto`}
              style={{
                width: '182px',
                height: '182px',
                backgroundColor: 'var(--profile-image-bg)',
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
                  className='h-full w-full'
                  style={{
                    objectFit: 'cover',
                    borderRadius: '8px',
                    width: '100%',
                    height: '100%',
                  }}
                />
              ) : (
                <Image
                  alt='프로필 이미지 추가'
                  width={30.01}
                  height={30.01}
                  src={
                    theme === 'dark'
                      ? '/darkauth/icon/add_box.svg'
                      : '/auth/icon/addimage.svg'
                  }
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
              className={`${mypageStyles.mobileProfileForm} flex flex-col max-[375px]:ml-0 max-[375px]:w-full`}
              style={{
                marginLeft: '42px',
                width: '424px',
                height: '182px',
              }}
            >
              {/* 이메일 */}
              <div
                className={`${mypageStyles.mobileEmailField} flex flex-col gap-0 max-[375px]:mt-10`}
                style={{ marginTop: '0px' }}
              >
                <label
                  htmlFor='email'
                  className={`${styles.textStrong} ${mypageStyles.mobileLabelFont} mb-2 text-[16px] leading-[26px]`}
                >
                  이메일
                </label>
                <input
                  disabled
                  id='email'
                  type='email'
                  value={userInfo?.email || ''}
                  placeholder='이메일 입력'
                  className={`${mypageStyles.mobileInputFont} ${INPUT_STYLES.base} cursor-not-allowed ${
                    theme === 'dark'
                      ? INPUT_STYLES.dark
                      : INPUT_STYLES.lightDisabled
                  }`}
                />
              </div>

              {/* 닉네임 */}
              <div
                className='flex flex-col gap-0'
                style={{ marginTop: '16px' }}
              >
                <label
                  htmlFor='nickname'
                  className={`${styles.textStrong} ${mypageStyles.mobileLabelFont} mb-2 text-[16px] leading-[26px]`}
                >
                  닉네임
                </label>
                <input
                  id='nickname'
                  type='text'
                  value={nickname}
                  placeholder='닉네임 입력'
                  className={`${mypageStyles.mobileInputFont} ${INPUT_STYLES.base} ${INPUT_STYLES.focus} ${
                    theme === 'dark' ? INPUT_STYLES.dark : INPUT_STYLES.light
                  }`}
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
                  ...getThemeStyles(theme).button,
                  height: '54px',
                  marginTop: '24px',
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
          className={`${mypageStyles.mobilePaddingOverride} mt-6 w-full max-[375px]:mt-4`}
          style={{
            ...getThemeStyles(theme).container,
            height: '466px',
          }}
        >
          <h2
            className={mypageStyles.mobileTitleFont}
            style={getThemeStyles(theme).title}
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
            <div className='flex flex-col gap-0' style={{ marginTop: '24px' }}>
              <label
                htmlFor='currentPassword'
                className={`${styles.textStrong} ${mypageStyles.mobileLabelFont} mb-2 text-[16px] leading-[26px]`}
              >
                현재 비밀번호
              </label>
              <input
                id='currentPassword'
                type='password'
                value={currentPassword}
                placeholder='비밀번호 입력'
                className={`${mypageStyles.mobileInputFont} ${INPUT_STYLES.base} ${INPUT_STYLES.focus} ${
                  theme === 'dark' ? INPUT_STYLES.dark : INPUT_STYLES.light
                }`}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                }}
              />
            </div>

            {/* 새 비밀번호 */}
            <div className='flex flex-col gap-0' style={{ marginTop: '16px' }}>
              <label
                htmlFor='newPassword'
                className={`${styles.textStrong} ${mypageStyles.mobileLabelFont} mb-2 text-[16px] leading-[26px]`}
              >
                새 비밀번호
              </label>
              <input
                id='newPassword'
                type='password'
                value={newPassword}
                placeholder='새 비밀번호 입력'
                className={`${mypageStyles.mobileInputFont} ${INPUT_STYLES.base} ${INPUT_STYLES.focus} ${
                  theme === 'dark' ? INPUT_STYLES.dark : INPUT_STYLES.light
                }`}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
            </div>

            {/* 새 비밀번호 확인 */}
            <div className='flex flex-col gap-0' style={{ marginTop: '16px' }}>
              <label
                htmlFor='confirmPassword'
                className={`${styles.textStrong} ${mypageStyles.mobileLabelFont} mb-2 text-[16px] leading-[26px]`}
              >
                새 비밀번호 확인
              </label>
              <input
                id='confirmPassword'
                type='password'
                value={confirmPassword}
                placeholder='새 비밀번호 입력'
                className={`${mypageStyles.mobileInputFont} ${INPUT_STYLES.base} ${INPUT_STYLES.focus} ${
                  theme === 'dark' ? INPUT_STYLES.dark : INPUT_STYLES.light
                }`}
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
                ...getThemeStyles(theme).button,
                height: '54px',
                marginTop: '24px',
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

      {/* 디자인 시안에 따른 하단 여백 79px */}
      <div style={{ height: '79px' }} />

      {/* 모달 */}
      <UnifiedModal
        isOpen={isModalOpen}
        message={modalMessage}
        type={modalType}
        onClose={closeModal}
      />
    </div>
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
  return <DashboardLayout>{page}</DashboardLayout>;
};
