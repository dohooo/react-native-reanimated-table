import type { FC } from 'react';
import React, { useMemo } from 'react';
import type { ViewStyle, TextStyle, StyleProp } from 'react-native';
import { View, StyleSheet } from 'react-native';

import { Cell } from './cell';

import { sum } from '../utils';

interface RowProps {
  data: any[];
  style?: StyleProp<ViewStyle>;
  widthArr?: number[];
  height?: number;
  flexArr?: number[];
  textStyle?: StyleProp<TextStyle>;
  cellTextStyle?: (item: any) => StyleProp<TextStyle>;
  onPress?: (item: any) => void;
}

export const Row: FC<RowProps> = ({
  data,
  style,
  widthArr,
  height,
  flexArr,
  textStyle,
  onPress,
  cellTextStyle,
  ...props
}) => {
  const width = widthArr ? sum(widthArr) : 0;
  const composedStyle = useMemo(() => {
    const styles: ViewStyle = {};
    if (width) styles.width = width;

    if (height) styles.height = height;

    return styles;
  }, [width, height]);

  if (!data) return null;

  return (
    <View style={StyleSheet.flatten([composedStyle, styles.row, style])}>
      {data.map((item, i) => {
        const flex = flexArr?.[i];
        const wth = widthArr?.[i];
        return (
          <Cell
            key={i}
            data={item}
            width={wth}
            height={height}
            flex={flex}
            style={style}
            onPress={onPress}
            textStyle={StyleSheet.flatten([
              cellTextStyle && cellTextStyle(item),
              textStyle,
            ])}
            {...props}
          />
        );
      })}
    </View>
  );
};

interface RowsProps {
  data: any[][];
  style?: StyleProp<ViewStyle>;
  widthArr?: number[];
  heightArr?: number[];
  flexArr?: number[];
  textStyle?: StyleProp<TextStyle>;
}

export const Rows: FC<RowsProps> = ({
  data,
  style,
  widthArr,
  heightArr,
  flexArr,
  textStyle,
  ...props
}) => {
  const flex = flexArr ? sum(flexArr) : 0;
  const width = widthArr ? sum(widthArr) : 0;

  const composedStyle = useMemo(() => {
    const styles: ViewStyle = {};
    if (flex) styles.flex = flex;

    if (width) styles.width = width;

    return styles;
  }, [flex, width]);

  return data ? (
    <View style={composedStyle}>
      {data.map((item, i) => {
        const height = heightArr?.[i];
        return (
          <Row
            key={i}
            data={item}
            widthArr={widthArr}
            height={height}
            flexArr={flexArr}
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
  row: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
});
