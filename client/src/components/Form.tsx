import React, { useState, useContext, useEffect } from 'react';
import { ActiveAccountContext } from '../App';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import { useClickRef } from '@make-software/csprclick-ui';
import styled from 'styled-components';
import CryptoJS from 'crypto-js';

const StyledContent = styled.div(({ theme }) =>
	theme.withMedia({
		margin: 'auto',
		display: 'flex',
		flexDirection: 'column',
		width: ['80%'],
		justifyContent: 'center',
		alignItems: 'center',
		gap: '1em',
		"input[type='text']": {
			height: '2em',
			width: ['80%'],
		},
		p: {
			margin: 0,
		},
	})
);

const Center = styled.div(({ theme }) =>
	theme.withMedia({
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: '1em',
		gap: '1em',
	})
);

interface FormProps {
	setCompromised: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const Form = (props: FormProps) => {
	const clickRef = useClickRef();
	const activeAccount: any = useContext(ActiveAccountContext);

	const [captchaValue, setCaptchaValue] = useState<string | null>(null);
	const [textValue, setTextValue] = useState<string>('');
	const siteKey = process.env.REACT_APP_RECAPTCHA_CLIENT_KEY;

	if (!siteKey) {
		return <h1>No reCAPTCHA client key set in .env</h1>;
	}

	const handleCaptchaChange = (value: string | null) => {
		setCaptchaValue(value);
	};

	useEffect(() => {
		if (activeAccount == null || activeAccount.public_key == null) {
			setTextValue('');
		} else {
			setTextValue(activeAccount.public_key);
		}
	}, [activeAccount]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!captchaValue) {
			alert('Please complete the reCAPTCHA');
			return;
		}

		try {
			const hash = CryptoJS.SHA256(textValue).toString(CryptoJS.enc.Hex);
			const response = await axios.post(
				`${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/check`,
				{
					captchaValue,
					hash,
				}
			);

			if (response.data.success) {
				props.setCompromised(true);
			} else {
				props.setCompromised(false);
			}
		} catch (error) {
			console.error('Error:', error);
			alert('An error occurred during verification');
		}
	};

	async function connectWallet(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault();
		await clickRef?.signIn();
	}

	return (
		<form onSubmit={handleSubmit}>
			<StyledContent>
				<input
					type='text'
					value={textValue}
					onChange={e => setTextValue(e.target.value)}
					placeholder='Paste Public Key'
				/>
				<p>OR</p>
				<p>Sign in with CSPR.click, which will auto-populate the above text field with your public key:</p>
				<button onClick={e => connectWallet(e)}>Sign In with CSPR.click</button>
			</StyledContent>
			<Center>
				<ReCAPTCHA sitekey={siteKey} onChange={handleCaptchaChange} />
				<button type='submit'>Submit</button>
			</Center>
		</form>
	);
};

export default Form;
