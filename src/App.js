import React from "react";
import Router from "react-router";
import GlobalStyle from "./components/styles/GlobalStyle";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Router />
      </QueryClientProvider>
    </>
  );
}
export default App;
