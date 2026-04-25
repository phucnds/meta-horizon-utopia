import type {EventSubscription} from 'meta/worlds';

export type Delegate<T> = (data: T) => void;
export type AsyncDelegate<T> = (data: T) => Promise<void>;
export type QueuedDelegate<T> = (data: T) => boolean;

type QueuedFunction<T> = {
	func: QueuedDelegate<T>;
	priority: number;
};

type SubscriptionEntry<TDelegate> = {
	subscription: Subscription;
	delegate: TDelegate;
};

//#region Interfaces
interface IBasePublisher<T, TReturn> {
	get hasSubscriptions(): boolean;
	publish(data: T): TReturn;
}

interface IBaseSubscriber<TDelegate> {
	subscribe(func: TDelegate): Subscription;
}

export type IPublisher<T> = IBasePublisher<T, void>;
export type IAsyncPublisher<T> = IBasePublisher<T, Promise<void>>;

export type ISubscriber<T> = IBaseSubscriber<Delegate<T>>;
export type IAsyncSubscriber<T> = IBaseSubscriber<AsyncDelegate<T>>;

export interface IQueuedSubscriber<T> {
	subscribe(func: QueuedDelegate<T>, priority: number): Subscription;
	subscribeNonBlocking(func: Delegate<T>, priority: number): Subscription;
}

export interface IDisposable {
	dispose(): void;
}

class EventContainer<TDelegate> implements IDisposable {
	private _counter: bigint = BigInt(0);
	protected _calls: Map<bigint, SubscriptionEntry<TDelegate>> = new Map();

	public get hasSubscriptions(): boolean {
		return this._calls.size > 0;
	}

	public dispose(): void {
		for (const call of this._calls.values()) {
			call.subscription.disconnect();
		}
	}

	protected createSubscriptionEntry(func: TDelegate): Subscription {
		const counterCopy = this._counter;
		const sub = new Subscription({ disconnect: () => this._calls.delete(counterCopy) });

		const entry: SubscriptionEntry<TDelegate> = {
			subscription: sub,
			delegate: func,
		};

		this._calls.set(counterCopy, entry);
		this._counter += BigInt(1);
		return sub;
	}
}
//#endregion

//#region Event Publishers
export class EventPublisher<T> extends EventContainer<Delegate<T>> implements IPublisher<T>, ISubscriber<T> {
	public publish(data: T): void {
		if (this._calls.size <= 0) {
			return;
		}

		const copy = Array.from(this._calls.values());
		for (let i = 0; i < copy.length; i++) {
			try {
				const entry = copy[i];
				entry.delegate(data);
			} catch (reason) {
				console.error(reason);
			}
		}
	}

	public subscribe(func: Delegate<T>): Subscription {
		return this.createSubscriptionEntry(func);
	}
}

export class AsyncEventPublisher<T>
	extends EventContainer<AsyncDelegate<T>>
	implements IAsyncPublisher<T>, IAsyncSubscriber<T>
{
	public async publish(data: T): Promise<void> {
		if (this._calls.size <= 0) {
			return;
		}

		const copy = Array.from(this._calls.values());
		const completed = await Promise.allSettled(copy.map((entry) => entry.delegate(data)));
		this.logUnsettledPromises(completed);
	}

	public subscribe(func: AsyncDelegate<T>): Subscription {
		return this.createSubscriptionEntry(func);
	}

	private logUnsettledPromises(promises: PromiseSettledResult<unknown>[]): void {
		for (const result of promises) {
			if (result.status === "fulfilled") {
				continue;
			}

			const errorStack = (result.reason as Error).stack;
			console.error(errorStack);
		}
	}
}

export class QueuedPublisher<T>
	extends EventContainer<QueuedFunction<T>>
	implements IPublisher<T>, IQueuedSubscriber<T>
{
	public publish(data: T): void {
		if (this._calls.size <= 0) {
			return;
		}

		const copy = Array.from(this._calls.values());
		const sorted = copy.sort((a, b) => b.delegate.priority - a.delegate.priority); // Sorted in descending order

		for (let i = 0; i < copy.length; i++) {
			try {
				const element = sorted[i];
				const willBlockQueue = element.delegate.func(data);

				if (willBlockQueue) {
					break;
				}
			} catch (reason) {
				console.error(reason);
			}
		}
	}

	public subscribe(func: QueuedDelegate<T>, priority: number): Subscription {
		const queuedFunc: QueuedFunction<T> = {
			func: func,
			priority: priority,
		};

		return this.createSubscriptionEntry(queuedFunc);
	}

	public subscribeNonBlocking(func: Delegate<T>, priority: number): Subscription {
		const finalFunc: QueuedDelegate<T> = (data) => {
			func(data);
			return false;
		};

		return this.subscribe(finalFunc, priority);
	}
}
//#endregion

//#region Subscriptions
export class Subscription implements EventSubscription {
	private _sub: EventSubscription | null;

	public get isValid(): boolean {
		return this._sub !== null;
	}

	constructor(sub: EventSubscription | null = null) {
		this._sub = sub;
	}

	public disconnect(): boolean {
		if (this._sub === null) {
			return false;
		}

		this._sub.disconnect();
		this._sub = null;
		return true;
	}
}

export class SubscriptionBag implements EventSubscription {
	private _subs: EventSubscription[];

	public get isValid(): boolean {
		return this._subs.length > 0;
	}

	constructor(...subs: EventSubscription[]) {
		this._subs = subs;
	}

	public add(sub: EventSubscription): void {
		this._subs.push(sub);
	}

	public addRange(...subs: EventSubscription[]): void {
		this._subs.push(...subs);
	}

	public disconnect(): boolean {
		if (this._subs.length <= 0) {
			return false;
		}

		for (const sub of this._subs) {
			sub.disconnect();
		}

		// remove all the elements from the array
		this._subs.splice(0, this._subs.length);
		return true;
	}
}
//#endregion
