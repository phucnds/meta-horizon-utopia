export class CancellationToken {
	private _active: boolean = true;
	public get active(): boolean {
		return this._active;
	}
	public cancel(): void {
		this._active = false;
	}
}
