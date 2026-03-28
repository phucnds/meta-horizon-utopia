import type { AbstractClass, Component, Entity, Maybe } from "meta/worlds";

export function getComponentsInChildren<T extends Component>(
	entity: Entity,
	componentClass: AbstractClass<T>,
	includeParent: boolean = false
): T[] {
	const entities = entity.getChildrenWithComponent(componentClass);
	if (includeParent) {
		entities.push(entity);
	}

	return entities.map((elem) => elem.getComponent(componentClass)).filter((elem) => elem !== null);
}

export function getEntitiesWithComponent<T extends Component>(
	arr: Maybe<Entity>[],
	componentType: AbstractClass<T>
): T[] {
	const components = arr.reduce<T[]>((output, entity) => {
		if (entity !== null) {
			const comp = entity.getComponent(componentType);
			if (comp !== null) {
				output.push(comp);
			}
		}

		return output;
	}, []);

	return components;
}
