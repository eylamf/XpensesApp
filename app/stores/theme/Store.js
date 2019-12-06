// @flow

import React, {useState, useEffect} from 'react';
import * as remx from 'remx';
import {generateTheme} from '../../utils/Theme';
import type {Theme} from '../../utils/Types';

const initialState = {
  theme: generateTheme('light'),
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
