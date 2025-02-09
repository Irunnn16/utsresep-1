import { SessionProvider } from "@/contexts/ctx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";

export default function Root() {
  return(
    <QueryClientProvider client={new QueryClient}>
      <SessionProvider>
        <Slot />
      </SessionProvider>
    </QueryClientProvider>
  )
}