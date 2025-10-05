import React from 'react';
import { Button } from 'antd';

const CustomButton = ({ type = 'primary', children, ...props }) => (
    <Button type={type} {...props} >
        {children}
    </Button>
);

export default CustomButton;