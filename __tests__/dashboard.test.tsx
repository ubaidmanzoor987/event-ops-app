import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import PartialDashboard from '@/components/pages-partial/dashboard';
import { expect } from '@jest/globals';

describe('dashboard render', () => {
  it('does not display the heading with data-testid="coming-soon"', () => {
    render(<PartialDashboard />);
    const heading = screen.queryByTestId('coming-soon');
    expect(heading).toBeNull();
  });
});
