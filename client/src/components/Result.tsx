import styled from 'styled-components';
import check from '../images/check.svg';
import exclamation from '../images/exclamation.svg';

const StyledDiv = styled.div(({ theme }) =>
	theme.withMedia({
		margin: 'auto',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: ['80%', '50%'],
		div: {
			width: '10vw',
			padding: '1em',
			borderRadius: '5vw',
			img: {
				width: '100%',
			},
		},
		'div.bad': {
			backgroundColor: '#ff8282',
			img: {
				filter: 'invert(25%) sepia(61%) saturate(7428%) hue-rotate(353deg) brightness(90%) contrast(126%);',
			},
		},
		'div.good': {
			backgroundColor: '#82ff82',
			img: {
				filter: 'invert(63%) sepia(69%) saturate(4631%) hue-rotate(83deg) brightness(127%) contrast(118%);',
			},
		},
	})
);

interface FormProps {
	compromised: boolean;
}

const Result = (props: FormProps) => {
	const status = <img src={props.compromised ? exclamation : check} />;
	const notification = props.compromised ? (
		<>
			Your account has been compromised. Please&nbsp;<a href='https://casper.network/en-us/contact'>contact us</a>.
		</>
	) : (
		<>Your account was not compromised.</>
	);
	return (
		<StyledDiv>
			<div className={props.compromised ? 'bad' : 'good'}>{status}</div>
			<p>{notification}</p>
		</StyledDiv>
	);
};

export default Result;
