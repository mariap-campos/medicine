import { StyleSheet } from "react-native";
import { COLORS } from "../../theme";

export const styles = StyleSheet.create({
  logoBack: {
    width: 35,
    height: 35,
    backgroundColor: COLORS.GRAY_PRIMARY,
    borderRadius: 20,
  },
  logo: {
    width: 18,
    height: 18,
    marginLeft: 9,
    marginTop: 8,
  },
  card: {
    display: "flex",
    flexDirection: "row",
    marginTop: 15,
  },
});
