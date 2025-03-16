/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly APP_DEV_BASE_API_URL: string;
  readonly APP_PROD_BASE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
