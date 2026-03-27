import { component, Component, property, TemplateAsset, type Entity, type Maybe } from 'meta/worlds';

export enum EnemyType {
  MeleeBasic = 0,
  RangeBasic = 1,
  MeleeFast = 2,
  MeleeTank = 3,
  Boss = 10,
}

@component()
export class EnemyEntry extends Component {
  @property() public enemyType: EnemyType = EnemyType.MeleeBasic;
  @property() public template: Maybe<TemplateAsset> = null;
}

@component()
export class DataEnemies extends Component {

  @property() private readonly enemyEntries: readonly Entity[] = [];

  private enemyMap = new Map<EnemyType, TemplateAsset>();

  public setup(): void {
    for (const entity of this.enemyEntries) {
      const entry = entity.getComponent(EnemyEntry);
      if (entry && entry.template) {
        this.enemyMap.set(entry.enemyType, entry.template);
      }
    }
    console.log(`[DataEnemies] Registered ${this.enemyMap.size} enemy templates`);
  }

  public getTemplate(type: EnemyType): TemplateAsset | null {
    return this.enemyMap.get(type) ?? null;
  }

  public getEnemyMap(): Map<EnemyType, TemplateAsset> {
    return this.enemyMap;
  }
}
