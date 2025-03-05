// components/InputField.js
import React from 'react';

const InputField = ({ label, name, type = "text", value, onChange, ...rest }) => {
    return (
        <div>
            {label && <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>}
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                {...rest}
            />
        </div>
    );
};

export default InputField;