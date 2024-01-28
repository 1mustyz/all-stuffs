import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  tagTypes: ["Post"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3008/" }),

  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => `posts`,

      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: "Posts", id })),
              { type: "Posts", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: "Posts", id: "LIST" }],
    }),

    createPost: builder.mutation({
      query: (data) => ({
        url: `https://ai.gateway.cliveai.com/api/v1/recognize-intent`,
        method: "POST",
        body: {
          sentence: "Thanks so so much",
        },
      }),

      // invalidatesTags: [{ type: "Posts", id: "LIST" }],

      //   transformResponse: (response, meta, arg) => ({...response, age: 70 }),
    }),

    updatePost: builder.mutation({
      query({ id, ...body }) {
        return {
          url: `posts/${id}`,
          method: "PUT",
          body,
        };
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      // In this case, `getPost` will be re-run. `getPosts` *might*  rerun, if this id was under its results.
      invalidatesTags: (result, error, { id }) => [{ type: "Posts", id }],
    }),
    deletePost: builder.mutation({
      query(id) {
        return {
          url: `posts/${id}`,
          method: "DELETE",
        };
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      invalidatesTags: (result, error, id) => [{ type: "Posts", id }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;
