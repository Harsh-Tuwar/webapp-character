import { ATTRIBUTE_LIST } from '../../../consts';
import { AttributeCounter } from '../../../types';

type AttributeListProps = {
	attributeCounter: AttributeCounter,
	updateAttributeCounter: (attributeName: string, value: number) => void
}

const AttributeList = ({ attributeCounter, updateAttributeCounter }: AttributeListProps) => {
	return (
		<>
			{ATTRIBUTE_LIST.map((attr, index) => {
				return <div key={index}>
					<span>{attr}:</span>
					<span>{attributeCounter[attr].val}</span>
					<span>(mod: {attributeCounter[attr].mod})</span>
					<button onClick={() => updateAttributeCounter(attr, +1)}>+</button>
					<button onClick={() => updateAttributeCounter(attr, -1)}>-</button>
				</div>
			})}
		</>
	);
}

export default AttributeList;
