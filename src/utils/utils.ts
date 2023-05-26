import dayjs from "dayjs";

const utils = {
  getDate(
    year: number,
    month: number,
    day: number,
    format: string = "YYYY-MM-DD"
  ): string {
    const date = dayjs(`${year}-${month + 1}-${day}`).format(format);

    return date;
  },

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  },
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value)
  }
};

export default utils;
