import { Component, NetworkMode, TemplateAsset, WorldService, type Entity } from 'meta/worlds';
import { VisibilityComponent } from './VisibilityComponent';

export class ObjectPool<T extends Component> {
    private template: TemplateAsset;
    private pooledObjects: PooledObject<T>[] = [];
    private componentType: abstract new (...args: any[]) => T;
    private worldService: WorldService;

    public constructor(template: TemplateAsset, componentType: abstract new (...args: any[]) => T) {
        this.template = template;
        this.componentType = componentType;
        this.worldService = WorldService.get();
    }

    // Cocos: constructor gọi createNew sync
    // Meta: spawnTemplate là async, nên tách ra init
    public async init(defaultPoolCount: number): Promise<void> {
        for (let i = 0; i < defaultPoolCount; i++) {
            await this.createNew();
        }
    }

    public borrow(): T | null {
        const objectToBorrow = this.pooledObjects.find((o) => !o.IsBorrowed);
        if (objectToBorrow != null) {
            return objectToBorrow.borrow();
        }

        // Pool hết — không thể spawn sync, trả null
        return null;
    }

    public return(object: T): void {
        const objectToReturn = this.pooledObjects.find((o) => o.Equals(object));
        if (objectToReturn == null) {
            throw new Error('Object is not a member of the pool');
        }

        objectToReturn.return();
    }

    public returnAll(): void {
        for (const pooled of this.pooledObjects) {
            if (pooled.IsBorrowed) {
                pooled.return();
            }
        }
    }

    // Cocos: instantiate(prefab) → Node → getComponent
    // Meta:  spawnTemplate(template) → Entity → getComponent
    private async createNew(): Promise<PooledObject<T>> {
        const entity: Entity = await this.worldService.spawnTemplate({
            templateAsset: this.template,
            networkMode: NetworkMode.Networked,
        });

        const instancedComponent = entity.getComponent(this.componentType) as T;
        if (instancedComponent == null) {
            console.error('Spawned entity does not have component ' + this.componentType.name);
        }

        const visibility = entity.getComponent(VisibilityComponent) as VisibilityComponent | null;
        if (visibility) {
            visibility.setup();
        }

        const newPooledObject = new PooledObject<T>(entity, instancedComponent, visibility);
        this.pooledObjects.push(newPooledObject);

        return newPooledObject;
    }
}

class PooledObject<T extends Component> {
    private isBorrowed = false;
    private instancedEntity: Entity;
    private instancedComponent: T;
    private visibility: VisibilityComponent | null;

    public constructor(entity: Entity, component: T, visibility: VisibilityComponent | null) {
        this.instancedEntity = entity;
        this.instancedComponent = component;
        this.visibility = visibility;

        this.clear();
    }

    public get IsBorrowed(): boolean {
        return this.isBorrowed;
    }

    public Equals(component: T): boolean {
        return this.instancedComponent === component;
    }

    public borrow(): T {
        this.isBorrowed = true;
        if (this.visibility) {
            this.visibility.show();
        }
        return this.instancedComponent;
    }

    public return(): void {
        this.clear();
    }

    private clear(): void {
        if (this.visibility) {
            this.visibility.hide();
        }
        this.isBorrowed = false;
    }
}
