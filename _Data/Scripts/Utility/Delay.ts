const SECOND_TO_MS = 1000;

export function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function delayInSeconds(seconds: number): Promise<void> {
	return delay(seconds * SECOND_TO_MS);
}
