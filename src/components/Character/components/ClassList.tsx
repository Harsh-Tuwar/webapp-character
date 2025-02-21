import { CLASS_LIST } from '../../../consts';

type ClassListProps = {
	onClassSelect: (cls: string) => void,
	achievedClasses: string[]
}

const ClassList = ({ onClassSelect, achievedClasses }: ClassListProps) => {
	return (
		<div>
			{Object.keys(CLASS_LIST).map((cls) => {
				return <div key={cls} className={achievedClasses.includes(cls) ? 'class-req-met' : ''} onClick={() => onClassSelect(cls)}>{cls} <br /></div>
			})}
		</div>
	);
}

export default ClassList;
