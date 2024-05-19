// typings.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL: string;
      NEXT_PUBLIC_LOCAL_API_URL: string;
      NEXT_PUBLIC_ICON_URL: string;
      // Add other environment variables here as needed
    }
  }