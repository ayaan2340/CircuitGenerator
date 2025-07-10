/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly PORT?: string;
    readonly SERVER_URL?: string;
  }
}

export {}; 