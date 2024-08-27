import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ComingSoon from '@/components/common/ComingSoon';
import { expect } from '@jest/globals';

describe('empty page testing', () => {
  it('renders a heading', () => {
    render(<ComingSoon />);
    const heading = screen.getByTestId('coming-soon');
    expect(heading.textContent).toStrictEqual('Coming Soon !');
  });
});
