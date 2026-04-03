import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,

        // Attach JWT token automatically with Next.js SSR Safety
        prepareHeaders: (headers) => {
            // NEXT.JS FIX: Check if we are on the client (browser) before accessing localStorage
            if (typeof window !== 'undefined') {
                const token = localStorage.getItem('kalakaar_token');
                if (token) {
                    headers.set('authorization', `Bearer ${token}`);
                }
            }
            return headers;
        },
    }),

    tagTypes: ['Project'],

    endpoints: (builder) => ({

        // 🔥 THE BEAST MODE UPDATE: Pagination aur Filters apply kar diye gaye hain
        getProjects: builder.query({
            query: ({ page = 1, limit = 8, category = 'All' } = {}) => {
                let url = `/portfolio?page=${page}&limit=${limit}`;
                if (category && category !== 'All') {
                    url += `&category=${category}`;
                }
                return url;
            },
            // Ab hum array ki jagah object return karenge jisme data aur pagination dono honge
            transformResponse: (response) => ({
                projects: response.data,
                pagination: response.pagination
            }),
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