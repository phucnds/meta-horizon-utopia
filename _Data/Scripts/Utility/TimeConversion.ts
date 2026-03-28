const MILLISECONDS_TO_SECOND = 1000;
const SECONDS_TO_MILLISECOND = 1 / MILLISECONDS_TO_SECOND;

export function millisecondsToSeconds(time: number): number {
	return time * SECONDS_TO_MILLISECOND;
}

export function secondsToMilliseconds(time: number): number {
	return time * MILLISECONDS_TO_SECOND;
}
