import styled from 'styled-components';
import Form from './Form';
import React from 'react';
import Result from './Result';

const Container = styled.div(({ theme }) =>
	theme.withMedia({
		margin: 'auto',
		maxWidth: ['95vw', '80vw'],
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
	const [compromised, setCompromised] = React.useState<boolean | null>(null);

	if (compromised !== null) {
		return <Result compromised={compromised} />;
	}

	return (
		<Container>
			<Introduction>
				<h1>Casper Account Compromisation Checker</h1>
				<p>
					This tool can be used to determine if your account was compromised during the Casper mainnet&apos;s recent
					security breach.
				</p>
				<p>To use this tool, either:</p>
				<p>Paste your public key below</p>
			</Introduction>
			<Center>
				<Form setCompromised={setCompromised} />
			</Center>
		</Container>
	);
}
