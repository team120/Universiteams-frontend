export class RegisterInputDto {
  name?: string;
  mail?: string;
  password?: string;
  university?: {
    id: number;
  };
}
