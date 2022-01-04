import React from "react";
import AuthUserProvider from "./src/contexts/AuthUserProvider";
import RootNavigator from "./src/navigation/RootNavigator";
import { Provider } from 'react-redux';
import store from "./src/store";
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { LogBox } from "react-native";

const App = () => {

  const persistor = persistStore(store);

  //ignore warnings in application => still visible in terminal
  // AsyncStorage: some libraries in node_modules still import AsyncStorage the old way.
  // timer: in android , I keep getting a warning of a timer => firebase libraries creates this problem.
  // VirtualizedLists: Sometimes I get this warning if I go to details of a product. I tried optimizing my lists,
  // but still get the warning.
  LogBox.ignoreLogs(['AsyncStorage', 'timer', 'VirtualizedLists'])

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