import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
  'X-RapidAPI-Key': 'ae147206cemsha032628a10e9536p1746fcjsn8abbadd3c0a1',
  'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com'
};

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });
const baseUrl = 'https://cryptocurrency-news2.p.rapidapi.com/v1';

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) => createRequest(`/news?lang=en&category=${newsCategory}`),
    }),
  }),
});


export const { useGetCryptoNewsQuery } = cryptoNewsApi;
