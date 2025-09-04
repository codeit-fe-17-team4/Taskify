export interface SignupParams {
  email: string;
  nickname: string;
  password: string;
}

export interface UpdateMyInfoParams {
  nickname: string;
  profileImageUrl: string;
}

export interface UploadProfileImageParams {
  image: File;
}
