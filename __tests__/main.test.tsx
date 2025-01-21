// __test__/main.test.tsx

import { render, screen } from '@testing-library/react';
import { expect, describe, it } from 'vitest';

describe('Basic React rendering', () => {
  it('renders Hello, World!', () => {
    render(<div>Hello, World!</div>);
    const helloWorldText = screen.getByText(/Hello, World!/i);
    expect(helloWorldText).toBeInTheDocument();
  });
});

