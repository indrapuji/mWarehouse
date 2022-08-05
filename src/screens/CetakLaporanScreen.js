import React, { useState, useCallback } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import MonthPicker from 'react-native-month-year-picker';
import moment from 'moment';


const CetakLaporanScreen = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const showPicker = useCallback((value) => setShow(value), []);

  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;

      showPicker(false);
      setDate(selectedDate);
    },
    [date, showPicker],
  );

  return (
    <SafeAreaView>
      <Text>Month Year Picker Example</Text>
      {/* <Text>{moment(date, "MM-YYYY")}</Text> */}
      <Text style={{ fontSize: 50, color: 'black' }}>{moment(date).format('MM-YYYY').toString()}</Text>
      <TouchableOpacity style={{ height: 100, width: 100, backgroundColor: 'red' }} onPress={() => showPicker(true)}>
        <Text>OPEN</Text>
      </TouchableOpacity>
      {show && (
        <MonthPicker
          onChange={onValueChange}
          value={date}
          minimumDate={new Date()}
          maximumDate={new Date(2025, 5)}
          locale="ko"
        />
      )}
    </SafeAreaView>
  );
};

export default CetakLaporanScreen;