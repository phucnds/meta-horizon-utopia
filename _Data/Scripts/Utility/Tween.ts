import {lerp} from 'meta/worlds';
import { CancellationToken } from "./CancellationToken";
import { delay } from "./Delay";

const ONE_SECOND_IN_MILLISECONDS = 1000;

const TWEEN_ANIMATION_FPS = 60;
const TWEEN_ANIMATION_FRAME_MS = ONE_SECOND_IN_MILLISECONDS / TWEEN_ANIMATION_FPS;

export async function tweenNumber(
	startValue: number,
	target: number,
	durationMs: number,
	setter: (value: number) => void,
	easing: (value: number) => number = (x) => x,
	passedTicket?: CancellationToken
): Promise<void> {
	const startTime = Date.now();

	if (durationMs <= Number.EPSILON) {
		setter(target);
		return;
	}

	const ticket = passedTicket !== undefined ? passedTicket : new CancellationToken();
	while (ticket.active) {
		const elapsed = Date.now() - startTime;
		const progress = elapsed / durationMs;

		if (progress >= 1) {
			setter(target);
			break;
		}

		const eased = easing(progress);
		const currentValue = lerp(startValue, target, eased);
		setter(currentValue);

		await delay(TWEEN_ANIMATION_FRAME_MS);
	}
}

export function easeOutQuad(t: number): number {
	return t * (2 - t);
}
