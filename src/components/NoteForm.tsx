import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button } from '@mui/material';

const NoteForm: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');

    const handleAddNote = async () => {
        try {
            await axios.post('http://localhost:8080/notes', {
                title,
                content,
            });

            setTitle('');
            setContent('');
        } catch (error) {
            console.error('Error while adding note:', error);
        }
    };

    return (
        <Box sx={{
            width:   900,
            p:   4,
            backgroundColor: '#001220', // Ciemnoniebieskie tło
            borderRadius:   24,
            boxShadow:   1,
            padding:   10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
        }}>
            <h2>Notatnik</h2>
            <h2>Praca Inżynierska -   2024</h2>
            <h3>Klaudia Bodyk </h3>
            <br />
            <TextField
                label="TYTUŁ:"
                fullWidth
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
                InputProps={{
                    style: {
                        color: '#0077ff',
                    },
                }}
                InputLabelProps={{
                    style: {
                        color: '#0077ff',
                    },
                }}
                sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#0077ff',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#0077ff',
                    },
                    '& .MuiOutlinedInput-root': {
                        '&:focus-within': {
                            borderColor: '#0077ff',
                        },
                    },
                }}
            />
            <TextField
                label="TREŚĆ:"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                margin="normal"
                InputProps={{
                    style: {
                        color: '#0077ff',
                    },
                }}
                InputLabelProps={{
                    style: {
                        color: '#0077ff',
                    },
                }}
                sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#0077ff',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#0077ff',
                    },
                    '& .MuiOutlinedInput-root': {
                        '&:focus-within': {
                            borderColor: '#0077ff',
                        },
                    },
                }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddNote}
                sx={{ mt:   2, bgcolor: '#0077ff', color: '#FFFFFF' }}
            >
                DODAJ NOTATKĘ
            </Button>
        </Box>
    );
};

export default NoteForm;
