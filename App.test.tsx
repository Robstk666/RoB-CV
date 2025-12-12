
import React from 'react';
// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// Mock GSAP
vi.mock('gsap', () => {
  return {
    default: {
      registerPlugin: vi.fn(),
      context: vi.fn((cb) => {
        cb();
        return { revert: vi.fn() };
      }),
      timeline: vi.fn(() => ({
        to: vi.fn(),
        fromTo: vi.fn(),
      })),
      fromTo: vi.fn(),
      to: vi.fn(),
    },
  };
});

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {},
}));

describe('App Layout and Content', () => {
  it('renders correctly', () => {
    const { container } = render(<App />);
    const projectHeader = screen.getByText('Проекты & Компании');
    expect(projectHeader).toBeDefined();

    // Updated class selector to match new changes
    const gridContainer = container.querySelector('.grid.grid-cols-2.gap-1.opacity-80');
    expect(gridContainer).toBeDefined();

    if (gridContainer) {
        const buttons = gridContainer.querySelectorAll('button');
        console.log(`Number of project buttons found: ${buttons.length}`);
        expect(buttons.length).toBe(8);
    }
  });

  it('has correct classes for panels', () => {
      render(<App />);

      const dnaTexts = screen.getAllByText('Проф ДНК');
      const dnaText = dnaTexts[0];
      const leftPanel = dnaText.closest('div[class*="md:absolute"]');

      if (!leftPanel) throw new Error("Left panel not found");
      console.log('Left Panel Classes:', leftPanel.className);

      expect(leftPanel.className).toContain('md:left-0');

      const careerTexts = screen.getAllByText('Карьера');
      const careerText = careerTexts[0];

      let current = careerText.parentElement;
      while (current && !current.className.includes('md:right-0')) {
          current = current.parentElement;
      }

      if (!current) throw new Error("Right panel (with md:right-0) not found");
      console.log('Right Panel Classes:', current.className);

      expect(current.className).toContain('md:right-0');

      // Verify !left-auto is GONE (or just check left-auto is present without check for !)
      expect(current.className).toContain('md:left-auto');
      expect(current.className).not.toContain('md:!left-auto');
  });
});
