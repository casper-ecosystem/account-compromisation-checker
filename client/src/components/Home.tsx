import styled from 'styled-components';
import Captcha from './ReCAPTCHA';
import React from 'react';

const Container = styled.div(({ theme }) =>
	theme.withMedia({
		paddingTop: 40,
		margin: 'auto',
	})
);

const Introduction = styled.div(({ theme }) =>
	theme.withMedia({
		textAlign: 'center',
	})
);

const Center = styled.div(({ theme }) =>
	theme.withMedia({
		display: 'flex',
		justifyContent: 'center',
	})
);

export function Home() {
	const [captchaSuccess, setCaptchaSuccess] = React.useState<boolean>(false);

	return (
		<Container>
			<Introduction>
				<h1>Casper Account Compromisation Checker</h1>
				<p>
					This tool can be used to determine if your account was compromised during the Casper mainnet&apos;s recent
					security breach.
				</p>
			</Introduction>
			<Center>
				<Captcha></Captcha>
			</Center>
		</Container>
	);
}
