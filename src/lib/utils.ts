export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getFormattedInteger(value: number): string {
  return value.toLocaleString("ko-KR");
}

export function getPercentageString(value: number): string {
  return Math.round(value * 100) + "%";
}
