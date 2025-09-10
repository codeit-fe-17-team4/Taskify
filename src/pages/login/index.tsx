import type { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { type JSX, useCallback, useMemo, useState } from 'react';
import AuthButton from '@/components/auth/AuthButton';
import AuthHero from '@/components/auth/AuthHero';
import EmailInput from '@/components/auth/EmailInput';
import PasswordInput from '@/components/auth/PasswordInput';
import UnifiedModal from '@/components/auth/UnifiedModal';
import { login } from '@/lib/auth/api';
import type { LoginParams } from '@/lib/auth/interface';
import { useLoginValidation } from '@/lib/validation/rules';
import styles from '@/styles/auth-variables.module.css';

// 상수들
const ERROR_MESSAGES = {
  INVALID_PASSWORD: '비밀번호가 일치하지 않습니다.',
  USER_NOT_FOUND: '존재하지 않는 유저입니다.',
  SESSION_CREATION_FAILED:
    '로그인 처리 중 오류가 발생했습니다. 다시 시도해주세요.',
  LOGIN_FAILED: '로그인에 실패했습니다. 다시 시도해주세요.',
} as const;

const validateLoginForm = (email: string, password: string): boolean => {
  const isEmailValid = Boolean(
    email.trim() && /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(email)
  );
  const isPasswordValid = Boolean(password.trim() && password.length >= 8);

  return isEmailValid && isPasswordValid;
};

const resolveRedirectPath = (
  queryNext: string | string[] | undefined
): string => {
  const nextParam = Array.isArray(queryNext) ? queryNext[0] : queryNext;
  const shouldUseQueryNext =
    Boolean(nextParam) && !String(nextParam).startsWith('/dashboard');

  return shouldUseQueryNext ? String(nextParam) : '/mydashboard';
};

export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const { errors, validateField } = useLoginValidation();

  const handleEmailBlur = useCallback(() => {
    validateField('email', email);
  }, [validateField, email]);

  const handlePasswordBlur = useCallback(() => {
    validateField('password', password);
  }, [validateField, password]);

  const isFormValidNow = useMemo(
    () => validateLoginForm(email, password),
    [email, password]
  );

  const handleModalClose = useCallback(() => {
    setShowModal(false);
    setModalMessage('');
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // 로그인 폼 유효성 검증
      if (!validateLoginForm(email, password)) {
        return;
      }

      setIsLoading(true);

      try {
        // 로그인 API 호출
        const loginParams: LoginParams = { email, password };
        const response = await login(loginParams);

        // accessToken을 HttpOnly 쿠키로 설정
        const sessionResponse = await fetch('/api/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ accessToken: response.accessToken }),
        });

        if (!sessionResponse.ok) {
          throw new Error('Session creation failed');
        }

        // 리다이렉트 경로 결정
        router.push(resolveRedirectPath(router.query.next));
      } catch (error: unknown) {
        // 에러 메시지 처리
        const errorMessage =
          error instanceof Error ? error.message : '알 수 없는 오류';

        if (errorMessage.includes('[400]')) {
          setModalMessage(ERROR_MESSAGES.INVALID_PASSWORD);
        } else if (errorMessage.includes('[404]')) {
          setModalMessage(ERROR_MESSAGES.USER_NOT_FOUND);
        } else if (errorMessage.includes('Session creation failed')) {
          setModalMessage(ERROR_MESSAGES.SESSION_CREATION_FAILED);
        } else {
          setModalMessage(ERROR_MESSAGES.LOGIN_FAILED);
        }
        setShowModal(true);
      } finally {
        setIsLoading(false);
      }
    },
    [email, password, router]
  );

  return (
    <main
      className={`${styles.auth} ${styles.bgAuth} flex items-center justify-center`}
      style={{
        height: '1080px',
        minHeight: '1080px',
      }}
    >
      <div className='flex h-auto min-h-[653px] w-[520px] shrink-0 flex-col items-center gap-[30px] max-[375px]:w-[351px] max-[375px]:gap-[36px]'>
        {/* Hero Block */}
        <AuthHero title='오늘도 만나서 반가워요!' />

        {/* Form Wrapper */}
        <div className='flex w-[520px] flex-col items-center max-[375px]:w-[351px]'>
          <form
            className='flex w-[520px] flex-col items-start max-[375px]:w-[351px]'
            onSubmit={handleSubmit}
          >
            {/* 폼 요소들 */}
            <div className='flex flex-col space-y-6 max-[744px]:space-y-[13px] max-[375px]:space-y-4'>
              {/* 입력 필드들 */}
              <div className='flex w-[520px] flex-col items-start max-[375px]:w-[351px]'>
                <EmailInput
                  id='email'
                  label='이메일'
                  value={email}
                  placeholder='이메일을 입력해 주세요'
                  error={errors.email}
                  onChange={setEmail}
                  onBlur={handleEmailBlur}
                />
                <PasswordInput
                  id='password'
                  label='비밀번호'
                  value={password}
                  placeholder='비밀번호를 입력해 주세요'
                  error={errors.password}
                  showPassword={showPassword}
                  className='mt-[16px] max-[744px]:mt-[9px]'
                  onChange={setPassword}
                  onBlur={handlePasswordBlur}
                  onTogglePassword={useCallback(() => {
                    setShowPassword(!showPassword);
                  }, [showPassword])}
                />
              </div>

              {/* 로그인 버튼 */}
              <AuthButton
                disabled={!isFormValidNow}
                isLoading={isLoading}
                loadingText='로그인 중...'
              >
                로그인
              </AuthButton>

              {/* 하단 링크 */}
              <div
                className={`${styles.textStrong} w-[520px] text-center text-[16px] leading-[19px] max-[375px]:w-[351px]`}
              >
                <span>계정이 없으신가요? </span>
                <Link
                  href='/signup'
                  className='text-[var(--auth-primary)] underline transition-opacity hover:opacity-80'
                >
                  회원가입하기
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* 통합 모달 */}
      <UnifiedModal
        isOpen={showModal}
        message={modalMessage}
        type='error'
        onClose={handleModalClose}
      />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const accessToken = req.cookies.access_token;

  if (accessToken) {
    // 이미 로그인 상태: mydashboard로 보냄
    return Promise.resolve({
      redirect: {
        destination: '/mydashboard',
        permanent: false,
      },
    });
  }

  return Promise.resolve({ props: {} });
};
