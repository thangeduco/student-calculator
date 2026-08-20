/**
 * Frontend render smoke test (DEV-01).
 *
 * Also guards scope: the calculator UI must not appear before DEV-05.
 */

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { App } from './App';

describe('App', () => {
  it('renders the application shell', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Student Calculator');
  });

  it('renders no calculator controls yet (owned by DEV-05)', () => {
    render(<App />);

    expect(screen.queryAllByRole('textbox')).toHaveLength(0);
    expect(screen.queryAllByRole('spinbutton')).toHaveLength(0);
    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });
});
