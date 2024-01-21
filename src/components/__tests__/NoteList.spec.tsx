import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import NoteList from "../NoteList";

const mockNotes = [
    { id: 1, title: 'Note 1', content: 'Content 1' },
    { id: 2, title: 'Note 2', content: 'Content 2' },
];

describe('NoteList', () => {
    let axiosMock: MockAdapter;

    beforeEach(() => {
        axiosMock = new MockAdapter(axios);
    });

    afterEach(() => {
        axiosMock.restore();
    });

    it('renders the component with initial notes', async () => {
        axiosMock.onGet('http://localhost:8080/notes').reply(200, mockNotes);

        render(<NoteList />);

        // Wait for notes to be fetched and displayed
        await waitFor(() => {
            expect(screen.getByText('Note 1')).toBeInTheDocument();
            expect(screen.getByText('Note 2')).toBeInTheDocument();
        });
    });

    it('renders the component with an empty list of notes', async () => {
        axiosMock.onGet('http://localhost:8080/notes').reply(200, []);

        render(<NoteList />);

        // Wait for notes to be fetched and displayed
        await waitFor(() => {
            expect(screen.queryByText('Note 1')).toBeNull();
            expect(screen.queryByText('Note 2')).toBeNull();
            expect(screen.getByText('Moje notatki')).toBeInTheDocument();
        });
    });

    it('handles API error during notes fetching', async () => {
        axiosMock.onGet('http://localhost:8080/notes').reply(500);

        render(<NoteList />);

        // Wait for error message to be displayed
        await waitFor(() => {
            expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Błąd podczas pobierania notatek:'));
        });
    });

    it('calls deleteNote function on button click', async () => {
        axiosMock.onGet('http://localhost:8080/notes').reply(200, mockNotes);
        axiosMock.onDelete('http://localhost:8080/notes/1').reply(200);

        render(<NoteList />);

        // Wait for notes to be fetched and displayed
        await waitFor(() => {
            expect(screen.getByText('Note 1')).toBeInTheDocument();
        });

        // Click delete button
        fireEvent.click(screen.getByText('Usuń'));

        // Wait for the note to be deleted and notes to be refetched
        await waitFor(() => {
            expect(axiosMock.history.delete.length).toBe(1);
            expect(axiosMock.history.delete[0].url).toBe('http://localhost:8080/notes/1');
            expect(screen.queryByText('Note 1')).toBeNull();
        });
    });

    it('handles API error during note deletion', async () => {
        axiosMock.onGet('http://localhost:8080/notes').reply(200, mockNotes);
        axiosMock.onDelete('http://localhost:8080/notes/1').reply(500);

        render(<NoteList />);

        // Wait for notes to be fetched and displayed
        await waitFor(() => {
            expect(screen.getByText('Note 1')).toBeInTheDocument();
        });

        // Click delete button
        fireEvent.click(screen.getByText('Usuń'));

        // Wait for error message to be displayed
        await waitFor(() => {
            expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Błąd podczas usuwania notatki o ID 1:'));
        });
    });
});
