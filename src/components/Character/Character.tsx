import React, { useEffect } from 'react'
import { Attribute, AttributeCounter, Class, Skill } from '../../types';
import { MAX_ATTRIBUTE_LEVEL, CLASS_LIST } from '../../consts';
import AttributeList from './components/AttributeList';
import ClassList from './components/ClassList';
import SelectedClassReqs from './components/SelectedClassReqs';
import SkillsList from './components/SkillsList';

type CharacterProps = {
	name: string;
	attributeState: AttributeCounter;
	skillState: Record<Skill, number>;
}

const Character = ({ name, attributeState, skillState }: CharacterProps) => {
	const [selectedClass, setSelectedClass] = React.useState<string>('');
	const [availableSkillPoints, setAvailableSkillPoints] = React.useState<number>(0);
	const [attributeCounter, setAttributeCounter] = React.useState<AttributeCounter>(attributeState);
	const [skillPoints, setSkillPoints] = React.useState<Record<Skill, number>>(skillState);

	// calculate available skill points when component mounts
	useEffect(() => {
		calculateAvailableSkillPoints();
	}, []);

	const updateAttributeCounter = (attrName: Attribute, value: number) => {
		// use of `Math.max` so the value doesn't go below 0
		const existinAttributeValue = attributeCounter[attrName].val;
		const newAttrVal = Math.max(attributeCounter[attrName].val + value, 0);

		const newAttrCount = { ...attributeCounter };
		newAttrCount[attrName].val = newAttrVal;

		const newTotalAttributeTotal = Object.values(newAttrCount).reduce((a, b) => a + b.val, 0);

		// 7. Implement a maximum on all attributes of 70. For example, if a character has 20 strength and 10 for all other attributes, 
		// they must decrease one before they can increase another
		if (newTotalAttributeTotal > MAX_ATTRIBUTE_LEVEL && value > 0) {
			alert(`A character can have up to ${MAX_ATTRIBUTE_LEVEL} delegated attribute points.`);
			// revert the operation for next time
			newAttrCount[attrName].val = existinAttributeValue;

			return;
		} else {
			// 4. Add an “ability modifier” to each attribute row, this is calculated as +1 for each 2 points above 10, for any attribute 
			// (let's take Intelligence for example) we would have the following ability modifiers for a given ability
			newAttrCount[attrName].mod = Math.floor(
				(newAttrCount[attrName].val - 10) / 2
			);

			setAttributeCounter(newAttrCount);
		}

		// calculate available skill points if the changes in the Intelligence attribute counter only...
		if (attrName === 'Intelligence') {
			calculateAvailableSkillPoints();
		}
	}

	const updateSkillPoints = (skillName: Skill, value: number) => {
		const currentSkillPointsTotal = Object.values(skillPoints).reduce((sum, value) => sum + value, 0);

		if (currentSkillPointsTotal >= availableSkillPoints && value > 0) {
			alert("You need more skill points! Upgrade intelligence to add more.");
		} else {
			const newSkillValues = { ...skillPoints }; // copy existing skill values to avoid mutating the state directly
	
			newSkillValues[skillName] = Math.max(newSkillValues[skillName] + value, 0); // update new value for the selected skill
	
			setSkillPoints(newSkillValues); // finally, update state
		}
	}

	const calculateAvailableSkillPoints = () => {
		const intelligenceMod = attributeCounter['Intelligence'].mod;

		setAvailableSkillPoints(10 + (4 * intelligenceMod));
	}

	const getAchievedClasses = () => {
		const achievedClasses: Class[] = [];

		for (const [className, requirements] of Object.entries(CLASS_LIST)) {
			let isMatch = true;

			for (const [attribute, requiredValue] of Object.entries(requirements)) {
				if (attributeCounter[attribute].val < requiredValue) {
					isMatch = false;
					break;
				}
			}

			if (isMatch) {
				achievedClasses.push(className as Class);
			}
		}

		return achievedClasses;
	}

	return (
		<div className='border m5 p10 f-1'>
			<h2>Character: {name}</h2>

			<div className='d-flex space-evenly'>
				{/* 
          1. Create state and controls for each of the 6 attributes (see ATTRIBUTE_LIST) so they can be incremented/decremented independently.
          Comments: 
          For this, I have created a seperated component which would track the counter for all attributes individually

          4. Add an “ability modifier” to each attribute row, this is calculated as +1 for each 2 points above 10, for any attribute 
            (let's take Intelligence for example) we would have the following ability modifiers for a given ability
        */}
				<div className='border p10 m5'>
					<h2>Attributes</h2>
					<AttributeList attributeCounter={attributeCounter} updateAttributeCounter={updateAttributeCounter} />
				</div>

				{/* 2. Display classes on the screen (see CLASS_LIST) and visually change the UI when the character meets the minimum requirements for that class, 
            that is, all attributes are greater than or equal to the class minimums 

        */}
				<div className="border p10 m5">
					<h2>Classes</h2>
					<ClassList onClassSelect={(cls: string) => setSelectedClass(cls)} achievedClasses={getAchievedClasses()} />
				</div>

				{/* 
          3. When clicking on a class, display the minimum required statistics for that class
        */}
				{selectedClass !== '' &&
					<div className='border p10 m5'>
						<SelectedClassReqs
							key={selectedClass}
							selectedClass={selectedClass}
							attrMin={CLASS_LIST[selectedClass]}
							resetSelectedClass={() => setSelectedClass('')}
						/>
					</div>
				}

				{/* 
          5. Implement skills. See SKILL_LIST for the list of all skills and their attribute modifier
        */}
				<div className="border p10 m5">
					<h2>Skills</h2>
					<SkillsList
						attributeCounter={attributeCounter}
						availableSkillPoints={availableSkillPoints}
						updateSkillPoints={updateSkillPoints}
						skillPoints={skillPoints}
					/>
				</div>
			</div>
		</div>
	)
}

export default Character;
