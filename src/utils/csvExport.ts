
export const convertToCSV = (data: any[], filename: string = 'data') => {
  if (!data || data.length === 0) {
    return;
  }

  // Get headers from the first object
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  const csvContent = [
    // Header row
    headers.join(','),
    // Data rows
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Handle nested objects and arrays
        if (typeof value === 'object' && value !== null) {
          return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
        }
        // Escape quotes and wrap in quotes if contains comma or quote
        const stringValue = String(value || '');
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      }).join(',')
    )
  ].join('\n');

  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const exportTableData = (data: any[], filename: string, customHeaders?: Record<string, string>) => {
  if (!data || data.length === 0) {
    return;
  }

  // Transform data if custom headers are provided
  let exportData = data;
  if (customHeaders) {
    exportData = data.map(item => {
      const transformedItem: any = {};
      Object.entries(customHeaders).forEach(([key, label]) => {
        if (key.includes('.')) {
          // Handle nested properties like 'contact.name'
          const value = key.split('.').reduce((obj, prop) => obj?.[prop], item);
          transformedItem[label] = value;
        } else {
          transformedItem[label] = item[key];
        }
      });
      return transformedItem;
    });
  }

  convertToCSV(exportData, filename);
};
