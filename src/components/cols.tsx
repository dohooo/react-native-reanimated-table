import type { FC } from 'react';
import React from 'react';
import type { ViewStyle, TextStyle, StyleProp } from 'react-native';
import { View, StyleSheet } from 'react-native';

import { Cell } from './cell';

import { sum } from '../utils';

interface ColProps {
  data: any[];
  style?: StyleProp<ViewStyle>;
  width?: number;
  heightArr?: number[];
  flex?: number;
  textStyle?: StyleProp<TextStyle>;
}

export const Col: FC<ColProps> = ({
  data,
  style,
  width,
  heightArr,
  flex,
  textStyle,
  ...props
}) => {
  return data ? (
    <View
      style={StyleSheet.flatten([
        { width: width ?? (flex ? undefined : 1), flex },
        style,
      ])}
    >
      {data.map((item, i) => {
        const height = heightArr?.[i];
        return (
          <Cell
            key={i}
            data={item}
            width={width}
            height={height}
            textStyle={textStyle}
            {...props}
          />
        );
      })}
    </View>
  ) : null;
};

interface ColsProps {
  data: any[][];
  style?: StyleProp<ViewStyle>;
  widthArr?: number[];
  heightArr?: number[];
  flexArr?: number[];
  textStyle?: StyleProp<TextStyle>;
}

export const Cols: FC<ColsProps> = ({
  data,
  style,
  widthArr,
  heightArr,
  flexArr,
  textStyle,
  ...props
}) => {
  const width = widthArr ? sum(widthArr) : 0;

  return data ? (
    <View style={StyleSheet.flatten([styles.cols, width ? { width } : {}])}>
      {data.map((item, i) => {
        const flex = flexArr?.[i];
        const wth = widthArr?.[i];
        return (
          <Col
            key={i}
            data={item}
            width={wth}
            heightArr={heightArr}
            flex={flex}
            style={style}
            textStyle={textStyle}
            {...props}
          />
        );
      })}
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  cols: { flexDirection: 'row' },
});
