import { signals } from '@/script/modules/Signals';
import { Blueprint } from '@/script/types/Blueprint';
import { LogError } from '@/script/modules/Logger';
import * as Collections from 'typescript-collections';
import { Guid } from 'guid-typescript';
import { GameObject } from '@/script/types/GameObject';

export class BlueprintManager {
	private blueprints = new Collections.Dictionary<Guid, Blueprint>();

	public RegisterBlueprint(guid: Guid, blueprint: any) {
		this.blueprints.setValue(guid, new Blueprint(Guid.parse(blueprint.instanceGuid), Guid.parse(blueprint.partitionGuid), blueprint.typeName, blueprint.name, blueprint.variations));
	}

	public RegisterBlueprints(blueprintsRaw: string) {
		const scope = this;
		const blueprints = JSON.parse(blueprintsRaw);
		for (const bp of blueprints) {
			scope.RegisterBlueprint(Guid.parse(bp.instanceGuid), bp);
		}
		signals.blueprintsRegistered.emit(this.blueprints.values());
	}

	public getBlueprintByGuid(instanceGuid: Guid) {
		const bp = this.blueprints.getValue(instanceGuid);
		if (!bp) {
			LogError('Failed to find blueprint with guid ' + instanceGuid);
			return null;
		}
		return bp;
	}
}
