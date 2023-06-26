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
		const postalCodeIsValid = isFive(enteredPostalCode);

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
		props.onConfirm({
			name:enteredName,
			street:enteredStreet,
			city:enteredCity,
			postalCode:enteredPostalCode
		});
	};

	const nameControlClasses = `${classes.control} ${
		formValidity.name ? "" : classes.invalid
	}`;
	const streetControlClasses = `${classes.control} ${
		formValidity.street ? "" : classes.invalid
	}`;
	const postalControlClasses = `${classes.control} ${
		formValidity.postalCode ? "" : classes.invalid
	}`;
	const cityControlClasses = `${classes.control} ${
		formValidity.city ? "" : classes.invalid
	}`;

	return (
		<form className={classes.form} onSubmit={confirmHandler}>
			<div className={nameControlClasses}>
				<label htmlFor='name'>Your Name</label>
				<input type='text' id='name' ref={nameInputRef} />
				{!formValidity.name && <p>Please enter a valid name!</p>}
			</div>
			<div className={streetControlClasses}>
				<label htmlFor='street'>Street</label>
				<input type='text' id='street' ref={streetInputRef} />
				{!formValidity.street && <p>Please enter a valid street!</p>}
			</div>
			<div className={postalControlClasses}>
				<label htmlFor='postal'>Postal Code</label>
				<input type='text' id='postal' ref={postalCodeInputRef} />
				{!formValidity.postalCode && <p>Please enter a valid postalCode!</p>}
			</div>
			<div className={cityControlClasses}>
				<label htmlFor='city'>City</label>
				<input type='text' id='city' ref={CityInputRef} />
				{!formValidity.city && <p>Please enter a valid city!</p>}
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
