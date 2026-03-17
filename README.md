This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## Environment Variables

Create a `.env.local` file in the root directory of the project and add the following variables:

- `NEXT_PUBLIC_CRYPTO_API_KEY`: Your CoinGecko API key. Get it from [CoinGecko API](https://www.coingecko.com/en/api).
- `NEXT_PUBLIC_CRYPTO_BASE_URL`: The base URL for the CoinGecko API, e.g., `https://api.coingecko.com/api/v3`.

Example `.env.local`:

```
NEXT_PUBLIC_CRYPTO_API_KEY=your_api_key_here
NEXT_PUBLIC_CRYPTO_BASE_URL=https://api.coingecko.com/api/v3
```

These variables are required for the app to fetch cryptocurrency data.

