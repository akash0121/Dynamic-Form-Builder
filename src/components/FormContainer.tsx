import React from 'react';
import { FormConfig, FormType } from '../types/form';
import { FormField } from './FormField';

interface FormContainerProps {
  formType: FormType;
  formConfig: FormConfig;
  formData: Record<string, any>;
  errors: Record<string, string>;
  onInputChange: (name: string, value: string) => void;
}

export const FormContainer: React.FC<FormContainerProps> = ({
  formType,
  formConfig,
  formData,
  errors,
  onInputChange,
}) => {
  if (formType === 'userInfo') {
    return (
      <div className="space-y-4">
        {formConfig.fields.map((field) => (
          <FormField
            key={field.name}
            field={field}
            value={formData[field.name]?.toString() || ''}
            error={errors[field.name]}
            onChange={onInputChange}
          />
        ))}
      </div>
    );
  }

  // For address and payment forms, group fields in rows
  const fields = formConfig.fields;
  const rows = [];
  
  for (let i = 0; i < fields.length; i += 2) {
    const row = fields.slice(i, i + 2);
    rows.push(row);
  }

  return (
    <div className="space-y-4">
      {rows.map((row, idx) => (
        <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {row.map((field) => (
            <FormField
              key={field.name}
              field={field}
              value={formData[field.name]?.toString() || ''}
              error={errors[field.name]}
              onChange={onInputChange}
            />
          ))}
        </div>
      ))}
    </div>
  );
};