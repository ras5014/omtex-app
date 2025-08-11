export {};

declare global {
  // TypeScript interfaces for error handling
  interface ValidationError {
    path: string[];
    message: string;
  }

  interface StrapiErrorResponse {
    error: {
      status: number;
      name: string;
      message: string;
      details?: {
        errors: ValidationError[];
      };
    };
  }

  interface AxiosErrorResponse {
    response?: {
      status: number;
      data: StrapiErrorResponse;
    };
  }
}
