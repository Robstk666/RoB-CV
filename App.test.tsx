// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';
import { vi, describe, test, expect } from 'vitest';

// Mock GSAP
vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
    timeline: vi.fn(() => ({
      to: vi.fn(),
      fromTo: vi.fn(),
    })),
    to: vi.fn(),
    fromTo: vi.fn(),
    context: vi.fn((func) => {
      func();
      return { revert: vi.fn() };
    }),
  },
  ScrollTrigger: {},
}));

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {},
}));

describe('App Layout and Content', () => {
  test('renders 8 projects in the projects list', () => {
    render(<App />);
    const projects = [
      "Сайты за 72 часа",
      "Росстройконтроль",
      "ГАУК «ЦВИ»",
      "Парк Отель",
      "Бойцовский клуб FINT",
      "Rob's Rentals",
      "Chillin Place",
      "Акимбо"
    ];

    projects.forEach(project => {
      const elements = screen.getAllByText(project);
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  test('Career panel has correct desktop positioning classes', () => {
    render(<App />);
    const careerHeaders = screen.getAllByText('Карьера');
    let foundPanel = false;

    for (const header of careerHeaders) {
        let element: HTMLElement | null = header;
        while (element) {
            if (element.className.includes('absolute') && element.className.includes('md:w-1/3') && element.className.includes('md:right-0')) {
                foundPanel = true;
                expect(element.className).toContain('md:left-auto');
                expect(element.className).toContain('md:right-0');
                break;
            }
            element = element.parentElement;
        }
        if (foundPanel) break;
    }
    expect(foundPanel).toBe(true);
  });

  test('DNA panel has correct desktop positioning classes', () => {
    render(<App />);
    const dnaHeaders = screen.getAllByText('Проф ДНК');
    let foundPanel = false;

    for (const header of dnaHeaders) {
        let element: HTMLElement | null = header;
        while (element) {
            if (element.className.includes('md:absolute') && element.className.includes('md:left-0') && element.className.includes('md:w-1/3')) {
                foundPanel = true;
                expect(element.className).toContain('md:left-0');
                break;
            }
            element = element.parentElement;
        }
        if (foundPanel) break;
    }
    expect(foundPanel).toBe(true);
  });
});
