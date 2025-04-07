import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export default function ImageUpload({ getFileName }) {
    const [oldFile, setOldFile] = useState([]);
    const handleFileUploadMultiple = (e) => {
        const formData = new FormData();
        const files = e.target.files;

        for (const file of files) formData.append("files", file);
        formData.append('oldFile', oldFile)
        // 서버 전송
        axios
            .post(`http://54.180.155.70:9000/uploads/?maxFiles=${files.length}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            .then(res => {
                getFileName(res.data); // NewProduct 컴포넌트로 전송
                setOldFile(res.data.oldFile);
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <Form.Control
                type='file'
                onChange={(e) => { handleFileUploadMultiple(e) }}
                multiple />
        </div>
    );
}


