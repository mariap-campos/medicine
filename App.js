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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Home } from "./src/screens/Home";
import { AddRemedy } from "./src/screens/AddRemedy";
import { SnackBarProvider } from "./src/context/snackbar";
import { EditRoutine } from "./src/screens/EditRoutine";

const Stack = createStackNavigator();

// AsyncStorage.clear();

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
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="AddRemedy" component={AddRemedy} />
            <Stack.Screen name="EditRoutine" component={EditRoutine} />
          </Stack.Navigator>
        </SnackBarProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}
