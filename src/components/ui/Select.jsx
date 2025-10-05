import React from 'react';
import { Select } from 'antd';

const { Option, OptGroup } = Select;

const CustomSelect = ({
  options = [],
  value,
  onChange,
  placeholder = 'Select...',
  disabled = false,
  name,
  className = '',
  mode,
  children,
  styles = {},
  dropdownStyle, 
  ...rest
}) => {
  const filteredRest = { ...rest };

  // backwards support for dropdownStyle but no warning
  if (dropdownStyle) {
    filteredRest.styles = {
      ...styles,
      popup: {
        ...styles.popup,
        root: { ...styles.popup?.root, ...dropdownStyle },
      },
    };
  }

  return (
    <Select
      value={value}
      onChange={onChange}
      disabled={disabled}
      name={name}
      placeholder={placeholder}
      className={`common-select ${className}`}
      mode={mode}
      styles={styles}
      {...filteredRest}
    >
      {children ||
        options.map((option) =>
          typeof option === 'object' ? (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ) : (
            <Option key={option} value={option}>
              {option}
            </Option>
          )
        )}
    </Select>
  );
};


// Expose OptGroup and Option as static properties
CustomSelect.OptGroup = OptGroup;
CustomSelect.Option = Option;

export default CustomSelect;