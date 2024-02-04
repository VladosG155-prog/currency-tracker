export {};
declare global {
  interface Window {
    store: any;
  }
  namespace NodeJS {
    export interface ProcessEnv {
      [key: string]: string | undefined;
    }
  }
}

