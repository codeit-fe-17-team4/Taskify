import type { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';
import AuthButton from '@/components/auth/AuthButton';
import AuthHero from '@/components/auth/AuthHero';
import EmailInput from '@/components/auth/EmailInput';
import PasswordInput from '@/components/auth/PasswordInput';
import TextInput from '@/components/auth/TextInput';
import UnifiedModal from '@/components/auth/UnifiedModal';
import { signup } from '@/lib/users/api';
import type { SignupParams } from '@/lib/users/interface';
import { useSignupValidation } from '@/lib/validation/rules';
import styles from '@/styles/auth-variables.module.css';

// 상수들
const SUCCESS_MESSAGE = '가입이 완료되었습니다!';
const ERROR_MESSAGES = {
  DUPLICATE_EMAIL: '이미 사용중인 이메일입니다',
  SIGNUP_FAILED: '회원가입에 실패했습니다. 다시 시도해주세요.',
} as const;

/**
 * 유틸리티 함수들
 */
const validateSignupForm = (
  formData: { nickname: string; email: string; password: string; confirmPassword: string },
  hasAgreedToTerms: boolean,
  isSignupFormValid: (formData: Record<string, string>, options: { skipConfirmPassword: boolean }) => boolean
): boolean => {
  const isFormValid = isSignupFormValid(formData, { skipConfirmPassword: false });
  
  return isFormValid && hasAgreedToTerms;
};

export default function SignupPage(): React.JSX.Element {
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const {
    errors,
    validateField,
    confirmPasswordError,
    validateConfirmPassword,
    isSignupFormValid,
  } = useSignupValidation();

  const handleNicknameBlur = useCallback(() => {
    validateField('nickname', nickname);
  }, [validateField, nickname]);

  const handleEmailBlur = useCallback(() => {
    validateField('email', email);
  }, [validateField, email]);

  const handlePasswordBlur = useCallback(() => {
    validateField('password', password);
    // 비밀번호가 변경되면 확인 비밀번호도 다시 검증 (둘 다 입력된 경우에만)
    if (password && confirmPassword && confirmPassword.length > 0) {
      validateConfirmPassword(password, confirmPassword);
    }
  }, [validateField, password, confirmPassword, validateConfirmPassword]);

  const handleConfirmPasswordBlur = useCallback(() => {
    // 비밀번호와 확인 비밀번호가 모두 입력된 경우에만 검증
    const hasBothPasswords = password && confirmPassword && password.length > 0 && confirmPassword.length > 0;
    
    if (hasBothPasswords) {
      validateConfirmPassword(password, confirmPassword);
    }
  }, [validateConfirmPassword, password, confirmPassword]);

  const isFormValidNow = useMemo(() => {
    return (
      isSignupFormValid(
        { nickname, email, password, confirmPassword },
        { skipConfirmPassword: true }
      ) && agreedToTerms
    );
  }, [
    isSignupFormValid,
    nickname,
    email,
    password,
    confirmPassword,
    agreedToTerms,
  ]);

  const handleModalClose = useCallback(() => {
    setShowModal(false);
    setModalMessage('');
    // 성공 모달인 경우 로그인 페이지로 이동
    if (modalMessage === SUCCESS_MESSAGE) {
      router.push('/login');
    }
  }, [modalMessage, router]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // 폼 유효성 검사
      const formData = { nickname, email, password, confirmPassword };
      
      if (!validateSignupForm(formData, agreedToTerms, isSignupFormValid)) {
        return;
      }

      setIsLoading(true);

      try {
        // 회원가입 API 호출
        const signupParams: SignupParams = {
          nickname,
          email,
          password,
        };

        await signup(signupParams);

        // 회원가입 성공 모달 표시
        setModalMessage(SUCCESS_MESSAGE);
        setShowModal(true);
      } catch (error: unknown) {
        // 에러 메시지 처리
        const errorMessage = error instanceof Error ? error.message : '';

        if (errorMessage.includes('[409]') || errorMessage.includes('[400]')) {
          setModalMessage(ERROR_MESSAGES.DUPLICATE_EMAIL);
        } else {
          setModalMessage(ERROR_MESSAGES.SIGNUP_FAILED);
        }
        setShowModal(true);
      } finally {
        setIsLoading(false);
      }
    },
    [
      nickname,
      email,
      password,
      confirmPassword,
      agreedToTerms,
      isSignupFormValid,
    ]
  );

  // 비밀번호 표시/숨김 토글 핸들러들
  const handleTogglePassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const handleToggleConfirmPassword = useCallback(() => {
    setShowConfirmPassword(!showConfirmPassword);
  }, [showConfirmPassword]);

  // 약관 동의 체크박스 핸들러
  const handleTermsChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAgreedToTerms(e.target.checked);
    },
    []
  );

  return (
    <main
      className={`${styles.auth} ${styles.bgAuth} flex min-h-screen items-center justify-center`}
    >
      <div className='flex h-auto min-h-[653px] w-[520px] shrink-0 flex-col items-center gap-[30px] max-[375px]:w-[351px] max-[375px]:gap-[36px]'>
        {/* Hero Block */}
        <AuthHero title='첫 방문을 환영합니다!' />

        {/* Form Wrapper */}
        <div className='flex w-[520px] flex-col items-center max-[375px]:w-[351px]'>
          <form
            className='flex w-[520px] flex-col items-start max-[375px]:w-[351px]'
            onSubmit={handleSubmit}
          >
            {/* Form Stack - 입력 + 버튼 + 하단 안내 */}
            <div className='flex flex-col space-y-6 max-[375px]:space-y-2'>
              {/* Input Group */}
              <div className='flex w-[520px] flex-col items-start max-[375px]:w-[351px]'>
                {/* Nickname Input */}
                <TextInput
                  id='nickname'
                  label='닉네임'
                  value={nickname}
                  placeholder='닉네임을 입력해 주세요'
                  error={errors.nickname}
                  onChange={setNickname}
                  onBlur={handleNicknameBlur}
                />

                {/* Email Input */}
                <EmailInput
                  id='email'
                  label='이메일'
                  value={email}
                  placeholder='이메일을 입력해 주세요'
                  error={errors.email}
                  className='mt-[16px] max-[375px]:mt-0'
                  onChange={setEmail}
                  onBlur={handleEmailBlur}
                />

                {/* Password Input */}
                <PasswordInput
                  id='password'
                  label='비밀번호'
                  value={password}
                  placeholder='비밀번호를 입력해 주세요'
                  error={errors.password}
                  showPassword={showPassword}
                  className='mt-[16px] max-[375px]:mt-0'
                  onChange={setPassword}
                  onBlur={handlePasswordBlur}
                  onTogglePassword={handleTogglePassword}
                />

                {/* Confirm Password Input */}
                <PasswordInput
                  id='confirmPassword'
                  label='비밀번호 확인'
                  value={confirmPassword}
                  placeholder='비밀번호를 다시 입력해 주세요'
                  error={confirmPasswordError}
                  showPassword={showConfirmPassword}
                  className='mt-[16px] max-[375px]:mt-0'
                  onChange={setConfirmPassword}
                  onBlur={handleConfirmPasswordBlur}
                  onTogglePassword={handleToggleConfirmPassword}
                />
              </div>

              {/* Terms Agreement */}
              <div className='flex w-[520px] items-center gap-3'>
                <input
                  id='terms'
                  type='checkbox'
                  checked={agreedToTerms}
                  className='h-5 w-5 rounded border-gray-300 text-[var(--auth-primary)] focus:ring-[var(--auth-primary)]'
                  onChange={handleTermsChange}
                />
                <label
                  htmlFor='terms'
                  className={`${styles.textStrong} cursor-pointer text-[16px] leading-[26px]`}
                >
                  이용약관에 동의합니다
                </label>
              </div>

              {/* Signup Button */}
              <AuthButton
                type='submit'
                disabled={!isFormValidNow}
                isLoading={isLoading}
                loadingText='가입 중...'
              >
                가입하기
              </AuthButton>

              {/* Bottom Info */}
              <div
                className={`${styles.textStrong} w-[520px] text-center text-[16px] leading-[19px] max-[375px]:w-[351px]`}
              >
                <span>이미 회원이신가요? </span>
                <Link
                  href='/login'
                  className='text-[var(--auth-primary)] underline transition-opacity hover:opacity-80'
                >
                  로그인하기
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
        type={modalMessage === SUCCESS_MESSAGE ? 'success' : 'error'}
        onClose={handleModalClose}
      />
    </main>
  );
}

/**
 * 정적 생성 설정
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const accessToken = req.cookies.access_token;

  if (accessToken) {
    return {
      redirect: {
        destination: '/mydashboard',
        permanent: false,
      },
    };
  }

  return { props: {} };
};
