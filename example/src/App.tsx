import * as React from 'react';

import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Row, Table } from 'react-native-reanimated-table';
import {
  GestureHandlerRootView,
  ScrollView,
} from 'react-native-gesture-handler';

const state = {
  tableHead: [
    'Head',
    'Head2',
    'Head3',
    'Head4',
    'Head5',
    'Head6',
    'Head7',
    'Head8',
    'Head9',
  ],
  widthArr: [40, 60, 80, 100, 120, 140, 160, 180, 200],
};

const tableData: string[][] = [];
for (let i = 0; i < 100; i += 1) {
  const rowData = [];
  for (let j = 0; j < 9; j += 1) {
    rowData.push(`${i}${j}`);
  }
  tableData.push(rowData);
}

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View>
          <Table borderStyle={styles.tableBorder}>
            <Row
              data={state.tableHead}
              widthArr={state.widthArr}
              style={styles.header}
              textStyle={styles.text}
            />
          </Table>
          <ScrollView
            style={styles.dataWrapper}
            showsVerticalScrollIndicator={false}
          >
            <Table borderStyle={styles.tableBorder}>
              {tableData.map((rowData, index) => (
                <Row
                  key={index}
                  data={rowData}
                  widthArr={state.widthArr}
                  style={[
                    styles.row,
                    index % 2 ? styles.rowConditionalBackground : {},
                  ]}
                  textStyle={styles.text}
                />
              ))}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function Root() {
  return (
    <GestureHandlerRootView style={styles.gestureHandlerRootView}>
      <App />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureHandlerRootView: {
    flex: 1,
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: '#C1C0B9',
  },
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: {
    height: 50,
    backgroundColor: '#537791',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { textAlign: 'center', fontWeight: '500', color: '#1C1C1C' },
  dataWrapper: { marginTop: -1 },
  row: {
    height: 40,
    backgroundColor: '#E7E6E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowConditionalBackground: {
    backgroundColor: '#F7F6E7',
  },
});
