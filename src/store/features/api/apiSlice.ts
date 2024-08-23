import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
// Api other than login will implement here
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://35.173.251.167/dev',
  credentials: 'same-origin',
});

// Api for login will implement here
const baseQueryForLogin = fetchBaseQuery({
  baseUrl: '/api',
  credentials: 'same-origin',
  prepareHeaders: (headers) => {
    headers.set('Accept', 'application/*');
    return headers;
  },
});
// Custom baseQuery function to choose the correct baseQuery
const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  if (
    typeof args === 'string'
      ? args.startsWith('/auth-customer/login')
      : args.url.startsWith('/auth-customer/login')
  ) {
    return baseQueryForLogin(args, api, extraOptions);
  } else {
    return baseQuery(args, api, extraOptions);
  }
};
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: customBaseQuery,
  tagTypes: ['Users', 'User', 'Profile'],
  endpoints: () => ({}),
});
