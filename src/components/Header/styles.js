import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../theme";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
export const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 35,
    backgroundColor: COLORS.LIGHT_BLUE,
    paddingTop: getStatusBarHeight() + 15,
    paddingBottom: 35,
  },
  logo: {
    alignItems: "center",
    justifyContent: "center",
    width: 35,
    height: 35,
  },
  avatar: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 28,
  },
});
