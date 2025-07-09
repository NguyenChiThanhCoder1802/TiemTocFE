export interface UserDto {
  id: string;         // <- GUID
  email: string;
  fullName: string;
  emailConfirmed: boolean;
  lockoutEnd: string | null;
}
