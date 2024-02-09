import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, IconButton } from '@mui/material';
import NoteForm from "./NoteForm";
import DeleteIcon from '@mui/icons-material/Delete';

const NoteContainer: React.FC = () => {
    const [notes, setNotes] = useState<any[]>([]);

    useEffect(() => {
        fetchNotes().then((result) => {console.log(result)});
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/notes', {
                headers: {
                    'Accept': 'application/json',
                },
            });

            setNotes(response.data);
        } catch (error) {
            console.error('Error while fetching notes:', error);
        }
    };

    const deleteNote = async (noteId: number) => {
        try {
            await axios.delete(`http://localhost:8080/notes/${noteId}`);
            fetchNotes();
        } catch (error) {
            console.error(`Error while deleting note with ID ${noteId}:`, error);
        }
    };

    return (
        <Box sx={{
            p:   20,
            borderRadius:   2,
            color: '#FFFFFF',
        }}>
            <NoteForm />
            <h1>Moje notatki:</h1>
            <Box>
                {notes.map((note) => (
                    <Box key={note.id} sx={{
                        mb:   2,
                        p:   1.5,
                        borderRadius:   2,
                        boxShadow:   1,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: '#001220',
                        color: '#FFFFFF',
                    }}>
                        <Box>
                            <Typography variant="body1" fontWeight="bold">{note.title}</Typography>
                            <Typography variant="body2">{note.content}</Typography>
                        </Box>
                        <IconButton aria-label="delete" onClick={() => deleteNote(note.id)} sx={{ color: '#0077ff' }}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default NoteContainer;
