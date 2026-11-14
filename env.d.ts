/// <reference types="vite/client" />
/// <reference types="react-router" />
/// <reference types="@shopify/oxygen-workers-types" />
/// <reference types="@shopify/hydrogen/react-router-types" />

// Enhance TypeScript's built-in typings.
import '@total-typescript/ts-reset';

declare global {
  interface Env {
    /** Server-only key for the BhaktiHub forms API. Never sent to the browser. */
    BHAKTIHUB_FORMS_API_KEY: string;
  }
}
