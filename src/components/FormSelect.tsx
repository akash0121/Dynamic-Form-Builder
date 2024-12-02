import React from 'react';
import { FormType } from '../types/form';

interface FormSelectProps {
  value: FormType;
  onChange: (value: FormType) => void;
}

export const FormSelect: React.FC<FormSelectProps> = ({ value, onChange }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Form Type
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as FormType)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="userInfo">User Information</option>
        <option value="address">Address Information</option>
        <option value="payment">Payment Information</option>
      </select>
    </div>
  );
};