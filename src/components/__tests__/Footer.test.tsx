import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer Component', () => {
  const mockSharedBasicInfo = {
    name: "Victor Andrade",
    social: [
      {
        name: "github",
        url: "https://github.com/victorandrad",
        class: "fab fa-github"
      },
      {
        name: "linkedin",
        url: "https://linkedin.com/in/victorandrad",
        class: "fab fa-linkedin"
      }
    ]
  };

  it('renders copyright with current year', () => {
    render(<Footer sharedBasicInfo={mockSharedBasicInfo} />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`${currentYear}`))).toBeInTheDocument();
  });

  it('renders all social links', () => {
    render(<Footer sharedBasicInfo={mockSharedBasicInfo} />);
    const links = screen.getAllByRole('link');
    
    expect(links).toHaveLength(mockSharedBasicInfo.social.length);
    links.forEach((link, index) => {
      expect(link).toHaveAttribute('href', mockSharedBasicInfo.social[index].url);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('renders social icons', () => {
    render(<Footer sharedBasicInfo={mockSharedBasicInfo} />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    
    mockSharedBasicInfo.social.forEach((network, index) => {
      expect(links[index]).toHaveAttribute('href', network.url);
      // Verifica se o elemento <i> com a classe CSS existe dentro do link
      const iconElement = links[index].querySelector('i');
      expect(iconElement).toBeInTheDocument();
      expect(iconElement).toHaveClass(network.class);
    });
  });

  it('handles missing data gracefully', () => {
    render(<Footer sharedBasicInfo={null} />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
