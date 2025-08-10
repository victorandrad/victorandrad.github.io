import { render } from '@testing-library/react';
import TypedText from '../TypedText';

// Mock Typed.js constructor
const mockTyped = jest.fn();
const mockDestroy = jest.fn();

jest.mock('typed.js', () => {
  return jest.fn().mockImplementation(() => ({
    destroy: mockDestroy
  }));
});

describe('TypedText Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockTyped.mockClear();
    mockDestroy.mockClear();
  });

  it('renders with provided strings', () => {
    const { container } = render(
      <TypedText 
        strings={["Test"]}
        className="test-class"
      />
    );
    expect(container.querySelector('span')).toBeInTheDocument();
  });

  it('applies custom className and style', () => {
    const className = "custom-class";
    const style = { color: 'red' };
    
    const { container } = render(
      <TypedText 
        strings={["Test"]}
        className={className}
        style={style}
      />
    );

    const element = container.querySelector('span');
    expect(element).toHaveClass(className);
    expect(element).toHaveStyle(style);
  });

  it('renders without crashing', () => {
    expect(() => {
      render(<TypedText strings={["Test"]} />);
    }).not.toThrow();
  });
});
