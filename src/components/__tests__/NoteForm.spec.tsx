import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import NoteForm from "../NoteForm";

describe('NoteForm', () => {
    let axiosMock: MockAdapter;

    beforeEach(() => {
        axiosMock = new MockAdapter(axios);
    });

    afterEach(() => {
        axiosMock.restore();
    });

    it('renders the form correctly', () => {
        render(<NoteForm />);

        expect(screen.getByLabelText(/tytuł/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/treść/i)).toBeInTheDocument();
        expect(screen.getByText(/dodaj notatkę/i)).toBeInTheDocument();
    });

    it('updates title and content on input change', () => {
        render(<NoteForm />);

        const titleInput = screen.getByLabelText(/tytuł/i);
        const contentTextarea = screen.getByLabelText(/treść/i);

        fireEvent.change(titleInput, { target: { value: 'Test Title' } });
        fireEvent.change(contentTextarea, { target: { value: 'Test Content' } });

        expect(titleInput.title).toBe('Test Title');
        expect(contentTextarea.children).toBe('Test Content');
    });

    it('calls handleAddNote and resets input fields on button click', async () => {
        render(<NoteForm />);

        const titleInput = screen.getByLabelText(/tytuł/i);
        const contentTextarea = screen.getByLabelText(/treść/i);
        const addButton = screen.getByText(/dodaj notatkę/i);

        // Mocking the API call
        axiosMock.onPost('http://localhost:8080/notes').reply(200);

        // Set input values
        fireEvent.change(titleInput, { target: { value: 'Test Title' } });
        fireEvent.change(contentTextarea, { target: { value: 'Test Content' } });

        // Click the button
        fireEvent.click(addButton);

        // Wait for the API call to complete
        await waitFor(() => {
            expect(axiosMock.history.post.length).toBe(1);
            expect(axiosMock.history.post[0].data).toEqual(JSON.stringify({ title: 'Test Title', content: 'Test Content' }));
            expect(titleInput.title).toBe('');
            expect(contentTextarea.children).toBe('');
        });
    });

    it('handles API error and logs it to the console', async () => {
        render(<NoteForm />);

        const addButton = screen.getByText(/dodaj notatkę/i);

        // Mocking the API call to simulate an error
        axiosMock.onPost('http://localhost:8080/notes').reply(500);

        // Click the button
        fireEvent.click(addButton);

        // Wait for the API call to complete
        await waitFor(() => {
            expect(axiosMock.history.post.length).toBe(1);
            // Ensure the error is logged to the console
            expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Błąd podczas dodawania notatki:'));
        });
    });
});
