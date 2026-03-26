import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,

        // attach JWT token automatically
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

        updateProject: builder.mutation({
            query: ({ id, ...updatedData }) => ({
                url: `/portfolio/${id}`,
                method: 'PUT',
                body: updatedData,
            }),
            invalidatesTags: ['Project'],
        }),

        deleteProject: builder.mutation({
            query: (id) => ({
                url: `/portfolio/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Project'],
        }),

        uploadMedia: builder.mutation({
            query: (fileData) => ({
                url: '/upload',
                method: 'POST',
                body: fileData,
            }),
        }),

        loginAdmin: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),

        reorderProjects: builder.mutation({
            query: (reorderedProjects) => ({
                url: '/portfolio/reorder',
                method: 'PUT',
                body: { reorderedProjects },
            }),
        }),
        // FIXED POSITION
        sendMessage: builder.mutation({
            query: (messageData) => ({
                url: '/contact',
                method: 'POST',
                body: messageData,
            }),
        }),

    }),
});

export const {
    useGetProjectsQuery,
    useAddProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
    useUploadMediaMutation,
    useLoginAdminMutation,
    useSendMessageMutation,
    useReorderProjectsMutation
} = apiSlice;