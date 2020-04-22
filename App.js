/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Data from './slots.json';

const App = () => {
  const [slots, setSlots] = useState({});
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSlotSelect = id => {
    var slot = slots[date] ? slots[date] : [];
    if (slot.includes(id)) slot = slot.filter(s => s !== id);
    else slot.push(id, id + 1, id + 2);
    setSlots({
      ...slots,
      [date]: slot,
    });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#dadada" />
      <SafeAreaView style={styles.container}>
        <Calendar onDayPress={day => setDate(day.dateString)} />
        <View style={styles.timeSlots}>
          <Text style={styles.heading}>Time Slots for {date}</Text>
          <FlatList
            data={Data.slots}
            numColumns={2}
            columnWrapperStyle={{minWidth: '100%', justifyContent: 'center'}}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  styles.button,
                  slots[date] && slots[date].includes(item.id)
                    ? styles.buttonSelected
                    : {},
                ]}
                onPress={() => handleSlotSelect(item.id)}>
                <Text>
                  {item.from} - {item.to}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#dadada',
  },
  timeSlots: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 10,
  },
  heading: {
    fontSize: 20,
    marginVertical: 10,
  },
  button: {
    height: 40,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 5,
    marginTop: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  buttonSelected: {
    backgroundColor: 'orange',
  },
});

export default App;
