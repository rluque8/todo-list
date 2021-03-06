export interface IUserLoginDto {
  email: string;
  password: string;
}

export interface IUserRegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface IUserTokenDto {
  id: string;
  refreshToken: string;
}

export interface IUserTokenResponseDto {
  token: string;
}

export interface IUserLoginResponseDto {
  id: string;
  email: string;
  token: string;
  refreshToken: string;
}
