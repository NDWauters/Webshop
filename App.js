import React from "react";
import AuthUserProvider from "./src/contexts/AuthUserProvider";
import RootNavigator from "./src/navigation/RootNavigator";
import { Provider } from 'react-redux';
import store from "./src/store";
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {

  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthUserProvider>
          <RootNavigator />
        </AuthUserProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;