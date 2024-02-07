export {};
declare global {
  interface Window {
    store: unknown;
  }
  namespace NodeJS {
    export interface ProcessEnv {
      [key: string]: string | undefined;
    }
  }
}
