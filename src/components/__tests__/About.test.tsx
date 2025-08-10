import { render, screen } from '@testing-library/react';
import About from '../About';

// Mock Icon component
jest.mock('@iconify/react', () => ({
  Icon: ({ icon, style }: any) => (
    <span data-testid={`icon-${icon}`} style={style}>{icon}</span>
  )
}));

describe('About Component', () => {
  const mockSharedBasicInfo = {
    name: "Victor Andrade",
    image: "myProfile.jpg"
  };

  const mockResumeBasicInfo = {
    section_name: {
      about: "About Me"
    },
    description_header: "Hi!",
    description: "I'm a software engineer"
  };

  it('renders section name correctly', () => {
    render(
      <About 
        sharedBasicInfo={mockSharedBasicInfo}
        resumeBasicInfo={mockResumeBasicInfo}
      />
    );
    expect(screen.getByText(mockResumeBasicInfo.section_name.about)).toBeInTheDocument();
  });

  it('renders profile image', () => {
    render(
      <About 
        sharedBasicInfo={mockSharedBasicInfo}
        resumeBasicInfo={mockResumeBasicInfo}
      />
    );
    const img = screen.getByAltText('Avatar placeholder');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', `images/${mockSharedBasicInfo.image}`);
  });

  it('renders tech stack icons', () => {
    render(
      <About 
        sharedBasicInfo={mockSharedBasicInfo}
        resumeBasicInfo={mockResumeBasicInfo}
      />
    );
    
    const icons = [
      'logos:angular',
      'logos:react',
      'logos:php'
    ];

    icons.forEach(icon => {
      expect(screen.getByTestId(`icon-${icon}`)).toBeInTheDocument();
    });
  });

  it('renders description content', () => {
    render(
      <About 
        sharedBasicInfo={mockSharedBasicInfo}
        resumeBasicInfo={mockResumeBasicInfo}
      />
    );
    
    const waveElement = screen.getByText((content, element) => {
      return element?.classList.contains('wave') && content.includes(mockResumeBasicInfo.description_header) || false;
    });
    expect(waveElement).toBeInTheDocument();
    expect(screen.getByText(mockResumeBasicInfo.description)).toBeInTheDocument();
  });

    it('handles missing data gracefully', () => {
    render(
      <About
        sharedBasicInfo={null}
        resumeBasicInfo={null}
      />
    );
    expect(screen.getByTestId('about-section')).toBeInTheDocument();
  });
});
