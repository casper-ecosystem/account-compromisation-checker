import styled from 'styled-components';

const Container = styled.div(({ theme }) =>
	theme.withMedia({
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		minHeight: '100vh',
		margin: '0 auto',
		backgroundColor: theme.backgroundColor,
		color: theme.contentPrimary,
		h2: { fontSize: 'calc(12px + 2vmin)', fontWeight: '700', color: theme.contentPrimary },
		h3: { fontSize: 'calc(11px + 2vmin)', fontWeight: '500', color: theme.contentPrimary, marginTop: '100px' },
		h5: { fontSize: 'calc(10px + 2vmin)', fontWeight: '500', color: theme.contentPrimary, textAlign: 'center' },
		a: {
			color: theme.fillPrimaryBlue,
			cursor: 'pointer',
		},
		b: {
			cursor: 'pointer',
		},
		p: {
			textAlign: 'center',
		},
		span: {
			fontSize: '16px',
			fontWeight: '400',
			lineHeight: '24px',
		},
		pre: {
			background: theme.backgroundPrimary,
			code: {
				color: theme.codeColor,
			},
		},
		button: {
			background: theme.contentPrimary,
			color: theme.fillSecondary,
			height: '38px',
			padding: '8px 16px',
			fontSize: '14px',
			fontWeight: '600',
			lineHeight: '20px',
			border: 'none',
			borderRadius: '0.5em',
			cursor: 'pointer',
		},
		ol: {
			color: theme.fillPrimaryBlue,
			li: {
				marginTop: '5px',
				a: {
					color: theme.fillPrimaryBlue,
					'&:hover': {
						color: '#294ACC',
					},
				},
			},
		},
		ul: {
			li: {
				marginTop: '5px',
			},
		},
	})
);

export default Container;
