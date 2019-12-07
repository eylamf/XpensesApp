// @flow

import React, {useMemo} from 'react';
import type {Element} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
// import {useSafeArea} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Constants from '../../utils/Constants';
import {convertColorToOpacity} from '../../utils/Theme';
import {useTheme} from '../../utils/hooks/useTheme';
import type {Theme} from '../../utils/Types';
import Row from '../Row';

type Props = {
  color: string,
  title: string,
  isAddMode: boolean,
  onClose: () => void,
  onSave: () => void,
};

const CHEVRON = require('../../../assets/Chevron.png');

const SubDetailsHeader = React.memo<any>(
  ({color, title, isAddMode, onClose, onSave}: Props): Element<any> => {
    const [theme, styles] = useTheme(stylesheet);

    const gradientColor = useMemo(
      () => [
        convertColorToOpacity(theme.colors.black, 0.4),
        convertColorToOpacity(color, 0),
      ],
      [theme.colors.black, color],
    );

    console.log('details header render');

    return (
      <LinearGradient style={styles.container} colors={gradientColor}>
        {!isAddMode && (
          <Row style={styles.content}>
            <TouchableOpacity
              style={styles.left}
              activeOpacity={0.8}
              onPress={onClose}>
              <Image
                style={styles.chevron}
                source={CHEVRON}
                resizeMode={'cover'}
              />
            </TouchableOpacity>
            <View style={styles.center}>
              {/* <Text style={styles.title}>{title}</Text> */}
            </View>
            <TouchableOpacity
              style={styles.right}
              activeOpacity={0.8}
              onPress={onSave}>
              <Text style={styles.actionLabel}>{'Save'}</Text>
            </TouchableOpacity>
          </Row>
        )}
      </LinearGradient>
    );
  },
);

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      height: 80,
      paddingRight: 20,
      paddingLeft: 14,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 2,
    },

    content: {
      flex: 1,
      // paddingTop: Constants.getStatusBarHeight(), // TODO check if iOS < 13, else use the below style
      paddingBottom: 15,
    },

    left: {
      width: 80,
      justifyContent: 'center',
    },

    chevron: {
      width: 26,
      height: 26,
      tintColor: theme.colors.white,
      transform: [{rotate: '90deg'}],
    },

    center: {
      flex: 1,
      ...theme.styles.center,
    },

    title: {
      ...theme.styles.whiteText,
      ...theme.styles.bold,
    },

    right: {
      width: 80,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },

    actionLabel: {
      ...theme.styles.whiteText,
      ...theme.styles.bold,
    },
  });

export default SubDetailsHeader;
