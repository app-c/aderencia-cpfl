import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Route } from "./src/routes";
import { SingIn } from "./src/pages/signIn";
import AppProvider from "./src/hooks";

export default function App() {
  return (
    <NavigationContainer>
      <AppProvider>
        <View className="flex-1">
          <Route />
        </View>
      </AppProvider>
    </NavigationContainer>
  );
}
