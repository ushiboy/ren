import { RepositoryContextProvider } from "@/presentations/contexts";
import {
  RepositoryComposition,
  repositoryComposition,
} from "@/repositoryComposition";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export type OverrideRepositories = Partial<RepositoryComposition>;

type WebApiWrapProps = {
  client: QueryClient;
  children: React.ReactNode;
  overrideRepositories?: OverrideRepositories;
};

export function WebApiWrap({
  children,
  client,
  overrideRepositories = {},
}: WebApiWrapProps) {
  return (
    <QueryClientProvider client={client}>
      <RepositoryContextProvider
        repositoryComposition={{
          ...repositoryComposition,
          ...overrideRepositories,
        }}
      >
        {children}
      </RepositoryContextProvider>
    </QueryClientProvider>
  );
}
