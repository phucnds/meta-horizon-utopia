const ONE_THOUSAND = 1000;
const NUMBER_SUFFIXES = ["", "k", "m", "b", "t"];

export type NumToStringTruncatedOptions = {
	suffixes?: string[];
	divisor?: number;
	fractionalDigits?: number;
};

export function convertNumberToStringTruncated(value: number, options?: NumToStringTruncatedOptions): string {
	const suffixes = options?.suffixes ?? NUMBER_SUFFIXES;
	const divisor = options?.divisor ?? ONE_THOUSAND;
	const fractionalDigits = options?.fractionalDigits ?? 0;

	let suffixIndex = 0;
	let runningValue = value;
	for (; suffixIndex < suffixes.length - 1 && runningValue >= divisor; suffixIndex++) {
		runningValue = runningValue / divisor;
	}

	const suffix = suffixes[suffixIndex];
	const numString = Number.parseFloat(runningValue.toFixed(fractionalDigits));
	return `${numString}${suffix}`;
}
