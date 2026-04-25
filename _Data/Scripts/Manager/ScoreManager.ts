import {component, Component, OnEntityStartEvent, property, subscribe, type Maybe} from 'meta/worlds';
import { Signal } from '../EventSystem/Signal';

@component()
export class ScoreManager extends Component {
  
  @property() private score: number = 0;
  
  public readonly onScoreChanged = new Signal<number>();

  public static Instance: Maybe<ScoreManager> = null;

  @subscribe(OnEntityStartEvent)
  onStart() {
    ScoreManager.Instance = this;
  }

  public getScore(): number {
    return this.score;
  }

  public addScore(score: number): void {
    this.score += score;
    this.onScoreChanged.trigger(this.score);
  }
}
