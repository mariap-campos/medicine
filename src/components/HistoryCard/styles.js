import { StyleSheet } from "react-native";
import { COLORS } from "../../theme";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    position: "relative",
    minHeight: 72,
    marginVertical: 8,
  },
  tag: {
    backgroundColor: COLORS.GREEN,
  },
  title: {
    marginLeft: 10,
    marginTop: 2,
    alignSelf: "center",
  },
  text: {
    color: COLORS.GRAY_DARK,
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  button: {
    position: "absolute",
    padding: 0,
    right: 15,
    borderWidth: 1,
    borderColor: COLORS.GRAY_PRIMARY,
    top: 14,
  },
  expand: {
    marginTop: 10,
  },
});
