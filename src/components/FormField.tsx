import React from 'react';
import { FormField as FormFieldType } from '../types/form';

interface FormFieldProps {
  field: FormFieldType;
  value: string;
  error?: string;
  onChange: (name: string, value: string) => void;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  field,
  value,
  error,
  onChange,
  className = ''
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange(field.name, e.target.value);
  };

  return (
    <div className={`${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {field.type === 'dropdown' ? (
        <select
          value={value}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select {field.label}</option>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={field.type}
          value={value}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required={field.required}
        />
      )}
      
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};