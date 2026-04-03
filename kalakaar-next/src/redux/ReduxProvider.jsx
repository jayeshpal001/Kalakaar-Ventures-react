"use client"; // Yeh line Next.js ko batati hai ki yeh Client Component hai

import { Provider } from "react-redux";
import { store } from "./store";

export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}