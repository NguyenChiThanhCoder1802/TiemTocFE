export interface UserDto {
  id: string;
  email: string;
  fullName: string;
  emailConfirmed: boolean;
  lockoutEnd: string | null;
}
