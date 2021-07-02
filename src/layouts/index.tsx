import ProviderLayer from "./wrappers/provider.wrapper";
import { BackTop } from "antd";
import React from "react";

/**
 * This is a wrapper for the app not a real layout
 * Please do not use this component or modify
 */
const App: React.FC = ({ children }) => (
  <ProviderLayer>
    <BackTop />
    {children}
  </ProviderLayer>
);

export default App;
