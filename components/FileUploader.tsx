import React from "react";
import CSVReader from "xlsx";

interface IProps {
  setCSVData: (data: { columns: string[]; rows: string[] | number[] }) => void;
}

export const FileUploader: React.FC<IProps> = ({ setCSVData }) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [selectedFile] = Array.from(event.target.files as FileList);
    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target?.result;
      const workbook = CSVReader.read(csv, { type: "binary" });
      const [firstWorkSheetName] = workbook.SheetNames;
      const firstWorkSheet = workbook.Sheets[firstWorkSheetName];
      const workSheetData = CSVReader.utils.sheet_to_json(firstWorkSheet, {
        header: 1,
      });

      const [workSheetColumns, ...workSheetRows] = workSheetData;
      setCSVData({
        columns: workSheetColumns as string[],
        rows: workSheetRows as string[],
      });
    };

    reader.readAsBinaryString(selectedFile);
  };

  return <input type={"file"} onChange={handleFileUpload} />;
};

