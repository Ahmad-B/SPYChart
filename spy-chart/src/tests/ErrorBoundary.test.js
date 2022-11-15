import { render, screen } from '@testing-library/react';
import ErrorBonudary from '../components/ErrorBoundary';

const AriaLabelForTextDisplay = "ErrorMessageDisplay"

test('renders error screen', () => {
    render(<ErrorBonudary />);
    var errorText = "An error has occured, please try refreshing the page";
    const textElement = screen.getByLabelText(AriaLabelForTextDisplay);
    expect(textElement).toBeInTheDocument();

    const element = screen.getByText(errorText);
    expect(element).toBeInTheDocument();
});

test('renders error screen with custom message', () => {
    const errorText = "test error";
    render(<ErrorBonudary message={errorText} />);
    const textElement = screen.getByLabelText(AriaLabelForTextDisplay);
    expect(textElement).toBeInTheDocument();

    const element = screen.getByText(errorText);
    expect(element).toBeInTheDocument();
});