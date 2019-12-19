// @flow

import {useState, useEffect, useCallback} from 'react';
import {AppState} from 'react-native';

export function useAppStateChangeHandler(callback: () => void) {
  const [appState, setAppState] = useState(AppState.currentState);

  const onChangeState = useCallback(
    nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        console.log('called');
        callback();
      }

      setAppState(nextAppState);
    },
    [appState, callback],
  );

  useEffect(() => {
    console.log('hit');
    AppState.addEventListener('change', onChangeState);

    return AppState.removeEventListener('change', onChangeState);
  }, [onChangeState]);
}
