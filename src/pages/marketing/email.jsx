import React, { useState } from "react";
import * as XLSX from 'xlsx';


const Email = () => {
  const [emails, setEmails] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const handleSend = async () => {
    const recipients = emails.split(",").map((email) => email.trim());

    console.log("recipients", recipients);
  };
 const [data, setData] = React.useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      console.log("workbook",sheetName)

      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet);

      setData(sheetData);
    };

    reader.readAsBinaryString(file);
  };
  console.log("data",data)
  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {data && (
        <div>
          <h2>Imported Data:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
      <h2>Send Bulk Emails</h2>
      <textarea
        placeholder="abc@gmail.com, abcd@gmail.com"
        value={emails}
        onChange={(e) => setEmails(e.target.value)}
      />
      <input
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={handleSend}>Send Emails</button>
    </div>
  );
};

export default Email;
