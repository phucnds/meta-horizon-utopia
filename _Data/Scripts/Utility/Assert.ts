export function assert(condition: unknown, message?: string): asserts condition {
	if (condition) {
		return;
	}

	throw new Error(`[ASSERT] ${message}`);
}

export function assertIsTrue(condition: boolean, message?: string): asserts condition {
	return assert(condition, message);
}

export function assertIsFalse(condition: boolean, message?: string): asserts condition {
	return assert(condition === false, message);
}

export function assertIsNotNull<T>(nullable: T | null, message?: string): asserts nullable is T {
	return assert(nullable !== null, message);
}

export function assertIsNotUndefined<T>(undefinable: T | undefined, message?: string): asserts undefinable is T {
	return assert(undefinable !== undefined, message);
}
