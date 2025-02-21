import { SKILL_LIST } from '../../../consts';
import { AttributeCounter, Skill } from '../../../types';

type SkillsListProps = {
	attributeCounter: AttributeCounter;
	availableSkillPoints: number;
	skillPoints: Record<Skill, number>;
	updateSkillPoints: (skillName: Skill, value: number) => void;
}

const SkillsList = ({
	attributeCounter,
	availableSkillPoints,
	updateSkillPoints,
	skillPoints
}: SkillsListProps) => {
	return (
		<div>
			<h5>Total skill points available: {availableSkillPoints}</h5>
			{SKILL_LIST.map((skillItem) => (
				<div key={skillItem.name}>
					<span>{skillItem.name}</span>
					&nbsp;-
					<span> points: {skillPoints[skillItem.name]} </span>
					<span>
						<button onClick={() => updateSkillPoints(skillItem.name as Skill, +1)}>+</button>
						<button onClick={() => updateSkillPoints(skillItem.name as Skill, -1)}>-</button>
					</span>
					<span>(Modifier: {skillItem.attributeModifier.slice(0, 3)}) </span>
					:
					<span>{attributeCounter[skillItem.attributeModifier].mod}</span>
					<span>&nbsp; Total: {attributeCounter[skillItem.attributeModifier].mod + skillPoints[skillItem.name]}</span>
				</div>
			))}
		</div>
	)
}

export default SkillsList;
