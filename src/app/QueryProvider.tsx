import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, FC } from "react";

const client = new QueryClient();
const QueryProvider: FC<PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={client}>{children}</QueryClientProvider>
);

export default QueryProvider;
