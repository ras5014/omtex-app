import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date) => {
  const dateArr = date.split("-");
  const day = dateArr[2];
  const month = dateArr[1];
  const year = dateArr[0];
  return `${day}-${month}-${year}`;
};

// Generic function to handle Strapi API requests
export async function handleStrapiRequest(
  requestFn: () => Promise<any>,
  successMessage: string,
  entityName: string
) {
  try {
    const res = await requestFn();

    if (res.status === 201) {
      return { success: true, message: successMessage };
    }

    return { success: true, message: successMessage };
  } catch (error: unknown) {
    console.error(error);

    // Handle axios error response
    const axiosError = error as AxiosErrorResponse;
    if (axiosError.response) {
      const { status, data } = axiosError.response;

      // Handle different error status codes
      if (status === 400) {
        // Validation errors from Strapi
        if (data.error && data.error.details) {
          const validationErrors = data.error.details.errors;
          const errorMessages = validationErrors
            .map((err: ValidationError) => {
              const fieldName = err.path[err.path.length - 1];
              return `${fieldName}: ${err.message}`;
            })
            .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
            .join(", ");
          return { success: false, message: errorMessages };
        }

        // General 400 error
        return {
          success: false,
          message: data.error?.message || "Invalid data provided",
        };
      }

      if (status === 409) {
        return {
          success: false,
          message: `${entityName} with this information already exists`,
        };
      }

      if (status === 422) {
        // Strapi validation errors
        if (data.error && data.error.details) {
          const validationErrors = data.error.details.errors;
          const errorMessages = validationErrors
            .map((err: ValidationError) => {
              const fieldName = err.path[err.path.length - 1];
              return `${fieldName}: ${err.message}`;
            })
            .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
            .join(", ");
          return { success: false, message: errorMessages };
        }
      }

      // Generic error message for other status codes
      return {
        success: false,
        message:
          data.error?.message ||
          `Failed to create ${entityName} (Status: ${status})`,
      };
    }

    // Network or other errors
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}
