import React, { useState } from 'react';
import axios from 'axios';
import './Upload.css';
import illustration0 from '../../assets/connecting.png'

const UploadCourse = () => {
    const [formData, setFormData] = useState({
        name: '',
        course_name: '',
        description: '',
        image: null,
        overview: '',
        file: [],
        external_link: '',
    });

    const [message, setMessage] = useState('');
    const token = localStorage.getItem('access_token');

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'file' && files) {
            // Append files instead of replacing
            setFormData((prevData) => ({
                ...prevData,
                file: [...(prevData.file || []), ...files],
            }));
        } else if (name === 'image') {
            setFormData((prevData) => ({
                ...prevData,
                image: files[0],
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        for (const key in formData) {
            if (key === 'file') {
                formData.file.forEach(file => {
                    data.append('file', file); // Append each file
                });
            } else {
                data.append(key, formData[key]);
            }
        }

        try {
            const response = await axios.post('http://localhost:8000/api/course/create/', data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 201 || response.data.success) {
                setFormData({
                    name: '',
                    course_name: '',
                    description: '',
                    image: null,
                    overview: '',
                    file: [],
                    external_link: '',
                });
                console.log(response);
            }
            console.log(response);

            setMessage('Course uploaded successfully!');
        } catch (error) {
            setMessage('Error uploading course: ' + (error.response?.data?.detail || error.message));
        }
    };

    return (
        <div className="upload-container">
            <div>
            <h1>Upload New Course</h1>
            {message && <p className="message">{message}</p>}
            <img src={illustration0} alt="illustration" />
            </div>

            
            <form onSubmit={handleSubmit} className="upload-form">
                <label>Your Full Name:</label>
                <input className="input-field" type="text" name="name" value={formData.name} onChange={handleChange} required />

                <label>Course Name:</label>
                <input className="input-field" type="text" name="course_name" value={formData.course_name} onChange={handleChange} required />

                <label>Description:</label>
                <textarea className="textarea-field" name="description" value={formData.description} onChange={handleChange} required></textarea>

                <label>Overview: <span className="hint">(Give a short note/overview about the course)</span></label>
                <textarea className="textarea-field" name="overview" value={formData.overview} onChange={handleChange} required></textarea>

                <label>Image (jpg, png): <span className="hint">(Upload course image to be used as card image)</span></label>
                <input className="file-input" type="file" name="image" accept="image/*" onChange={handleChange} required />

                <label>File (pdf, docx):</label>
                <input className="file-input" type="file" name="file" accept=".pdf,.docx" multiple onChange={handleChange} />

                <label>External Link:</label>
                <input className="input-field" type="url" name="external_link" value={formData.external_link} onChange={handleChange} />
                {formData.file && formData.file.length > 0 && (
                    <div className="file-list">
                        <h4>Files to Upload:</h4>
                        <ul>
                            {formData.file.map((file, index) => (
                                <li key={index}>{file.name}</li>
                            ))}
                        </ul>
                    </div>
                )}


                <button className="submit-button" type="submit">Upload Course</button>
            </form>
        </div>
    );
};

export default UploadCourse;
