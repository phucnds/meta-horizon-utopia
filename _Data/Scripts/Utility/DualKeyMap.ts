export class DualKeyMap<TKeyA, TKeyB, TValue> {
	private _map: Map<TKeyA, Map<TKeyB, TValue>> = new Map();

	public get(keyA: TKeyA, keyB: TKeyB): TValue | undefined {
		const innerMap = this._map.get(keyA);
		return innerMap?.get(keyB);
	}

	public set(keyA: TKeyA, keyB: TKeyB, value: TValue): DualKeyMap<TKeyA, TKeyB, TValue> {
		let innerMap = this._map.get(keyA);
		if (innerMap !== undefined) {
			innerMap.set(keyB, value);
			return this;
		}

		innerMap = new Map();
		innerMap.set(keyB, value);
		this._map.set(keyA, innerMap);
		return this;
	}

	public delete(keyA: TKeyA, keyB: TKeyB): boolean {
		const innerMap = this._map.get(keyA);
		if (innerMap === undefined) {
			return false;
		}

		const wasSuccessful = innerMap.delete(keyB);
		if (innerMap.size <= 0) {
			this._map.delete(keyA);
		}

		return wasSuccessful;
	}
}
