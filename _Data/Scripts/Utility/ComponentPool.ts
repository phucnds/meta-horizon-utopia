import type { Class, Maybe, TemplateAsset } from "meta/worlds";
import { Component, Vec3, WorldService } from "meta/worlds";
import { NetworkMode } from "meta/worlds";

export abstract class PoolableComponent extends Component {
	public abstract enable(): void;
	public abstract disable(): void;
}

export type PoolableConstructor<TPoolable extends PoolableComponent> = Class<TPoolable>;

export class ComponentPool<TPoolable extends PoolableComponent> {
	public disabled: TPoolable[] = [];
	public enabled: TPoolable[] = [];

	private _asset: TemplateAsset;
	private _poolCount: number;
	private _defaultSpawnPosition: Vec3;

	public constructor(
		private poolableType: PoolableConstructor<TPoolable>,
		asset: TemplateAsset,
		poolCount: number,
		defaultSpawnPosition: Vec3
	) {
		this._asset = asset;
		this._poolCount = poolCount;
		this._defaultSpawnPosition = defaultSpawnPosition;
	}

	public async initialisePool(): Promise<void> {
		for (let index = 0; index < this._poolCount; index++) {
			const instance = await this.createInstance();
			this.disabled.push(instance);
			instance.disable();
		}
	}

	public getInstance(): Maybe<TPoolable> {
		const instance = this.disabled.pop();
		if (instance === undefined) {
			// TODO: Probably should allow for overflow later.
			return null;
		}

		this.enabled.push(instance);
		instance.enable();
		return instance;
	}

	public getInstanceOrThrow(): TPoolable {
		const instance = this.getInstance();
		if (instance === null) {
			throw new Error("No pooled instance left!");
		}

		return instance;
	}

	public returnInstance(instance: TPoolable): void {
		if (this.enabled.indexOf(instance, 0) === -1) {
			console.warn("Trying to return an instance that's already disabled.");
			return;
		}

		this.enabled.splice(this.enabled.indexOf(instance), 1);
		instance.disable();
		this.disabled.push(instance);
	}

	private async createInstance(): Promise<TPoolable> {
		const instanceEntity = await WorldService.get().spawnTemplate({
			templateAsset: this._asset,
			networkMode: NetworkMode.LocalOnly,
			position: this._defaultSpawnPosition,
		});

		const component = instanceEntity.getComponent(this.poolableType);
		if (component === null) {
			console.error(`Unable to create pool instance using ${this._asset.toString()}, likely missing PoolableComponent`);
			throw new Error(
				`Unable to create pool instance using ${this._asset.toString()}, likely missing PoolableComponent`
			);
		}

		if (component instanceof this.poolableType === false) {
			console.error(`Pool asset ${this._asset.toString()} is of the wrong ${typeof PoolableComponent} type!`);
			throw new Error(`Pool asset ${this._asset.toString()} is of the wrong ${typeof PoolableComponent} type!`);
		}

		component.disable();
		return component;
	}
}
