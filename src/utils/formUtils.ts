export const generateUniqueId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const validateFormData = (
  data: Record<string, any>,
  fields: { name: string; required: boolean; label: string }[]
): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  let isValid = true;

  fields.forEach((field) => {
    if (field.required && (!data[field.name] || data[field.name].toString().trim() === '')) {
      errors[field.name] = `${field.label} is required`;
      isValid = false;
    }
  });

  return { isValid, errors };
};

export const calculateFormProgress = (
  formData: Record<string, any>,
  fields: { name: string; required: boolean }[]
): number => {
  const requiredFields = fields.filter((field) => field.required);
  if (requiredFields.length === 0) return 100;

  const filledRequiredFields = requiredFields.filter(
    (field) => formData[field.name] && formData[field.name].toString().trim() !== ''
  );
  return (filledRequiredFields.length / requiredFields.length) * 100;
};