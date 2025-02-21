import { Attributes } from '../../../types';

type SelectedClassReqsProps = {
	selectedClass: string,
	attrMin: Attributes,
	resetSelectedClass: VoidFunction
}

const SelectedClassReqs = ({ selectedClass, attrMin, resetSelectedClass }: SelectedClassReqsProps) => {
  return (
	  <div>
		  <h2>{selectedClass} Minimum Requirements</h2>

		  {Object.keys(attrMin).map((item) => (
			  <div key={item}>{item}: {attrMin[item]} <br /></div>
		  ))}

		  <button onClick={resetSelectedClass}>Close</button>
	  </div>
  )
}

export default SelectedClassReqs;
