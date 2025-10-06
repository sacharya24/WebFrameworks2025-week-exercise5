import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeAll, afterEach } from "vitest";
import App from "./App.jsx";

// Mock global fetch
beforeAll(() => {
  global.fetch = vi.fn();
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("Food Recipe App", () => {
  it("loads and displays tags", async () => {
    // Mock fetch for tags
    (fetch as unknown as vi.Mock)
      .mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(["Pizza", "Pasta", "Cookies"]),
        })
      );

    render(<App />);

    // Wait for tags to appear
    await waitFor(() => {
      expect(screen.getByText("Pizza")).toBeInTheDocument();
      expect(screen.getByText("Pasta")).toBeInTheDocument();
      expect(screen.getByText("Cookies")).toBeInTheDocument();
    });
  });

  it("displays recipes when a tag is clicked", async () => {
    // Mock fetch for tags and recipes
    (fetch as unknown as vi.Mock)
      .mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(["Pizza", "Pasta", "Cookies"]),
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve({
              recipes: [
                {
                  id: 1,
                  title: "Classic Cheeseburger",
                  ingredients: ["Beef", "Bun"],
                  instructions: "Cook it",
                },
                {
                  id: 2,
                  title: "Double Mega burger",
                  ingredients: ["Beef", "Cheese"],
                  instructions: "Cook double",
                },
              ],
            }),
        })
      );

    render(<App />);

    // Wait for tag list
    await waitFor(() => {
      expect(screen.getByText("Pizza")).toBeInTheDocument();
    });

    // Click the Pizza tag
    fireEvent.click(screen.getByText("Pizza"));

    // Wait for recipes to appear
    await waitFor(() => {
      expect(screen.getByText("Classic Cheeseburger")).toBeInTheDocument();
      expect(screen.getByText("Double Mega burger")).toBeInTheDocument();
    });
  });

  it("goes back to tag list when back button is clicked", async () => {
    // Mock fetch for tags and recipes
    (fetch as unknown as vi.Mock)
      .mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(["Pizza", "Pasta"]),
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve({
              recipes: [
                {
                  id: 1,
                  title: "Classic Cheeseburger",
                  ingredients: ["Beef", "Bun"],
                  instructions: "Cook it",
                },
              ],
            }),
        })
      );

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Pizza")).toBeInTheDocument();
    });

    // Click the Pizza tag
    fireEvent.click(screen.getByText("Pizza"));

    // Wait for recipe to appear
    await waitFor(() => {
      expect(screen.getByText("Classic Cheeseburger")).toBeInTheDocument();
    });

    // Click back button
    fireEvent.click(screen.getByText("⬅ Back to Tags"));

    // Wait for tag list to appear again
    await waitFor(() => {
      expect(screen.getByText("Pizza")).toBeInTheDocument();
      expect(screen.getByText("Pasta")).toBeInTheDocument();
    });
  });
});
