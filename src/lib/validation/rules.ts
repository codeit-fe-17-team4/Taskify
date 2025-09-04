import { useCallback, useMemo, useState } from 'react';
import {
  useFormValidation,
  type ValidationRules,
} from '@/hooks/useFormValidation';

/**
 * 이메일 검증
 */
export const validateEmail = (email: string): boolean => {
  // 빈 값이면 검증하지 않음
  if (!email.trim()) {
    return true;
  }
  const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/;

  return emailRegex.test(email);
};

/**
 * 비밀번호 검증 (8자 이상)
 */
export const validatePassword = (password: string): boolean => {
  // 빈 값이면 검증하지 않음
  if (!password.trim()) {
    return true;
  }

  return password.length >= 8;
};

/**
 * 닉네임 검증 (10자 이하)
 */
export const validateNickname = (nickname: string): boolean => {
  // 빈 값이면 검증하지 않음
  if (!nickname.trim()) {
    return true;
  }

  return nickname.length <= 10;
};

/**
 * 비밀번호 확인 검증
 */
export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): boolean => {
  return password === confirmPassword;
};

/**
 * 로그인용 이메일 검증 (빈 값 허용하지 않음)
 */
const validateLoginEmail = (email: string): boolean => {
  if (!email.trim()) {
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/;

  return emailRegex.test(email);
};

/**
 * 로그인용 비밀번호 검증 (빈 값 허용하지 않음)
 */
const validateLoginPassword = (password: string): boolean => {
  if (!password.trim()) {
    return false;
  }

  return password.length >= 8;
};

// 로그인 폼 검증 규칙
export const loginValidationRules: ValidationRules = {
  email: {
    validator: validateLoginEmail,
    errorMessage: '이메일 형식으로 작성해 주세요.',
  },
  password: {
    validator: validateLoginPassword,
    errorMessage: '8자 이상 입력해주세요.',
  },
};

/**
 * 로그인 전용 검증 훅
 */
export const useLoginValidation = (): ReturnType<typeof useFormValidation> & {
  isFormValid: (values: Record<string, string>) => boolean;
} => {
  const baseValidation = useFormValidation(loginValidationRules);

  // 로그인용 isFormValid (빈 값 허용하지 않음)
  const isLoginFormValid = useCallback(
    (values: Record<string, string>): boolean => {
      return Object.keys(loginValidationRules).every((fieldName) => {
        const rule = loginValidationRules[fieldName];
        const value = values[fieldName] || '';

        // 빈 값이면 false 반환
        if (!value.trim()) {
          return false;
        }

        return rule.validator(value);
      });
    },
    []
  );

  return {
    ...baseValidation,
    isFormValid: isLoginFormValid,
  };
};

/**
 * 회원가입 폼 검증 규칙 (안정적인 참조를 위해 함수로 변경)
 */
export const getSignupValidationRules = (): ValidationRules => {
  return {
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
  };
};

/**
 * 비밀번호 확인 검증을 위한 커스텀 훅
 */
export const useSignupValidation = (): ReturnType<typeof useFormValidation> & {
  confirmPasswordError: string;
  validateConfirmPassword: (
    password: string,
    confirmPassword: string
  ) => boolean;
  isSignupFormValid: (
    values: Record<string, string>,
    options?: { skipConfirmPassword?: boolean }
  ) => boolean;
} => {
  // 검증 규칙을 useMemo로 메모이제이션하여 안정적인 참조 보장
  const signupRules = useMemo(() => getSignupValidationRules(), []);
  const baseValidation = useFormValidation(signupRules);
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateConfirmPasswordField = useCallback(
    (password: string, confirmPassword: string): boolean => {
      // 비밀번호가 비어있으면 검증하지 않음
      if (!password.trim() || !confirmPassword.trim()) {
        setConfirmPasswordError('');

        return true;
      }

      const isValid = password === confirmPassword;

      setConfirmPasswordError(isValid ? '' : '비밀번호가 일치하지 않습니다.');

      return isValid;
    },
    []
  );

  const isSignupFormValid = useCallback(
    (values: Record<string, string>, { skipConfirmPassword = false } = {}) => {
      const baseValid = baseValidation.isFormValid(values);

      // skipConfirmPassword가 true이거나 비밀번호가 비어있으면 확인 비밀번호 검증을 건너뛰기
      const confirmValid =
        skipConfirmPassword || !values.password || !values.confirmPassword
          ? true
          : validateConfirmPasswordField(
              values.password,
              values.confirmPassword
            );

      return baseValid && confirmValid;
    },
    [baseValidation.isFormValid, validateConfirmPasswordField]
  );

  return {
    ...baseValidation,
    confirmPasswordError,
    validateConfirmPassword: validateConfirmPasswordField,
    isSignupFormValid,
  };
};
