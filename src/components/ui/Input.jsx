import React from 'react';
import { Input as AntdInput } from 'antd';

const CustomInput = ({ value, onChange, placeholder, ...rest }) => {
    return (
        <AntdInput
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            {...rest}
        />
    );
};

export default CustomInput;