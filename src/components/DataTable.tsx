import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { FormData, FormType } from '../types/form';

interface DataTableProps {
  data: FormData[];
  onEdit: (data: FormData) => void;
  onDelete: (id: string) => void;
}

export const DataTable: React.FC<DataTableProps> = ({ data, onEdit, onDelete }) => {
  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {} as Record<FormType, FormData[]>);

  if (data.length === 0) {
    return null;
  }

  const renderTable = (formType: FormType, entries: FormData[]) => {
    if (entries.length === 0) return null;

    const headers = Object.keys(entries[0]).filter(key => key !== 'id' && key !== 'type');

    return (
      <div key={formType} className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          {formType === 'userInfo' ? 'User Information' :
           formType === 'address' ? 'Address Information' :
           'Payment Information'}
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {headers.map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {entries.map((row) => (
                <tr key={row.id}>
                  {headers.map((header) => (
                    <td key={header} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row[header]}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => onEdit(row)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(row.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-8">
      {Object.entries(groupedData).map(([type, entries]) => 
        renderTable(type as FormType, entries)
      )}
    </div>
  );
};