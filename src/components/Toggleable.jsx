import { useState, forwardRef, useImperativeHandle } from "react";

const Toggleable = forwardRef(({children, buttonLabel}, refs) => {
	const [visible, setVisible] = useState(false);

	const toggleVisibility = () => setVisible(!visible);

	useImperativeHandle(refs, () => {
		return {
			toggleVisibility
		}
	});

	return (
		<>
			{ visible ?
				<div>
					{children}
					<button onClick={toggleVisibility}>cancel</button>
				</div>
				:
				<div>
					<button onClick={toggleVisibility}>{buttonLabel}</button>
				</div>
			}
		</>
	);
});

export default Toggleable;