export interface Login {
  email: string;
  password: string;
}

export interface Register {
  username: string;
  email: string;
  phone: string;
  password: string;
}

export type UserRequest = Register;
export type User = Omit<Register, 'password'> & { id: number };
