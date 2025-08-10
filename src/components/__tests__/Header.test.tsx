import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';

// Mock TypedText component
jest.mock('../TypedText', () => {
  return function MockTypedText({ strings, className }: { strings: string[], className?: string }) {
    const testId = className?.includes('title-styles') ? 'typed-text-title' : 'typed-text-name';
    return <div data-testid={testId}>{strings[0]}</div>;
  };
});

// Mock Icon component
jest.mock('@iconify/react', () => ({
  Icon: ({ icon, className }: any) => (
    <span data-testid={`icon-${icon}`} className={className}>{icon}</span>
  )
}));

describe('Header Component', () => {
  const mockSharedData = {
    name: "Victor Andrade",
    titles: ["Software Engineer", "Full Stack Developer"]
  };

  it('renders name correctly', () => {
    render(<Header sharedData={mockSharedData} />);
    expect(screen.getByTestId('typed-text-name')).toHaveTextContent(mockSharedData.name);
  });

  it('renders title correctly', () => {
    render(<Header sharedData={mockSharedData} />);
    expect(screen.getByTestId('typed-text-title')).toHaveTextContent(mockSharedData.titles[0].toUpperCase());
  });

  it('renders theme switch that toggles theme', () => {
    render(<Header sharedData={mockSharedData} />);
    const themeSwitch = screen.getByRole('switch');
    
    expect(themeSwitch).toBeInTheDocument();
    expect(themeSwitch).not.toBeChecked();

    fireEvent.click(themeSwitch);
    expect(themeSwitch).toBeChecked();
  });

  it('renders laptop icon', () => {
    render(<Header sharedData={mockSharedData} />);
    expect(screen.getByTestId('icon-la:laptop-code')).toBeInTheDocument();
  });

  it('handles missing data gracefully', () => {
    render(<Header sharedData={null} />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
