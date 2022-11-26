/* eslint-disable radix */
export const formatSlot = (slot) => {
  switch (slot) {
    case 0:
      return "A";
    case 1:
      return "B";
    case 2:
      return "C";
    case 3:
      return "D";

    default:
      return "A";
  }
};
