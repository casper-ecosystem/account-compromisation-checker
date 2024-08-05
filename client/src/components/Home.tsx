import styled from 'styled-components';
import Captcha from './ReCAPTCHA';
import React from 'react';

const Container = styled.div(({ theme }) =>
	theme.withMedia({
		paddingTop: 40,
		margin: 'auto',
	})
);

export function Home() {
	const [captchaSuccess, setCaptchaSuccess] = React.useState<boolean>(false);

	return (
		<Container>
			<Captcha></Captcha>
		</Container>
	);
}
