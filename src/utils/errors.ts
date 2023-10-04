import { hasProperty, isObject } from '@metamask/utils';

/**
 * Format an error message. This function capitalizes the first letter of the
 * message and adds a period at the end if it doesn't already have one.
 *
 * @param message - The error message to format.
 * @returns The formatted error message.
 */
export function formatErrorMessage(message: string) {
  const capitalizedMessage = message.charAt(0).toUpperCase() + message.slice(1);

  if (!message.endsWith('.')) {
    return `${capitalizedMessage}.`;
  }

  return capitalizedMessage;
}

/**
 * Get the error message from an unknown error type.
 *
 * - If the error is an object with a `message` property, return the message.
 * - Otherwise, return the error converted to a string.
 *
 * @param error - The error to get the message from.
 * @returns The error message.
 */
export function getErrorMessage(error: unknown) {
  if (
    isObject(error) &&
    hasProperty(error, 'message') &&
    typeof error.message === 'string'
  ) {
    return formatErrorMessage(error.message);
  }

  return formatErrorMessage(String(error));
}
