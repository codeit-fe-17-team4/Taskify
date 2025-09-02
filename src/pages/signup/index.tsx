import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import styles from '@/styles/auth-variables.module.css';
import UnifiedModal from '@/components/auth/UnifiedModal';
import { signup } from '@/lib/users/api';
import type { SignupParams } from '@/lib/users/interface';
import AuthHero from '@/components/auth/AuthHero';
import TextInput from '@/components/auth/TextInput';
import EmailInput from '@/components/auth/EmailInput';
import PasswordInput from '@/components/auth/PasswordInput';
import AuthButton from '@/components/auth/AuthButton';

export default function SignupPage() {
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [nicknameError, setNicknameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const validateNickname = (nickname: string) => {
    return nickname.length <= 10;
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const validateConfirmPassword = (
    password: string,
    confirmPassword: string
  ) => {
    return password === confirmPassword;
  };

  const handleNicknameBlur = () => {
    if (nickname && !validateNickname(nickname)) {
      setNicknameError('열 자 이하로 작성해주세요.');
    } else {
      setNicknameError('');
    }
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

  const handleConfirmPasswordBlur = () => {
    if (
      confirmPassword &&
      !validateConfirmPassword(password, confirmPassword)
    ) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmPasswordError('');
    }
  };

  const isFormValid =
    nickname &&
    email &&
    password &&
    confirmPassword &&
    !nicknameError &&
    !emailError &&
    !passwordError &&
    !confirmPasswordError &&
    agreedToTerms;

  const handleModalClose = () => {
    setShowModal(false);
    setModalMessage('');
    // 성공 모달인 경우 로그인 페이지로 이동
    if (modalMessage === '가입이 완료되었습니다!') {
      router.push('/login');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsLoading(true);

    try {
      // 회원가입 API 호출
      const signupParams: SignupParams = {
        nickname,
        email,
        password,
      };

      const response = await signup(signupParams);

      console.log('회원가입 성공:', response);

      // 회원가입 성공 모달 표시
      setModalMessage('가입이 완료되었습니다!');
      setShowModal(true);
    } catch (error: any) {
      // 에러 메시지 처리
      if (error.message.includes('[409]')) {
        setModalMessage('이미 사용중인 이메일입니다');
        setShowModal(true);
      } else if (error.message.includes('[400]')) {
        setModalMessage('이미 사용중인 이메일입니다');
        setShowModal(true);
      } else {
        setModalMessage('회원가입에 실패했습니다. 다시 시도해주세요.');
        setShowModal(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

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
            onSubmit={handleSubmit}
            className='flex w-[520px] flex-col items-start max-[375px]:w-[351px]'
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
                  onChange={setNickname}
                  onBlur={handleNicknameBlur}
                  placeholder='닉네임을 입력해 주세요'
                  error={nicknameError}
                />

                {/* Email Input */}
                <EmailInput
                  id='email'
                  label='이메일'
                  value={email}
                  onChange={setEmail}
                  onBlur={handleEmailBlur}
                  placeholder='이메일을 입력해 주세요'
                  error={emailError}
                  className='mt-[16px] max-[375px]:mt-0'
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
                  className='mt-[16px] max-[375px]:mt-0'
                />

                {/* Confirm Password Input */}
                <PasswordInput
                  id='confirmPassword'
                  label='비밀번호 확인'
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  onBlur={handleConfirmPasswordBlur}
                  placeholder='비밀번호를 다시 입력해 주세요'
                  error={confirmPasswordError}
                  showPassword={showConfirmPassword}
                  onTogglePassword={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className='mt-[16px] max-[375px]:mt-0'
                />
              </div>

              {/* Terms Agreement */}
              <div className='flex w-[520px] items-center gap-3'>
                <input
                  id='terms'
                  type='checkbox'
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className='h-5 w-5 rounded border-gray-300 text-[var(--auth-primary)] focus:ring-[var(--auth-primary)]'
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
                disabled={!isFormValid}
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
        onClose={handleModalClose}
        message={modalMessage}
        type={modalMessage === '가입이 완료되었습니다!' ? 'success' : 'error'}
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
