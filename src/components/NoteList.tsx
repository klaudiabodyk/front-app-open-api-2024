import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import NoteForm from "./NoteForm";

const ListContainer = styled.div`
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const ListItem = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: flex-start; 
  align-items: center; 
`;

const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 3px;
  margin-left: 10px;
  cursor: pointer;
`;

const NoteList: React.FC = () => {
    const [notes, setNotes] = useState<any[]>([]);

    useEffect(() => {
        fetchNotes();
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
            console.error('Błąd podczas pobierania notatek:', error);
        }
    };

    const deleteNote = async (noteId: number) => {
        try {
            await axios.delete(`http://localhost:8080/notes/${noteId}`);
            fetchNotes();
        } catch (error) {
            console.error(`Błąd podczas usuwania notatki o ID ${noteId}:`, error);
        }
    };

    return (
        <ListContainer>
            <NoteForm />
            <h2>Moje notatki</h2>
            <div>
                {notes.map((note) => (
                    <ListItem key={note.id}>
                        <strong>{note.title}</strong>: {note.content}
                        <DeleteButton onClick={() => deleteNote(note.id)}>Usuń</DeleteButton>
                    </ListItem>
                ))}
            </div>
        </ListContainer>
    );
};

export default NoteList;
