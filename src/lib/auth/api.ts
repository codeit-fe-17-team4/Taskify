import type * as i from '@/lib/auth/interface';
import {
  changePasswordSchema,
  loginSchema,
  type LoginType,
} from '@/lib/auth/type';
import { BASE_API_URL } from '@/lib/constants';
import customFetch from '@/lib/custom-fetch';

export const login = async (params: i.LoginParams): Promise<LoginType> => {
  const { email, password } = params;

  const data = await customFetch(`${BASE_API_URL}/auth/login`, loginSchema, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  return data;
};

export const changePassword = async (
  params: i.ChangePasswordParams
): Promise<void> => {
  const { password, newPassword } = params;

  await customFetch(`${BASE_API_URL}/auth/password`, changePasswordSchema, {
    method: 'PUT',
    body: JSON.stringify({ password, newPassword }),
  });
};
