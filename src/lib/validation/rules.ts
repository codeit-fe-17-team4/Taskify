import { useState, useCallback, useMemo } from 'react';
import type { ValidationRules } from '@/hooks/useFormValidation';
import { useFormValidation } from '@/hooks/useFormValidation';

// 이메일 검증
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 비밀번호 검증 (8자 이상)
export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

// 닉네임 검증 (10자 이하)
export const validateNickname = (nickname: string): boolean => {
  return nickname.length <= 10;
};

// 비밀번호 확인 검증
export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): boolean => {
  return password === confirmPassword;
};

// 로그인 폼 검증 규칙
export const loginValidationRules: ValidationRules = {
  email: {
    validator: validateEmail,
    errorMessage: '이메일 형식으로 작성해 주세요.',
  },
  password: {
    validator: validatePassword,
    errorMessage: '8자 이상 입력해주세요.',
  },
};

// 회원가입 폼 검증 규칙 (안정적인 참조를 위해 함수로 변경)
export const getSignupValidationRules = (): ValidationRules => ({
  nickname: {
    validator: validateNickname,
    errorMessage: '열 자 이하로 작성해주세요.',
  },
  email: {
    validator: validateEmail,
    errorMessage: '이메일 형식으로 작성해 주세요.',
  },
  password: {
    validator: validatePassword,
    errorMessage: '8자 이상 입력해주세요.',
  },
});

// 비밀번호 확인 검증을 위한 커스텀 훅
export const useSignupValidation = () => {
  // 검증 규칙을 useMemo로 메모이제이션하여 안정적인 참조 보장
  const signupRules = useMemo(() => getSignupValidationRules(), []);
  const baseValidation = useFormValidation(signupRules);
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateConfirmPassword = useCallback(
    (password: string, confirmPassword: string): boolean => {
      const isValid = password === confirmPassword;
      setConfirmPasswordError(isValid ? '' : '비밀번호가 일치하지 않습니다.');
      return isValid;
    },
    []
  );

  const isSignupFormValid = useCallback(
    (values: Record<string, string>) => {
      return (
        baseValidation.isFormValid(values) &&
        validateConfirmPassword(values.password, values.confirmPassword)
      );
    },
    [baseValidation.isFormValid, validateConfirmPassword]
  );

  return {
    ...baseValidation,
    confirmPasswordError,
    validateConfirmPassword,
    isSignupFormValid,
  };
};
