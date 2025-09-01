import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/auth-variables.module.css';

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
    validateNickname(nickname) &&
    validateEmail(email) &&
    validatePassword(password) &&
    validateConfirmPassword(password, confirmPassword) &&
    !nicknameError &&
    !emailError &&
    !passwordError &&
    !confirmPasswordError &&
    agreedToTerms;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsLoading(true);
    try {
      // API 기능은 나중에 구현 예정
      console.log('회원가입 시도:', {
        nickname,
        email,
        password,
        confirmPassword,
      });

      // 임시로 회원가입 성공 처리
      alert('가입이 완료되었습니다');
      router.push('/login');
    } catch (error: any) {
      console.error('Signup failed:', error);
      // 회원가입 실패 시 에러 처리
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
        <div className='flex h-[322px] w-[200px] flex-col items-center gap-[10px]'>
          <div className='flex h-[280px] w-[200px] flex-col items-center gap-[30px]'>
            <div className='relative h-[280px] w-[200px]'>
              <Link href='/' className='block h-full w-full'>
                <Image
                  src='/auth/image/login-signup-logo.svg'
                  alt='Taskify Logo'
                  fill
                  className='object-contain object-center'
                  priority
                />
              </Link>
            </div>
          </div>
          <p
            className={`${styles.textStrong} mx-auto mt-[12px] h-[32px] w-[200px] overflow-visible text-center text-[20px] leading-[32px] font-[500] tracking-[-0.01em] whitespace-nowrap max-[375px]:mt-[8px] max-[375px]:flex max-[375px]:h-[26px] max-[375px]:w-[170px] max-[375px]:items-center max-[375px]:justify-center max-[375px]:text-[18px]`}
          >
            첫 방문을 환영합니다!
          </p>
        </div>

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
                <div className='flex w-[520px] flex-col gap-0 max-[375px]:w-[351px]'>
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
                    onChange={(e) => setNickname(e.target.value)}
                    onBlur={handleNicknameBlur}
                    placeholder='닉네임을 입력해 주세요'
                    className={`h-[50px] w-[520px] rounded-[8px] bg-white px-[16px] py-[15px] ring-1 placeholder:text-[var(--auth-placeholder)] focus:ring-2 focus:ring-[var(--auth-primary)] focus:outline-none focus-visible:outline-none max-[375px]:w-[351px] ${
                      nicknameError
                        ? 'ring-[var(--auth-error)] focus:ring-[var(--auth-error)]'
                        : 'ring-[var(--auth-border)]'
                    }`}
                    aria-invalid={!!nicknameError}
                    aria-describedby={
                      nicknameError ? 'nickname-error' : undefined
                    }
                  />
                  {nicknameError && (
                    <p
                      id='nickname-error'
                      className='mt-2 text-[14px] leading-[24px] text-[var(--auth-error)] max-[375px]:mt-2 max-[375px]:mb-2'
                      aria-live='polite'
                    >
                      {nicknameError}
                    </p>
                  )}
                </div>

                {/* Email Input */}
                <div className='flex w-[520px] flex-col gap-0 max-[375px]:w-[351px]'>
                  <label
                    htmlFor='email'
                    className={`${styles.textStrong} mt-[16px] mb-2 text-[16px] leading-[26px] max-[375px]:mt-0`}
                  >
                    이메일
                  </label>
                  <input
                    id='email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={handleEmailBlur}
                    placeholder='이메일을 입력해 주세요'
                    className={`h-[50px] w-[520px] rounded-[8px] bg-white px-[16px] py-[15px] ring-1 placeholder:text-[var(--auth-placeholder)] focus:ring-2 focus:ring-[var(--auth-primary)] focus:outline-none focus-visible:outline-none max-[375px]:w-[351px] ${
                      emailError
                        ? 'ring-[var(--auth-error)] focus:ring-[var(--auth-error)]'
                        : 'ring-[var(--auth-border)]'
                    }`}
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? 'email-error' : undefined}
                  />
                  {emailError && (
                    <p
                      id='email-error'
                      className='mt-2 text-[14px] leading-[24px] text-[var(--auth-error)] max-[375px]:mt-2 max-[375px]:mb-2'
                      aria-live='polite'
                    >
                      {emailError}
                    </p>
                  )}
                </div>

                {/* Password Input */}
                <div className='flex w-[520px] flex-col gap-0 max-[375px]:w-[351px]'>
                  <label
                    htmlFor='password'
                    className={`${styles.textStrong} mt-[16px] mb-2 text-[16px] leading-[26px] max-[375px]:mt-0`}
                  >
                    비밀번호
                  </label>
                  <div className='relative w-[520px] max-[375px]:w-[351px]'>
                    <input
                      id='password'
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={handlePasswordBlur}
                      placeholder='비밀번호를 입력해 주세요'
                      className={`h-[50px] w-[520px] rounded-[8px] bg-white px-[16px] py-[12px] pr-10 ring-1 placeholder:text-[var(--auth-placeholder)] focus:ring-2 focus:ring-[var(--auth-primary)] focus:outline-none focus-visible:outline-none max-[375px]:w-[351px] ${
                        passwordError
                          ? 'ring-[var(--auth-error)] focus:ring-[var(--auth-error)]'
                          : 'ring-[var(--auth-border)]'
                      }`}
                      aria-invalid={!!passwordError}
                      aria-describedby={
                        passwordError ? 'password-error' : undefined
                      }
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute top-1/2 right-3 flex h-[24px] w-[24px] -translate-y-1/2 items-center justify-center text-[#9FA6B2] transition-colors duration-200 hover:text-[#5534da]'
                      aria-label={
                        showPassword ? '비밀번호 숨기기' : '비밀번호 보기'
                      }
                      aria-pressed={showPassword}
                    >
                      {showPassword ? (
                        <Image
                          src='/auth/icon/visibility.svg'
                          alt='비밀번호 숨기기'
                          width={24}
                          height={24}
                        />
                      ) : (
                        <Image
                          src='/auth/icon/visibility-off.svg'
                          alt='비밀번호 보기'
                          width={24}
                          height={24}
                        />
                      )}
                    </button>
                  </div>
                  {passwordError && (
                    <p
                      id='password-error'
                      className='mt-2 text-[14px] leading-[24px] text-[var(--auth-error)] max-[375px]:mt-2 max-[375px]:mb-2'
                      aria-live='polite'
                    >
                      {passwordError}
                    </p>
                  )}
                </div>

                {/* Confirm Password Input */}
                <div className='flex w-[520px] flex-col gap-0 max-[375px]:w-[351px]'>
                  <label
                    htmlFor='confirmPassword'
                    className={`${styles.textStrong} mt-[16px] mb-2 text-[16px] leading-[26px] max-[375px]:mt-0`}
                  >
                    비밀번호 확인
                  </label>
                  <div className='relative w-[520px] max-[375px]:w-[351px]'>
                    <input
                      id='confirmPassword'
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onBlur={handleConfirmPasswordBlur}
                      placeholder='비밀번호를 다시 입력해 주세요'
                      className={`h-[50px] w-[520px] rounded-[8px] bg-white px-[16px] py-[12px] pr-10 ring-1 placeholder:text-[var(--auth-placeholder)] focus:ring-2 focus:ring-[var(--auth-primary)] focus:outline-none focus-visible:outline-none max-[375px]:w-[351px] ${
                        confirmPasswordError
                          ? 'ring-[var(--auth-error)] focus:ring-[var(--auth-error)]'
                          : 'ring-[var(--auth-border)]'
                      }`}
                      aria-invalid={!!confirmPasswordError}
                      aria-describedby={
                        confirmPasswordError
                          ? 'confirm-password-error'
                          : undefined
                      }
                    />
                    <button
                      type='button'
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className='absolute top-1/2 right-3 flex h-[24px] w-[24px] -translate-y-1/2 items-center justify-center text-[#9FA6B2] transition-colors duration-200 hover:text-[#5534da]'
                      aria-label={
                        showConfirmPassword
                          ? '비밀번호 숨기기'
                          : '비밀번호 보기'
                      }
                      aria-pressed={showConfirmPassword}
                    >
                      {showConfirmPassword ? (
                        <Image
                          src='/auth/icon/visibility.svg'
                          alt='비밀번호 숨기기'
                          width={24}
                          height={24}
                        />
                      ) : (
                        <Image
                          src='/auth/icon/visibility-off.svg'
                          alt='비밀번호 보기'
                          width={24}
                          height={24}
                        />
                      )}
                    </button>
                  </div>
                  {confirmPasswordError && (
                    <p
                      id='confirm-password-error'
                      className='mt-2 text-[14px] leading-[24px] text-[var(--auth-error)] max-[375px]:mt-2 max-[375px]:mb-2'
                      aria-live='polite'
                    >
                      {confirmPasswordError}
                    </p>
                  )}
                </div>
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
              <button
                type='submit'
                aria-disabled={!isFormValid || isLoading}
                disabled={!isFormValid || isLoading}
                className={`h-[50px] w-[520px] shrink-0 rounded-[8px] text-center text-[18px] leading-[26px] font-[500] text-white max-[375px]:w-[351px] ${
                  isFormValid && !isLoading
                    ? 'cursor-pointer bg-[var(--auth-primary)] transition-opacity hover:opacity-90'
                    : 'cursor-not-allowed bg-[var(--auth-placeholder)]'
                }`}
              >
                {isLoading ? '가입 중...' : '가입하기'}
              </button>

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
    </main>
  );
}
