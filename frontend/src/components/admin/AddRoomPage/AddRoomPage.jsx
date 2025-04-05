import { useNavigate } from 'react-router-dom';
import './addRoomPage.css';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import useRoom from '../../../hooks/useRoom';


const AddRoomPage = () => {
    const navigate = useNavigate();
    const [roomDetails, setRoomDetails] = useState({
        roomPhotoUrl: '',
        roomType: '',
        roomPrice: '',
        roomDescription: ''
    });

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [roomTypes, setRoomTypes] = useState([]);
    const [newRoomType, setNewRoomType] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { getRoomTypes, addRoom } = useRoom();

    useEffect(() => {
        const fetchRoomTypes = async () => {
            try {
                const types = await getRoomTypes();
                setRoomTypes(types);
            } catch (error) {
                console.error("Error fetching room types:", error.message);
            }
        };
        fetchRoomTypes();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomDetails(prevState => ({
            ...prevState, [name]: value
        }));
    };

    const handleRoomTypeChange = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue === 'new') {
            setNewRoomType(true);
        } else {
            setNewRoomType(false);
            setRoomDetails(prevState => ({
                ...prevState,
                roomType: selectedValue
            }));
        }
    };

    const addRoomFunction = async () => {
        if (!roomDetails.roomType || !roomDetails.roomPrice || !roomDetails.roomDescription) {
            setError('All room details must be provided.');
            setTimeout(() => setError(''), 5000);
            return;
        }

        if (isNaN(roomDetails.roomPrice) || Number(roomDetails.roomPrice) <= 0) {
            setError('Room price must be a valid number.');
            setTimeout(() => setError(''), 5000);
            return;
        }

        if (!file) {
            setError('Room photo is required.');
            setTimeout(() => setError(''), 5000);
            return;
        }

        if (!window.confirm('Do you want to add this room?')) return;

        try {
            setIsSubmitting(true);
            const formData = new FormData();
            formData.append('roomType', roomDetails.roomType);
            formData.append('roomPrice', roomDetails.roomPrice);
            formData.append('roomDescription', roomDetails.roomDescription);
            formData.append('photo', file);

            const result = await addRoom(formData);
            if (result.statusCode === 200) {
                setSuccess('Room added successfully.');
                setTimeout(() => {
                    setSuccess('');
                    navigate('/admin/manage-rooms');
                }, 3000);
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'image/*': [] },
        multiple: false,
        onDrop: (acceptedFiles) => {
            const selectedFile = acceptedFiles[0];
            if (selectedFile) {
                setFile(selectedFile);
                setPreview(URL.createObjectURL(selectedFile));
            }
        }
    });

    return (
        <div className="edit-room-container">
            <h2>Add New Room</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <div className="edit-room-form">

                <div className="form-group">
                    <label>Room Photo</label>
                    <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        {preview ? (
                            <img src={preview} alt="Room Preview" className="room-photo-preview" />
                        ) : (
                            <p>Drag & drop a photo here, or click to select</p>
                        )}
                    </div>
                </div>

                <div className="form-group">
                    <label>Room Type</label>
                    <select value={newRoomType ? 'new' : roomDetails.roomType} onChange={handleRoomTypeChange}>
                        <option value="">Select a room type</option>
                        {roomTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                        <option value="new">Other (please specify)</option>
                    </select>
                    {newRoomType && (
                        <input
                            type="text"
                            name="roomType"
                            placeholder="Enter new room type"
                            value={roomDetails.roomType}
                            onChange={handleChange}
                        />
                    )}
                </div>

                <div className="form-group">
                    <label>Room Price</label>
                    <input
                        type="text"
                        name="roomPrice"
                        value={roomDetails.roomPrice}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Room Description</label>
                    <textarea
                        name="roomDescription"
                        value={roomDetails.roomDescription}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <button className="update-button" onClick={addRoomFunction} disabled={isSubmitting}>
                    {isSubmitting ? 'Adding Room...' : 'Add Room'}
                </button>
            </div>
        </div>
    );
};

export default AddRoomPage;
