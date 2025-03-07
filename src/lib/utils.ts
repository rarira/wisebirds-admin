export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getFormattedInteger(value: number): string {
  return value.toLocaleString("ko-KR");
}

export function getPercentageString(value: number): string {
  return Math.round(value * 100) + "%";
}

export function getFormattedTimeDateString(value: string): string {
  const date = new Date(value);
  if (date.toString() === "Invalid Date") {
    throw new Error("주어진 value가 적절한 date string이 아닙니다.");
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
