import { store } from "../../state/store";
import React, { memo } from "react";
import { Provider } from "react-redux";

const ProviderLayer: React.FC = memo(({ children }) => {
  // This layer provides for redux or react component states
  return <Provider store={store}>{children}</Provider>;
});

export default ProviderLayer;
