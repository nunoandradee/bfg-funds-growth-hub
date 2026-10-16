import { QueryClient } from "@tanstack/react-query";
import { Link, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

function DefaultErrorComponent() {
  return (
    <main className="grid min-h-screen place-items-center bg-background px-5">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-navy">This page didn’t load</h1>
        <p className="mt-3 text-muted-foreground">Please try again or return to the home page.</p>
        <Link to="/" className="mt-6 inline-flex rounded-full bg-navy px-6 py-3 text-sm font-bold text-navy-foreground">Go home</Link>
      </div>
    </main>
  );
}

function DefaultNotFoundComponent() {
  return (
    <main className="grid min-h-screen place-items-center bg-background px-5">
      <div className="text-center">
        <p className="text-sm font-bold uppercase text-cobalt">404</p>
        <h1 className="mt-3 text-3xl font-extrabold text-navy">Page not found</h1>
        <Link to="/" className="mt-6 inline-flex rounded-full bg-navy px-6 py-3 text-sm font-bold text-navy-foreground">Go home</Link>
      </div>
    </main>
  );
}

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultErrorComponent,
    defaultNotFoundComponent: DefaultNotFoundComponent,
  });

  return router;
};
