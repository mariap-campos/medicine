/* eslint-disable camelcase */
import React from "react";
import "react-native-gesture-handler";
import AppLoading from "expo-app-loading";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { Home } from "./src/screens/Home";
import { History } from "./src/screens/History";
import { SnackBarProvider } from "./src/context/snackbar";
import { EditRoutine } from "./src/screens/EditRoutine";
import { Stats } from "./src/screens/Stats";

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <PaperProvider>
      <NavigationContainer>
        <SnackBarProvider>
          <Stack.Navigator
            screenOptions={{ animationEnabled: false, headerShown: false }}
          >
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                animationEnabled: false,
              }}
            />
            <Stack.Screen name="History" component={History} />
            <Stack.Screen name="EditRoutine" component={EditRoutine} />
            <Stack.Screen name="Stats" component={Stats} />
          </Stack.Navigator>
        </SnackBarProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}
