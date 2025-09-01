import type * as i from '@/lib/users/interface';
import {
  signupSchema,
  type SignupType,
  userSchema,
  type UserType,
  updateMyInfoSchema,
  type UpdateMyInfoType,
  uploadProfileImageSchema,
  type UploadProfileImageType,
} from '@/lib/users/type';
import { BASE_API_URL } from '@/lib/constants';
import customFetch from '@/lib/custom-fetch';

export const signup = async (params: i.SignupParams): Promise<SignupType> => {
  const { email, nickname, password } = params;

  const data = await customFetch(`${BASE_API_URL}/users`, signupSchema, {
    method: 'POST',
    body: JSON.stringify({ email, nickname, password }),
  });

  return data;
};

export const getMyInfo = async (): Promise<UserType> => {
  const data = await customFetch(`${BASE_API_URL}/users/me`, userSchema);

  return data;
};

export const updateMyInfo = async (
  params: i.UpdateMyInfoParams
): Promise<UpdateMyInfoType> => {
  const { nickname, profileImageUrl } = params;

  const data = await customFetch(
    `${BASE_API_URL}/users/me`,
    updateMyInfoSchema,
    {
      method: 'PUT',
      body: JSON.stringify({ nickname, profileImageUrl }),
    }
  );

  return data;
};

export const uploadProfileImage = async (
  params: i.UploadProfileImageParams
): Promise<UploadProfileImageType> => {
  const { image } = params;

  const formData = new FormData();
  formData.append('image', image);

  const data = await customFetch(
    `${BASE_API_URL}/users/me/image`,
    uploadProfileImageSchema,
    {
      method: 'POST',
      body: formData,
    }
  );

  return data;
};
