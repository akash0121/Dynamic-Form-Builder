import React, { useState, useEffect } from 'react';
import { FormType, FormConfig, FormData, Toast as ToastType } from './types/form';
import { fetchFormConfig } from './data/mockApi';
import { FormSelect } from './components/FormSelect';
import { FormContainer } from './components/FormContainer';
import { ProgressBar } from './components/ProgressBar';
import { DataTable } from './components/DataTable';
import { Toast } from './components/Toast';
import { ClipboardList } from 'lucide-react';
import { generateUniqueId, validateFormData, calculateFormProgress } from './utils/formUtils';

function App() {
  const [formType, setFormType] = useState<FormType>('userInfo');
  const [formConfig, setFormConfig] = useState<FormConfig | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedData, setSubmittedData] = useState<FormData[]>([]);
  const [toast, setToast] = useState<ToastType | null>(null);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    loadFormConfig();
  }, [formType]);

  const loadFormConfig = async () => {
    try {
      setLoading(true);
      const config = await fetchFormConfig(formType);
      setFormConfig(config);
      if (!editingId) {
        setFormData({});
        setErrors({});
      }
    } catch (error) {
      showToast('Failed to load form configuration', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleFormTypeChange = (newType: FormType) => {
    setFormType(newType);
    setEditingId(null);
    setFormData({});
    setErrors({});
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formConfig) return;

    const { isValid, errors: validationErrors } = validateFormData(formData, formConfig.fields);
    
    if (!isValid) {
      setErrors(validationErrors);
      showToast('Please fill in all required fields', 'error');
      return;
    }

    const submissionData: FormData = {
      id: editingId || generateUniqueId(),
      type: formType,
      ...formData
    };

    if (editingId) {
      setSubmittedData(prev => 
        prev.map(item => item.id === editingId ? submissionData : item)
      );
      showToast('Entry updated successfully!', 'success');
    } else {
      setSubmittedData(prev => [...prev, submissionData]);
      showToast('Form submitted successfully!', 'success');
    }

    setFormData({});
    setEditingId(null);
  };

  const handleEdit = (data: FormData) => {
    const { id, type, ...rest } = data;
    setFormType(type);
    setFormData(rest);
    setEditingId(id);
    showToast('Edit mode activated', 'info');
  };

  const handleDelete = (id: string) => {
    setSubmittedData(prev => prev.filter(item => item.id !== id));
    showToast('Entry deleted successfully', 'success');
  };

  const showToast = (message: string, type: ToastType['type']) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center mb-8">
            <ClipboardList className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-800">Dynamic Form Builder</h1>
          </div>

          <FormSelect value={formType} onChange={handleFormTypeChange} />

          {formConfig && (
            <ProgressBar progress={calculateFormProgress(formData, formConfig.fields)} />
          )}

          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {formConfig && (
                <FormContainer
                  formType={formType}
                  formConfig={formConfig}
                  formData={formData}
                  errors={errors}
                  onInputChange={handleInputChange}
                />
              )}
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                {editingId ? 'Update' : 'Submit'}
              </button>
            </form>
          )}

          <DataTable
            data={submittedData}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;