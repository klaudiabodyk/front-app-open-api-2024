import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FormContainer = styled.div`
  width: 900px;
  padding: 40px;
  border: 4px solid #0066FF;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormLabel = styled.label`
  display: block;
  margin: 20px;
  
`;

const FormInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 40px;
  margin-top: 20px;
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  margin-top: 20px;
`;

const FormButton = styled.button`
  background-color: #001e4c;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

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
            console.error('Błąd podczas dodawania notatki:', error);
        }
    };

    return (
        <FormContainer>
            <h4>Klaudia Bodyk </h4>
            <h4>Praca Inżynierska 2024</h4>
            <br />
            <h1>Notatnik</h1>
            <FormLabel>
                TYTUŁ:
                <FormInput type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </FormLabel>
            <FormLabel>
                TREŚĆ:
                <FormTextarea value={content} onChange={(e) => setContent(e.target.value)} />
            </FormLabel>
            <FormButton onClick={handleAddNote}>DODAJ NOTATKĘ</FormButton>
        </FormContainer>
    );
};

export default NoteForm;
