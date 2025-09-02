import { useState, useCallback } from 'react';

export interface ValidationRule {
  validator: (value: string) => boolean;
  errorMessage: string;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export interface FormErrors {
  [key: string]: string;
}

export interface UseFormValidationReturn {
  errors: FormErrors;
  validateField: (fieldName: string, value: string) => boolean;
  validateAllFields: (values: Record<string, string>) => boolean;
  clearError: (fieldName: string) => void;
  clearAllErrors: () => void;
  isFieldValid: (fieldName: string, value: string) => boolean;
  isFormValid: (values: Record<string, string>) => boolean;
}

export function useFormValidation(
  rules: ValidationRules
): UseFormValidationReturn {
  const [errors, setErrors] = useState<FormErrors>({});

  const validateField = useCallback(
    (fieldName: string, value: string): boolean => {
      const rule = rules[fieldName];
      if (!rule) return true;

      const isValid = rule.validator(value);

      setErrors((prev) => ({
        ...prev,
        [fieldName]: isValid ? '' : rule.errorMessage,
      }));

      return isValid;
    },
    [rules]
  );

  const validateAllFields = useCallback(
    (values: Record<string, string>): boolean => {
      let allValid = true;
      const newErrors: FormErrors = {};

      Object.keys(rules).forEach((fieldName) => {
        const rule = rules[fieldName];
        const value = values[fieldName] || '';
        const isValid = rule.validator(value);

        if (!isValid) {
          allValid = false;
          newErrors[fieldName] = rule.errorMessage;
        }
      });

      setErrors(newErrors);
      return allValid;
    },
    [rules]
  );

  const clearError = useCallback((fieldName: string) => {
    setErrors((prev) => ({
      ...prev,
      [fieldName]: '',
    }));
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  const isFieldValid = useCallback(
    (fieldName: string, value: string): boolean => {
      const rule = rules[fieldName];
      if (!rule) return true;
      return rule.validator(value);
    },
    [rules]
  );

  const isFormValid = useCallback(
    (values: Record<string, string>): boolean => {
      return Object.keys(rules).every((fieldName) => {
        const rule = rules[fieldName];
        const value = values[fieldName] || '';
        return rule.validator(value);
      });
    },
    [rules]
  );

  return {
    errors,
    validateField,
    validateAllFields,
    clearError,
    clearAllErrors,
    isFieldValid,
    isFormValid,
  };
}
