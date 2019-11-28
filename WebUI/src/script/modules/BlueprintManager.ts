import { signals } from '@/script/modules/Signals';
import { Blueprint } from '@/script/types/Blueprint';
import { LogError } from '@/script/modules/Logger';
import * as Collections from 'typescript-collections';
import { Guid } from '@/script/types/Guid';
import { IBlueprint } from '@/script/interfaces/IBlueprint';

export class BlueprintManager {
	private blueprints = new Collections.Dictionary<Guid, Blueprint>();

	public RegisterBlueprint(guid: Guid, blueprint: IBlueprint) {
		const instanceGuid = Guid.parse(blueprint.instanceGuid as string);
		const partitionGuid = Guid.parse(blueprint.partitionGuid as string);
		const bp = new Blueprint(instanceGuid, partitionGuid, blueprint.typeName, blueprint.name, blueprint.variations);
		this.blueprints.setValue(guid, bp);
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
