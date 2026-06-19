import { saveAs } from "file-saver";

export const exportToCSV = (data, filename) => {
  if (!data || data.length === 0) {
    alert("No data available");
    return;
  }

  const headers = Object.keys(data[0]);

  const csvRows = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map((field) => `"${row[field] ?? ""}"`)
        .join(",")
    ),
  ];

  const csvString = csvRows.join("\n");

  const blob = new Blob(
    [csvString],
    {
      type: "text/csv;charset=utf-8;",
    }
  );

  saveAs(blob, filename);
};