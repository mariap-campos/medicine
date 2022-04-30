import { StyleSheet } from "react-native";
import { COLORS, FONTS } from ".";

export const globalStyles = StyleSheet.create({
  title: {
    fontFamily: FONTS.BOLD,
    color: COLORS.GRAY_DARK,
    fontSize: 18,
  },
  text: {
    color: COLORS.GRAY_DARK,
    fontFamily: FONTS.REGULAR,
    fontSize: 14,
  },
  loading: {
    marginTop: 300,
  },
});
