import type { FC, ReactNode } from 'react';
import React from 'react';
import type { ViewStyle, StyleProp } from 'react-native';
import { View } from 'react-native';

interface BorderStyle {
  borderColor?: string;
  borderWidth?: number;
}

interface TableProps {
  style?: StyleProp<ViewStyle>;
  borderStyle?: BorderStyle;
  children: ReactNode;
}

export const Table: FC<TableProps> = ({ style, borderStyle, children }) => {
  const borderLeftWidth = borderStyle?.borderWidth ?? 0;
  const borderBottomWidth = borderLeftWidth;
  const borderColor = borderStyle?.borderColor ?? '#000';

  const renderChildren = () =>
    React.Children.map(children, (child: any) =>
      React.cloneElement(
        child,
        borderStyle && child.type.displayName !== 'ScrollView'
          ? { borderStyle }
          : {}
      )
    );

  return (
    <View
      style={[
        style,
        {
          borderLeftWidth,
          borderBottomWidth,
          borderColor,
        },
      ]}
    >
      {renderChildren()}
    </View>
  );
};

interface TableWrapperProps {
  style?: StyleProp<ViewStyle>;
  borderStyle?: BorderStyle;
  children: ReactNode;
}

export const TableWrapper: FC<TableWrapperProps> = ({
  style,
  borderStyle,
  children,
}) => {
  const renderChildren = () =>
    React.Children.map(children, (child: any) =>
      React.cloneElement(child, borderStyle ? { borderStyle } : {})
    );

  return <View style={style}>{renderChildren()}</View>;
};
