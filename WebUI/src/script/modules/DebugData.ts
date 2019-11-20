import { Guid } from 'guid-typescript';

const names = ['Textures', 'UI', 'Vehicles', 'VisualEnvironments', 'Weapons', 'Weapons_old', 'XP2', 'XP3', 'XP4', 'XP5', 'XP_Raw', 'default', 'lodgroups', 'profile'];

function GenerateRandomName() {
	let out = '';
	for (let i = 0; i < 6; i++) {
		out += names[Math.floor(Math.random() * names.length)] + '/';
	}
	return out;
}

export function GenerateBlueprints(count: number) {
	const out = [];
	for (let i = 0; i < count; i++) {
		out.push({
			typeName: 'VisualEnvironmentBlueprint',
			name: GenerateRandomName(),
			partitionGuid: Guid.create().toString(),
			instanceGuid: Guid.create().toString(),
			variations: [
				{
					hash: Math.random(),
					name: Math.random()
				}, {
					hash: Math.random(),
					name: Math.random()
				}, {
					hash: Math.random(),
					name: Math.random()
				}, {
					hash: Math.random(),
					name: Math.random()
				}
			]
		});
	}
	return out;
}
