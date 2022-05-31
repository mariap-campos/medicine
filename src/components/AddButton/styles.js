import { StyleSheet } from "react-native";
import { COLORS } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 20,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: COLORS.LIGHT_BLUE,
  },
  logo: {
    width: 35,
    height: 35,
    marginLeft: 12,
    marginTop: 12,
  },
  menu: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 4,
    width: 160,
    position: "absolute",
    bottom: 70,
    right: 0,
  },
  menuOption: {
    padding: 18,
  },
});
