## Yêu cầu

- Node.js: khuyến nghị **>= 20.9** (phù hợp với Next.js 16)
- npm: đi kèm Node

## Cài dependencies

```bash
npm install --legacy-peer-deps
```

## Chạy dev

```bash
npm run dev
```

Mặc định mở: http://localhost:3000

## Build + chạy production

```bash
npm run build
npm start
```

## Lint

```bash
npm run lint
```

## Environment variables

- `NEXT_PUBLIC_API_URL` (tuỳ chọn): Base URL cho backend API.
  - Nếu không set, frontend sẽ fallback sang `http://localhost:8080` (xem `src/api/axiosClient.ts`).

Ví dụ tạo file `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
```
