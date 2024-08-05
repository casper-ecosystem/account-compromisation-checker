import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';

const Captcha: React.FC = () => {
	const [captchaValue, setCaptchaValue] = useState<string | null>(null);
	const [textValue, setTextValue] = useState<string>('');
	const siteKey = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

	const handleCaptchaChange = (value: string | null) => {
		setCaptchaValue(value);
		console.log('Captcha value:', value);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!captchaValue) {
			alert('Please complete the reCAPTCHA');
			return;
		}

		try {
			const response = await axios.post('http://localhost:3001/check', {
				captchaValue,
				textValue,
			});
			console.log(response.data);

			if (response.data.success) {
				alert('Captcha and text verified successfully');
			} else {
				alert('Verification failed: ' + response.data.message);
			}
		} catch (error) {
			console.error('Error:', error);
			alert('An error occurred during verification');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input type='text' value={textValue} onChange={e => setTextValue(e.target.value)} placeholder='Enter text' />
			<ReCAPTCHA sitekey={siteKey} onChange={handleCaptchaChange} />
			<button type='submit'>Submit</button>
		</form>
	);
};

export default Captcha;
