import { render, screen } from '@testing-library/react';
import App from './App';

test('renders editor interface', () => {
  render(<App />);
  const titleInput = screen.getByPlaceholderText(/Enter title.../i);
  const contentArea = screen.getByText(/Start writing here.../i);
  
  expect(titleInput).toBeInTheDocument();
  expect(contentArea).toBeInTheDocument();
});
