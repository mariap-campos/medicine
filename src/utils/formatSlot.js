/* eslint-disable radix */
export const formatSlot = (slot) => {
  switch (slot) {
    case 0:
    case "0":
      return "A";
    case 1:
    case "1":
      return "B";
    case 2:
    case "2":
      return "C";
    case 3:
    case "3":
      return "D";
    default:
      return "A";
  }
};

export const unformatSlot = (slot) => {
  switch (slot) {
    case "A":
      return 0;
    case "B":
      return 1;
    case "C":
      return 2;
    case "D":
      return 3;
    default:
      return 0;
  }
};
