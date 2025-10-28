/**
 * Utility functions for handling page transitions and restarts
 */

/**
 * Trigger a full page restart by reloading the page
 */
export const restartPage = () => {
  window.location.reload();
};

/**
 * Add a class to the body when navigating to a specific page
 * @param pageName - The name of the page to mark as active
 */
export const markPageAsActive = (pageName: string) => {
  document.body.classList.add(`${pageName}-page-active`);
};

/**
 * Remove the active class from the body when leaving a page
 * @param pageName - The name of the page to mark as inactive
 */
export const markPageAsInactive = (pageName: string) => {
  document.body.classList.remove(`${pageName}-page-active`);
};

/**
 * Check if a specific page is marked as active
 * @param pageName - The name of the page to check
 * @returns boolean - Whether the page is active
 */
export const isPageActive = (pageName: string) => {
  return document.body.classList.contains(`${pageName}-page-active`);
};