import Loading from '../components/Loading';
import { render, screen } from '@testing-library/react';

test('renders loading screen', () => {
  render(<Loading name="test"/>);
  const textElement = screen.getByText('Loading test please wait...');
  expect(textElement).toBeInTheDocument();

  const element = screen.getByLabelText('LoadingMessageDisplay');
  expect(element).toBeInTheDocument();
});