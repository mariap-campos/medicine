/* eslint-disable radix */
export const formatHourMinute = (hours) => {
  if (hours) {
    return hours.map(
      (item) => `${item.hora}:${item.minuto.toString().padStart(2, "0")}`
    );
  }
  return undefined;
};

export const unformatHourMinute = (hours) =>
  hours.map((item) => ({
    hora: parseInt(item.split(":")[0]),
    minuto: parseInt(item.split(":")[1]),
  }));
