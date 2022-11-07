/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useGlobalContext } from 'context';
import { LightMode, DarkMode } from '@mui/icons-material';
import * as Switch from '@radix-ui/react-switch';
import { ThemeProps } from 'types/Theme';
import { MockedData } from 'mocks/Theme';
import './styles.css';

export function Theme() {
  const [mockedData, setMockedData] = useState<ThemeProps>();
  const { language, theme, setTheme } = useGlobalContext();

  const handleBackground = () => {
    const body = document.querySelector('body');

    if (body) {
      body.style.background = `var(--background${theme})`;
    };
  };

  useEffect(() => {
    setMockedData(MockedData.find((data) => data.language === language));
  }, [language]);

  useEffect(() => {
    handleBackground();
  }, [theme]);

  return (
    <Switch.Root
      className={`switchRoot${theme}`}
      title={theme === 'Dark' ? mockedData?.darkTheme : mockedData?.lightTheme}
      defaultChecked={theme === "Dark"}
      onClick={() => setTheme(theme === "Dark" ? 'Light' : 'Dark')}
    >
      <Switch.Thumb className='switchThumb'>
        {
          theme === "Dark"
            ? <DarkMode className={`switchIcon${theme}Mode`} />
            : <LightMode className={`switchIcon${theme}Mode`} />
        }
      </Switch.Thumb>
    </Switch.Root>
  );
};