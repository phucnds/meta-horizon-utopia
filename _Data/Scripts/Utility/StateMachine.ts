import type {Maybe} from 'meta/worlds';

export abstract class State {
	public abstract enter(): void;
	public abstract update(stateMachine: StateMachine, deltaTime: number): void;
	public abstract exit(): void;
}

export class StateMachine {
	private _currentState: Maybe<State> = null;

	public setState(state: State): void {
		if (state === this._currentState) {
			return;
		}

		if (this._currentState !== null) {
			this._currentState.exit();
		}

		this._currentState = state;
		this._currentState.enter();
	}

	public update(deltaTime: number): void {
		if (this._currentState === null) {
			console.error("No state active");
			return;
		}

		this._currentState.update(this, deltaTime);
	}
}
