/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState, useCallback } from "react";
import { Snackbar } from "react-native-paper";
import { COLORS } from "../theme";

export const SnackBarContext = createContext();

export function SnackBarProvider({ children }) {
  const [snackbar, setSnackbar] = useState();
  const [visible, setVisible] = useState(false);

  const addSnackbar = useCallback((message) => {
    setSnackbar(message);
    setVisible(true);
  }, []);

  return (
    <SnackBarContext.Provider value={{ addSnackbar }}>
      {children}
      <Snackbar
        visible={visible}
        duration={4000}
        onDismiss={() => setVisible(false)}
        style={{ backgroundColor: COLORS.GRAY_DARK }}
      >
        {snackbar}
      </Snackbar>
    </SnackBarContext.Provider>
  );
}
