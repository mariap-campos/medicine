import { StyleSheet } from "react-native";
import { COLORS } from "../../theme";

export const styles = StyleSheet.create({
  bottomNavigation: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    justifyContent: "space-around",
    width: "100%",
    height: 70,
    backgroundColor: COLORS.LIGHT_BLUE,
    zIndex: 20,
  },
  navText: {
    marginTop: -10,
    color: COLORS.WHITE,
    textAlign: "center",
  },
});
