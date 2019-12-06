// @flow

import {useState, useEffect} from 'react';
import {ThemeStore} from '../../stores/theme/Store';

export function useTheme(stylesheet: any) {
  const [theme, setTheme] = useState(ThemeStore.getTheme());
  const [styles, setStyles] = useState(stylesheet(theme));

  useEffect(() => {
    if (theme.id !== ThemeStore.getID()) {
      setTheme(ThemeStore.getTheme());
      setStyles(stylesheet(theme));

      console.log('recalculated');
    }
  }, [theme, stylesheet]);

  return [theme, styles];
}
