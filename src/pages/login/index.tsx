import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import styles from '@/styles/auth-variables.module.css';
import { login } from '@/lib/auth/api';
import type { LoginParams } from '@/lib/auth/interface';
import { setAccessToken, setUser } from '@/lib/auth/token';
import UnifiedModal from '@/components/auth/UnifiedModal';
import AuthHero from '@/components/auth/AuthHero';
import EmailInput from '@/components/auth/EmailInput';
import PasswordInput from '@/components/auth/PasswordInput';
import AuthButton from '@/components/auth/AuthButton';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleEmailBlur = () => {
    if (email && !validateEmail(email)) {
      setEmailError('이메일 형식으로 작성해 주세요.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordBlur = () => {
    if (password && !validatePassword(password)) {
      setPasswordError('8자 이상 입력해주세요.');
    } else {
      setPasswordError('');
    }
  };

  const isFormValid =
    email && password && validateEmail(email) && validatePassword(password);

  const handleModalClose = () => {
    setShowModal(false);
    setModalMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsLoading(true);

    try {
      // 로그인 API 호출
      const loginParams: LoginParams = {
        email,
        password,
      };

      const response = await login(loginParams);

      // 엑세스 토큰과 사용자 정보를 저장
      setAccessToken(response.accessToken);
      setUser(response.user);

      console.log('로그인 성공:', response);

      // 로그인 성공 시 mydashboard로 이동
      router.push('/mydashboard');
    } catch (error: any) {
      // 에러 메시지 처리
      if (error.message.includes('[400]')) {
        setModalMessage('비밀번호가 일치하지 않습니다.');
        setShowModal(true);
      } else if (error.message.includes('[404]')) {
        setModalMessage('존재하지 않는 유저입니다.');
        setShowModal(true);
      } else {
        setModalMessage('로그인에 실패했습니다. 다시 시도해주세요.');
        setShowModal(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      className={`${styles.auth} ${styles.bgAuth} flex min-h-screen items-center justify-center overflow-x-auto`}
    >
      <div className='flex h-auto min-h-[653px] w-[520px] shrink-0 flex-col items-center gap-[30px] max-[375px]:w-[351px] max-[375px]:gap-[36px]'>
        {/* Hero Block */}
        <AuthHero title='오늘도 만나서 반가워요!' />

        {/* Form Wrapper */}
        <div className='flex w-[520px] flex-col items-center max-[375px]:w-[351px]'>
          <form
            onSubmit={handleSubmit}
            className='flex w-[520px] flex-col items-start max-[375px]:w-[351px]'
          >
            {/* Form Stack - 입력 + 버튼 + 하단 안내 */}
            <div className='flex flex-col space-y-6 max-[744px]:space-y-[13px] max-[375px]:space-y-4'>
              {/* Input Group */}
              <div className='flex w-[520px] flex-col items-start max-[375px]:w-[351px]'>
                {/* Email Input */}
                <EmailInput
                  id='email'
                  label='이메일'
                  value={email}
                  onChange={setEmail}
                  onBlur={handleEmailBlur}
                  placeholder='이메일을 입력해 주세요'
                  error={emailError}
                />

                {/* Password Input */}
                <PasswordInput
                  id='password'
                  label='비밀번호'
                  value={password}
                  onChange={setPassword}
                  onBlur={handlePasswordBlur}
                  placeholder='비밀번호를 입력해 주세요'
                  error={passwordError}
                  showPassword={showPassword}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                  className='mt-[16px] max-[744px]:mt-[9px]'
                />
              </div>

              {/* Login Button */}
              <AuthButton
                type='submit'
                disabled={!isFormValid}
                isLoading={isLoading}
                loadingText='로그인 중...'
              >
                로그인
              </AuthButton>

              {/* Bottom Info */}
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
        onClose={handleModalClose}
        message={modalMessage}
        type='error'
      />
    </main>
  );
}

// 정적 생성 설정
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: false, // 완전 정적 (재생성 안함)
  };
};
