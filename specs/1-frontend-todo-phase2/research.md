# Research & Decisions: Frontend Todo App

This document records the key technical decisions made during the planning phase.

## 1. Authentication Strategy

-   **Decision**: Implement authentication using Next.js Middleware.
-   **Rationale**: Middleware is the recommended approach in Next.js for protecting routes. It runs before a request is completed, allowing us to check for a valid JWT token stored in cookies. If the token is missing or invalid, we can redirect the user to the sign-in page. This provides a secure and centralized way to handle authentication across the application.
-   **Alternatives Considered**:
    -   **Higher-Order Components (HOCs)**: An older pattern. Less efficient than middleware as it requires wrapping each protected page, leading to more boilerplate and potential for inconsistencies.
    -   **Client-side checks in a layout component**: Can cause a "flash" of unprotected content before the redirect happens. Middleware is more secure as it's server-side.

## 2. State Management

-   **Decision**: Use React Context for global authentication state and a dedicated library like SWR (Stale-While-Revalidate) for server state (task data).
-   **Rationale**:
    -   **React Context**: Sufficient for simple, low-frequency updates like sharing the current user's authentication status and profile information across components. It's built-in, avoiding an extra dependency.
    -   **SWR**: Ideal for managing the state of data fetched from the backend. It simplifies data fetching, caching, and re-validation, providing a better user experience with features like automatic refetching on window focus.
-   **Alternatives Considered**:
    -   **Redux/Zustand**: More powerful global state management libraries. Considered overkill for the current scope, which does not involve complex, high-frequency client-side state updates. React Context is simpler for our needs.
    -   **Using only `fetch` and `useState`**: This would require manually handling loading states, error states, and caching logic, which SWR provides out-of-the-box.

## 3. Data Fetching Patterns

-   **Decision**: Employ a hybrid approach utilizing both Server Components and Client Components for data fetching.
-   **Rationale**:
    -   **Server Components (RSCs)**: Fetch data on the server for the initial page load (e.g., the initial list of tasks on the `/tasks` page). This improves performance by sending a fully rendered HTML page to the client, reducing the client-side JavaScript bundle size.
    -   **Client Components with SWR**: Use for any data fetching that is interactive or needs to be re-fetched on the client side (e.g., adding a new task, filtering the list, or data that changes frequently). This provides a dynamic and responsive user experience without requiring full-page reloads.
-   **Alternatives Considered**:
    -   **Traditional SPA approach (all client-side fetching)**: The default in older React apps. This is less performant for the initial load compared to using Server Components.
    -   **All Server Components**: While great for static content, this approach is not suitable for the interactive and dynamic nature of a task management application where the user expects immediate feedback.
