import { User, SignUpDetails, TransactionDetails } from '@/lib/types';

export interface IInitialState {
  initialTransaction: TransactionDetails | null | undefined;
  signUpDetail: SignUpDetails | null | undefined;
  user: User | null | undefined;
  isAuthenticated: boolean;
}
