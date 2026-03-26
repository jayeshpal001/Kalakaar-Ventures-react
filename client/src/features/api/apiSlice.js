import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_API_URL,
    // This intercepts every request and injects the JWT token if it exists
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('kalakaar_token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Project'], 
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => '/portfolio', 
      transformResponse: (response) => response.data,
      providesTags: ['Project'], 
    }),
    addProject: builder.mutation({
      query: (newProject) => ({
        url: '/portfolio',
        method: 'POST',
        body: newProject,
      }),
      invalidatesTags: ['Project'], 
    }),
    // The new authentication endpoint
    loginAdmin: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useGetProjectsQuery, useAddProjectMutation, useLoginAdminMutation } = apiSlice;