import { useState } from 'react';
import { ClickUI, Lang, ThemeModeType } from '@make-software/csprclick-ui';
import { accountMenuItems, languageSettings } from './settings';
import styled from 'styled-components';
export * from './settings';

const TopBarSection = styled.section(({ theme }) => ({
	backgroundColor: theme.topBarBackground,
	position: 'fixed',
	zIndex: 1,
	width: '100%',
}));

const TopBarContainer = styled.div(({ theme }) =>
	theme.withMedia({
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		maxWidth: ['540px', '720px', '960px'],
		margin: '0 auto',
		padding: '0 12px',
	})
);

export interface TopBarProps {
	themeMode: ThemeModeType | undefined;
	onThemeSwitch: () => void;
}

const ClickTopBar = ({ themeMode, onThemeSwitch }: TopBarProps) => {
	const [lang, setLang] = useState<Lang>(Lang.EN);

	return (
		<TopBarSection>
			<TopBarContainer>
				<ClickUI
					topBarSettings={{
						onThemeSwitch: onThemeSwitch,
						accountMenuItems: accountMenuItems,
						languageSettings: languageSettings(lang, setLang),
					}}
					themeMode={themeMode}
				/>
			</TopBarContainer>
		</TopBarSection>
	);
};

export default ClickTopBar;
