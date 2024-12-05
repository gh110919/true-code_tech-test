"use client";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Index } from "./pages";
import { Provider } from "react-redux";
import { rootStore } from "../frontend/global-state";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Home() {
  return (
    <Provider store={rootStore}>
      <QueryClientProvider client={new QueryClient()}>
        <BrowserRouter
          future={{
            v7_relativeSplatPath: true,
            v7_startTransition: true,
          }}
        >
          <Routes>
            <Route path="/" element={<Index></Index>}></Route>
            <Route
              path="*"
              element={
                <div>
                  <h1>Not Found</h1>
                </div>
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}
