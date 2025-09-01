import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/auth-variables.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsLoading(true);
    try {
      // API 기능은 나중에 구현 예정
      // await login({ email, password });
      console.log('로그인 시도:', { email, password });

      // 임시로 로그인 성공 처리
      setTimeout(() => {
        router.push('/mydashboard');
      }, 1000);
    } catch (error: any) {
      console.error('Login failed:', error);
      // 로그인 실패 시 에러 처리
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      className={`${styles.auth} ${styles.bgAuth} flex min-h-screen items-center justify-center overflow-x-auto`}
    >
      <div className='flex h-auto min-h-[653px] w-[520px] shrink-0 flex-col items-center gap-[30px]'>
        {/* Hero Block */}
        <div className='flex h-[322px] w-[200px] flex-col items-center gap-[10px]'>
          <div className='flex h-[280px] w-[200px] flex-col items-center gap-[30px]'>
            <div className='relative h-[280px] w-[200px]'>
              <Link href='/' className='block h-full w-full'>
                <Image
                  src='/logo-auth.svg'
                  alt='Taskify Logo'
                  fill
                  className='object-contain object-center'
                  priority
                />
              </Link>
            </div>
          </div>
          <p
            className={`${styles.textStrong} mx-auto mt-[12px] h-auto w-auto overflow-visible text-center text-[20px] leading-[32px] font-[500] tracking-[-0.01em] whitespace-nowrap`}
          >
            오늘도 만나서 반가워요!
          </p>
        </div>

        {/* Form Wrapper */}
        <div className='flex w-[520px] flex-col items-center'>
          <form
            onSubmit={handleSubmit}
            className='flex w-[520px] flex-col items-start'
          >
            {/* Form Stack - 입력 + 버튼 + 하단 안내 */}
            <div className='flex flex-col space-y-6'>
              {/* Input Group */}
              <div className='flex w-[520px] flex-col items-start'>
                {/* Email Input */}
                <div className='flex w-[520px] flex-col gap-0'>
                  <label
                    htmlFor='email'
                    className={`${styles.textStrong} mb-2 text-[16px] leading-[26px]`}
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
                    className={`h-[50px] w-[520px] rounded-[8px] bg-white px-[16px] py-[15px] ring-1 placeholder:text-[var(--auth-placeholder)] focus:ring-2 focus:ring-[var(--auth-primary)] focus:outline-none focus-visible:outline-none ${
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
                      className='mt-2 text-[14px] leading-[24px] text-[var(--auth-error)]'
                      aria-live='polite'
                    >
                      {emailError}
                    </p>
                  )}
                </div>

                {/* Password Input */}
                <div className='flex w-[520px] flex-col gap-0'>
                  <label
                    htmlFor='password'
                    className={`${styles.textStrong} mt-[16px] mb-2 text-[16px] leading-[26px]`}
                  >
                    비밀번호
                  </label>
                  <div className='relative w-[520px]'>
                    <input
                      id='password'
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={handlePasswordBlur}
                      placeholder='비밀번호를 입력해 주세요'
                      className={`h-[50px] w-[520px] rounded-[8px] bg-white px-[16px] py-[12px] pr-10 ring-1 placeholder:text-[var(--auth-placeholder)] focus:ring-2 focus:ring-[var(--auth-primary)] focus:outline-none focus-visible:outline-none ${
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
                      className='absolute top-1/2 right-3 flex h-[24px] w-[24px] -translate-y-1/2 items-center justify-center'
                      aria-label={
                        showPassword ? '비밀번호 숨기기' : '비밀번호 보기'
                      }
                      aria-pressed={showPassword}
                    >
                      {showPassword ? (
                        <svg
                          width='24'
                          height='24'
                          viewBox='0 0 24 24'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M12 5C7 5 2.73 8.11 1 12.5C2.73 16.89 7 20 12 20C17 20 21.27 16.89 23 12.5C21.27 16.89 17 20 12 20C7 20 2.73 16.89 1 12.5C2.73 8.11 7 5 12 5Z'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                          <path
                            d='M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      ) : (
                        <svg
                          width='24'
                          height='24'
                          viewBox='0 0 24 24'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C1 12 4.243 4.243 12 4.243C14.1491 4.23513 16.2306 4.95603 17.94 6.259'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                          <path
                            d='M14.12 14.12C13.8454 14.4148 13.5141 14.6512 12.1462 14.8151C12.7782 14.9791 12.3807 15.0673 11.9781 15.0744C11.5755 15.0815 11.1747 15.0074 10.801 14.8565C10.4273 14.7056 10.0867 14.4806 9.80385 14.1968C9.52097 13.913 9.30026 13.5767 9.15448 13.2084C9.0087 12.8401 8.94084 12.4463 8.95458 12.0516C8.96833 11.6569 9.06351 11.2687 9.23506 10.9107C9.40661 10.5527 9.65085 10.2329 9.95354 9.97021C10.2562 9.70753 10.6109 9.50707 10.9951 9.38251C11.3793 9.25795 11.7863 9.21157 12.1901 9.24604C12.5939 9.28052 12.9877 9.39539 13.3486 9.58396C13.7096 9.77253 14.0308 10.0309 14.2946 10.3446'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                          <path
                            d='M9.9 4.24C10.5883 4.0789 11.2931 3.99836 12 4C19 4 23 12 23 12C23 12 21.757 19.757 14 19.757C13.2931 19.7556 12.5883 19.6751 11.9 19.514'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                          <path
                            d='M14.12 14.12L1 1'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  {passwordError && (
                    <p
                      id='password-error'
                      className='mt-2 text-[14px] leading-[24px] text-[var(--auth-error)]'
                      aria-live='polite'
                    >
                      {passwordError}
                    </p>
                  )}
                </div>
              </div>

              {/* Login Button */}
              <button
                type='submit'
                aria-disabled={!isFormValid || isLoading}
                disabled={!isFormValid || isLoading}
                className={`h-[50px] w-[520px] shrink-0 rounded-[8px] text-center text-[18px] leading-[26px] font-[500] text-white ${
                  isFormValid && !isLoading
                    ? 'cursor-pointer bg-[var(--auth-primary)] transition-opacity hover:opacity-90'
                    : 'cursor-not-allowed bg-[var(--auth-placeholder)]'
                }`}
              >
                {isLoading ? '로그인 중...' : '로그인'}
              </button>

              {/* Bottom Info */}
              <div
                className={`${styles.textStrong} w-[520px] text-center text-[16px] leading-[19px]`}
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
    </main>
  );
}
