// @flow

import * as remx from 'remx';
import {Appearance} from 'react-native-appearance';
import {generateTheme} from '../../utils/Theme';
import type {Theme} from '../../utils/Types';
import Constants from '../../utils/Constants';

const defaultAppearance = Constants.isIOS13OrLater()
  ? Appearance.getColorScheme()
  : 'light';

const initialState = {
  theme: generateTheme(defaultAppearance),
};

const state = remx.state(initialState);

const getters = remx.getters({
  getID(): string {
    return state.theme.id;
  },

  getTheme(): Theme {
    return state.theme;
  },
});

const setters = remx.setters({
  setTheme(id: 'light' | 'dark') {
    if (id === state.theme.oppositeID) {
      state.theme = generateTheme(id);
    }
  },
});

export const ThemeStore = {
  ...getters,
  ...setters,
};
