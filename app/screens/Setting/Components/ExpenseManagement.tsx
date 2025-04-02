import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFont } from '@shopify/react-native-skia';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import DonutChart from '@/components/DonutChart/DonutChart';

interface Data {
  value: number;
  percentage: number;
  color: string;
}

export const ExpenseManagement = () => {
  const n = 5;
  const [data, setData] = useState<Data[]>([]);
  const totalValue = useSharedValue(0);
  const decimals = useSharedValue<number[]>([]);
  const colors = ['#fe769c', '#46a0f8', '#c3f439', '#88dabc', '#e43433'];

  const CHART_SIZE = 50; // Kích thước container (width/height)
  const RADIUS = CHART_SIZE / 2; // Radius bằng nửa kích thước
  const STROKE_WIDTH = CHART_SIZE * 0.15; // 15% kích thước container
  const OUTER_STROKE_WIDTH = CHART_SIZE * 0.23; // 23% kích thước container
  const GAP = 0.0003 * CHART_SIZE;

  const font = useFont(require("../../../../assets/fonts/Inter-Bold.ttf"), CHART_SIZE * 0.3); // 30% kích thước
  const smallFont = useFont(require('../../../../assets/fonts/Inter-Regular.ttf'), CHART_SIZE * 0.125); // 12.5% kích thước

  const generateRandomNumbers = (n: number): number[] => {
    return Array.from({ length: n }, () => Math.floor(Math.random() * 100) + 1);
  };

  const calculatePercentage = (numbers: number[], total: number): number[] => {
    return numbers.map(num => (num / total) * 100);
  };

  const generateData = () => {
    const generateNumbers = generateRandomNumbers(n);
    const total = generateNumbers.reduce((acc, currentValue) => acc + currentValue, 0);
    const generatePercentages = calculatePercentage(generateNumbers, total);
    const generateDecimals = generatePercentages.map(number => Number(number.toFixed(0)) / 100);
    totalValue.value = withTiming(total, { duration: 1000 });
    decimals.value = [...generateDecimals];

    const arrayOfObjects = generateNumbers.map((value, index) => ({
      value,
      percentage: generatePercentages[index],
      color: colors[index],
    }));

    setData(arrayOfObjects);
  };

  if (!font || !smallFont) {
    return <View />;
  }

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center' }} showsVerticalScrollIndicator={false}>
      <View style={styles.chartContainer}>
        <DonutChart
          radius={RADIUS}
          gap={GAP}
          strokeWidth={STROKE_WIDTH}
          outerStrokeWidth={OUTER_STROKE_WIDTH}
          font={font}
          smallFont={smallFont}
          totalValue={totalValue}
          n={n}
          decimals={decimals}
          colors={colors}
        />
      </View>
      <TouchableOpacity onPress={generateData} style={styles.button}>
        <Text style={{ color: colors[0] }}>Generate</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    width: 200, // Kích thước cố định
    height: 200,
    marginTop: 10,
  },
  button: {
    marginVertical: 40,
    backgroundColor: '#f4f7fc',
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 10,
  },
});