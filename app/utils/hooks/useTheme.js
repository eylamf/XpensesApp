// @flow

import {useState, useEffect} from 'react';
import {Appearance} from 'react-native-appearance';
import {ThemeStore} from '../../stores/theme/Store';

export function useTheme(stylesheet: any) {
  const [theme, setTheme] = useState(ThemeStore.getTheme());
  const [styles, setStyles] = useState(stylesheet(theme));

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      ThemeStore.setTheme(colorScheme);

      setTheme(ThemeStore.getTheme());
      setStyles(stylesheet(ThemeStore.getTheme()));
    });

    return () => subscription.remove();
  }, [stylesheet, theme]);

  useEffect(() => {
    if (theme.id !== ThemeStore.getID()) {
      setTheme(ThemeStore.getTheme());
      setStyles(stylesheet(theme));

      console.log('recalculated');
    }
  }, [theme, stylesheet]);

  return [theme, styles];
}
