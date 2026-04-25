export enum EPromiseState {
	PENDING,
	FULFILLED,
	REJECTED,
}

export class DeferredPromise<T> implements Promise<T> {
	public get [Symbol.toStringTag](): string {
		return "DeferredPromise";
	}

	private _promise: Promise<T>;
	private _resolve: ((value: T | PromiseLike<T>) => void) | null = null;
	private _reject: ((reason: unknown) => void) | null = null;
	private _state: EPromiseState = EPromiseState.PENDING;

	public get state(): EPromiseState {
		return this._state;
	}

	constructor() {
		this._promise = new Promise<T>((resolve, reject) => {
			this._resolve = resolve;
			this._reject = reject;
		});
	}

	public then<TResult1, TResult2>(
		onfulfilled?: (value: T) => TResult1 | PromiseLike<TResult1>,
		onrejected?: (reason: unknown) => TResult2 | PromiseLike<TResult2>
	): Promise<TResult1 | TResult2> {
		return this._promise.then(onfulfilled, onrejected);
	}

	public catch<TResult>(onrejected?: (reason: unknown) => TResult | PromiseLike<TResult>): Promise<T | TResult> {
		return this._promise.catch(onrejected);
	}

	public finally(onfinally?: (() => void) | null): Promise<T> {
		return this._promise.finally(onfinally);
	}

	public resolve(value: T | PromiseLike<T>): void {
		if (this._resolve === null) {
			return console.error("[DeferredPromise] Resolve was empty!");
		}

		this._resolve(value);
		this._state = EPromiseState.FULFILLED;
	}

	public reject(reason?: unknown): void {
		if (this._reject === null) {
			return console.error("[DeferredPromise] Reject was empty!");
		}

		this._reject(reason);
		this._state = EPromiseState.REJECTED;
	}
}
