// import toast from 'react-hot-toast';

import { apiSlice } from '../api/apiSlice';
import { userLoggedIn, userLoggedOut } from './authSlice';
import { jwtExpMsg } from '@/configs/constants';
import {
  LOGIN_ENDPOINT,
  LOGOUT_ENDPOINT,
  SIGNUP_ENDPOINT,
  INITIAL_TRANSACTION,
  VERIFY_OTP_NO,
  VERIFY_PHONE_NO,
  VERIFY_SSN,
  GET_BALANCE,
  GET_CARD_DETAILS,
  REGISTER_ENDPOINT,
  MAILING_ENDPOINT,
  TNC_ENDPOINT,
  KYC_ENDPOINT,
} from '../api/endpoints';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get otp on phone no endpoint here
    verifyPhoneNo: builder.mutation({
      query: (data) => ({
        url: VERIFY_PHONE_NO,
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          // toast.success(result.data.message);
        } catch (error: any) {
          // toast.error(error?.error?.data?.message);
        }
      },
    }),
    // verify otp endpoint here
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: VERIFY_OTP_NO,
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          // toast.success(result.data.message);
        } catch (error: any) {
          // toast.error(error?.error?.data?.message);
        }
      },
    }),
    // verify ssn endpoint here
    verifySsn: builder.mutation({
      query: (data) => ({
        url: VERIFY_SSN,
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          // toast.success(result.data.message);
        } catch (error: any) {
          // toast.error(error?.error?.data?.message);
        }
      },
    }),
    // transfer funds endpoint here
    transferFunds: builder.mutation({
      query: (data) => ({
        url: INITIAL_TRANSACTION,
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          // toast.success(result.data.message);
        } catch (error: any) {
          // toast.error(error?.error?.data?.message);
        }
      },
    }),
    // signup endpoint here
    signUp: builder.mutation({
      query: (data) => ({
        url: SIGNUP_ENDPOINT,
        method: 'POST',
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          // toast.success(result.data.message);
        } catch (error: any) {
          // toast.error(error?.error?.data?.message);
        }
      },
    }),
    // personal info endpoint here
    personalInfo: builder.mutation({
      query: (data) => ({
        url: REGISTER_ENDPOINT,
        method: 'PATCH',
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          // toast.success(result.data.message);
        } catch (error: any) {
          // toast.error(error?.error?.data?.message);
        }
      },
    }),
    // mailing info endpoint here
    mailingInfo: builder.mutation({
      query: (data) => ({
        url: MAILING_ENDPOINT,
        method: 'PATCH',
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          // toast.success(result.data.message);
        } catch (error: any) {
          // toast.error(error?.error?.data?.message);
        }
      },
    }),
    // terms and conditions verification endpoint here
    tncVerify: builder.mutation({
      query: (data) => ({
        url: TNC_ENDPOINT,
        method: 'PATCH',
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          // toast.success(result.data.message);
        } catch (error: any) {
          // toast.error(error?.error?.data?.message);
        }
      },
    }),
    // login endpoint here
    login: builder.mutation({
      query: (data) => ({
        url: LOGIN_ENDPOINT,
        method: 'POST',
        body: JSON.stringify(data),
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // setting logged data to redux state
          dispatch(
            userLoggedIn({
              user: result.data.data.user,
            })
          );

          // toast.success(result.data.message);
        } catch (error: any) {
          // toast.error(error?.error?.data?.message);
        }
      },
    }),
    // get balance endpoint here
    getBalance: builder.mutation({
      query: (data) => ({
        url: GET_BALANCE,
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(data.body),
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          // setting logged data to redux state
          // toast.success(result.data.message);
        } catch (error: any) {
          // toast.error(error?.error?.data?.message);
        }
      },
    }),
    // card detail endpoint here
    getCardDetail: builder.mutation({
      query: (data) => ({
        url: GET_CARD_DETAILS,
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(data.body),
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          // setting logged data to redux state
          // toast.success(result.data.message);
        } catch (error: any) {
          // toast.error(error?.error?.data?.message);
        }
      },
    }),
    // logout endpoint here
    logout: builder.mutation({
      query: () => ({
        url: LOGOUT_ENDPOINT,
        method: 'POST',
        credentials: 'include',
      }),
      async onQueryStarted({ queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          // toast.success(result.data.message);
        } catch (error: any) {
          // toast.error(error?.error?.data?.message);
        }
      },
    }),
    // get profile endpoint here
    getProfile: builder.query({
      query: () => `auth/profile`,
      providesTags: ['Profile'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data.data }));
        } catch (error: any) {
          if (error.error.data.message === jwtExpMsg) {
            dispatch(userLoggedOut());
          }
          // toast.error(error.error.data.message);
        }
      },
    }),
    // get kyc endpoint here
    getKyc: builder.query({
      query: (id: string) => ({
        url: KYC_ENDPOINT,
        params: { id },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (error: any) {
          if (error.error.data.message === jwtExpMsg) {
            dispatch(userLoggedOut());
          }
          // toast.error(error.error.data.message);
        }
      },
    }),
  }),
});

export const {
  useVerifyPhoneNoMutation,
  useVerifyOtpMutation,
  useSignUpMutation,
  useVerifySsnMutation,
  useTransferFundsMutation,
  useLoginMutation,
  useGetBalanceMutation,
  useGetCardDetailMutation,
  useLogoutMutation,
  useGetProfileQuery,
  usePersonalInfoMutation,
  useMailingInfoMutation,
  useTncVerifyMutation,
  useLazyGetKycQuery
} = authApi;
