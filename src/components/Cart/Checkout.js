import { useRef, useState } from "react";

import classes from "./Checkout.module.css";

const isEmpty = value => value.trim() === "";
const isFive = value => value.trim().length === 5;


const Checkout = props => {
	const nameInputRef = useRef();
	const streetInputRef = useRef();
	const postalCodeInputRef = useRef();
	const CityInputRef = useRef();
	
	const [formValidity, setFormValidity] = useState({
		name: true,
		street: true,
		city: true,
		postalCode: true,
	});
	const confirmHandler = event => {
		event.preventDefault();
		
		const enteredName = nameInputRef.current.value;
		const enteredStreet = streetInputRef.current.value;
		const enteredPostalCode = postalCodeInputRef.current.value;
		const enteredCity = CityInputRef.current.value;

		const nameIsValid = !isEmpty(enteredName);
		const streetIsValid = !isEmpty(enteredStreet);
		const cityIsValid = !isEmpty(enteredCity);
		const postalCodeIsValid = !isFive(enteredPostalCode);

		setFormValidity({
			name: nameIsValid,
			street: streetIsValid,
			city: cityIsValid,
			postalCode: postalCodeIsValid,
		});

		const formIsValid =
			nameIsValid && streetIsValid && cityIsValid && postalCodeIsValid;
			
			if (!formIsValid) {
				return;
			}
	};


	return (
		<form className={classes.form} onSubmit={confirmHandler}>
			<div className={classes.control}>
				<label htmlFor='name'>Your Name</label>
				<input type='text' id='name' ref={nameInputRef} />
				{!formValidity.name&&<p>Please enter a valid name!</p>}
			</div>
			<div className={classes.control}>
				<label htmlFor='street'>Street</label>
				<input type='text' id='street' ref={streetInputRef} />
			</div>
			<div className={classes.control}>
				<label htmlFor='postal'>Postal Code</label>
				<input type='text' id='postal' ref={postalCodeInputRef} />
			</div>
			<div className={classes.control}>
				<label htmlFor='city'>City</label>
				<input type='text' id='city' ref={CityInputRef} />
			</div>
			<div className={classes.actions}>
				<button type='button' onClick={props.onCancel}>
					Cancel
				</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;
