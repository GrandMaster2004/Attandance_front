import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// app.use(cors({ origin: 'http://localhost:5173', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', credentials: true, // Include if you need to send cookies or other credentials in requests }));
// Define a service using a base URL and expected endpoints
export const userAuthApi = createApi({
  reducerPath: "userAuthApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api/user/" }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => {
        return {
          url: "sign/",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    loginUser: builder.mutation({
      query: (user) => {
        return {
          url: "login/",
          // mode: "no-cors",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    getLoggedUser: builder.query({
      query: (access_token) => ({
        url: "profile/",
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    }),

    saveUserData: builder.mutation({
      query: ({ actualData, access_token }) => {
        return {
          url: "saveUserData/",
          method: "POST",
          body: actualData,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    superUserData: builder.mutation({
      query: ({ firstData, access_token }) => {
        return {
          url: "superUser/",
          method: "POST",
          body: firstData,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    superUserDatanext: builder.mutation({
      query: ({ secondData, access_token }) => {
        return {
          url: "superUser_next/",
          method: "POST",
          body: secondData,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    sendEmail: builder.mutation({
      query: ({ actualData, access_token }) => {
        return {
          url: "sendemail/",
          method: "POST",
          body: actualData,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    sendData: builder.mutation({
      query: ({ actualData, access_token }) => {
        return {
          url: "senddata/",
          method: "POST",
          body: actualData,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),

    isEmail: builder.mutation({
      query: ({ actualData, access_token }) => {
        return {
          url: "is_email/",
          method: "POST",
          body: actualData,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    resetPassword: builder.mutation({
      query: ({ actualData, id, token }) => {
        return {
          url: `/reset-password/${id}/${token}/`,
          method: "POST",
          body: actualData,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetLoggedUserQuery,
  useSaveUserDataMutation,
  useSuperUserDatanextMutation,
  useSuperUserDataMutation,
  useSendEmailMutation,
  useIsEmailMutation,
  useResetPasswordMutation,
  useSendDataMutation,
} = userAuthApi;
