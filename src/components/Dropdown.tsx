import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown as ReactNativeDropdown } from 'react-native-element-dropdown';

type DropdownItem = {
  label: string;
  value: string;
};

type DropdownProps = {
  style?: any;
  placeholder?: string;
  items: DropdownItem[];
  onChange: (item: DropdownItem) => void;
  testID?: string
};

function Dropdown(props: DropdownProps) {
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <ReactNativeDropdown
        testID={props.testID}
        style={[styles.dropdown, isFocus ? styles.focus : null]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={props.items}
        search
        labelField="label"
        valueField="value"
        placeholder={props.placeholder}
        value={value}
        onChange={item => {
          setValue(item.value);
          props.onChange(item);
          setIsFocus(false);
        }}
      />
    </View>
  );
}

export default Dropdown;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  focus: {
    borderColor: 'black',
    borderWidth: 1,
  },
  dropdown: {
    height: 65,
    borderColor: 'lightgray',
    borderWidth: 2,
    borderRadius: 8,
    padding: 8,
    paddingStart: 20,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: 15,
  },
  inputSearchStyle: {
    fontSize: 16,
  },
});
