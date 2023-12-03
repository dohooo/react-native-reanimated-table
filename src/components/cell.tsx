import type { FC, PropsWithChildren } from 'react';
import React, { useMemo } from 'react';
import type { ViewStyle, TextStyle, StyleProp, ViewProps } from 'react-native';
import { View } from 'react-native';
import { Text, StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface CellProps {
  data?: any;
  width?: number;
  height?: number;
  flex?: number;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  borderStyle?: {
    borderColor?: string;
    borderWidth?: number;
  };
  cellContainer?: ViewProps;
  onPress?: (item: any) => void;
}

export const Cell: FC<PropsWithChildren<CellProps>> = ({
  data,
  width,
  height,
  flex,
  style,
  textStyle,
  borderStyle,
  children,
  onPress,
  cellContainer = {},
  ...props
}) => {
  const textDom = children ?? (
    <Text style={StyleSheet.flatten([textStyle])} {...props}>
      {data}
    </Text>
  );

  const borderTopWidth = borderStyle?.borderWidth ?? 0;
  const borderRightWidth = borderTopWidth;
  const borderColor = borderStyle?.borderColor ?? '#000';

  const composedStyles = useMemo(() => {
    const styles: ViewStyle = {};
    if (width) styles.width = width;

    if (height) styles.height = height;

    if (flex) styles.flex = flex;

    if (!width && !flex && !height && !style) styles.flex = 1;

    return styles;
  }, [width, height, flex, style]);

  return (
    <View
      {...cellContainer}
      style={StyleSheet.flatten([
        {
          borderTopWidth,
          borderRightWidth,
          borderColor,
        },
        composedStyles,
        style,
        cellContainer.style,
        styles.cell,
      ])}
    >
      <TouchableWithoutFeedback
        containerStyle={[styles.cell, style]}
        onPress={() => onPress?.(data)}
      >
        {textDom}
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: { flex: 1 },
});
