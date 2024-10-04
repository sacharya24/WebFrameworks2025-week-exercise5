import { render, screen, within, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { vi } from 'vitest';
import { mockTagList, mockRecipeList } from "./testMockData";

// Mock the global fetch function
global.fetch = vi.fn();

beforeEach(() => {
  // Clear mock history before each test
  global.fetch.mockClear();
});

test("renders the basic app and tag list", async () => {

  // Set up mock fetch response
  global.fetch.mockResolvedValueOnce({
    json: async () => mockTagList,
  });

  render(
      <App />
  );
  const headerElement = screen.getByText(/ACME Recipe O'Master/i);
  expect(headerElement).toBeInTheDocument();

  // check that tags are visible
  // Wait for the fetch to resolve and the component to re-render
  await waitFor(() => {
    expect(screen.getByText(mockTagList[0])).toBeInTheDocument();
    expect(screen.getByText(mockTagList[1])).toBeInTheDocument();
    expect(screen.getByText(mockTagList[2])).toBeInTheDocument();
  });
});

test("clicking a pizza tag shows the pizza recipe list", async () => {
  // Set up mock fetch response
  global.fetch.mockResolvedValueOnce({
    json: async () => mockTagList,
  });

  global.fetch.mockResolvedValueOnce({
    json: async () => {
      const pizzaRecipes = mockRecipeList.recipes.filter(r => r.tags.includes('Pizza'));
      return { recipes: pizzaRecipes };
    }
  });

  render(
      <App />
  );

  // Wait for the fetch to resolve and the component to re-render
  await waitFor(() => {
    const tagElement = screen.getByText('Pizza');
    userEvent.click(tagElement);
  });

  // Wait for the fetch to resolve and the component to re-render
  await waitFor(() => {
    expect(screen.getByText('Classic Margherita Pizza')).toBeInTheDocument();
  });
});

test("clicking a burger tag shows the burger recipe list", async () => {
   // Set up mock fetch response
   global.fetch.mockResolvedValueOnce({
    json: async () => mockTagList,
  });

  global.fetch.mockResolvedValueOnce({
    json: async () => {
      const burgerRecipes = mockRecipeList.recipes.filter(r => r.tags.includes('Burger'));
      return { recipes: burgerRecipes };
    }
  });

  render(
      <App />
  );

  expect(screen.queryByText('Classic Cheeseburger')).not.toBeInTheDocument();
  expect(screen.queryByText('Spaghetti Carbonara')).not.toBeInTheDocument();

  // Wait for the fetch to resolve and the component to re-render
  await waitFor(() => {
    const tagElement = screen.getByText('Burger');
    userEvent.click(tagElement);
  });

  // Wait for the fetch to resolve and the component to re-render
  await waitFor(() => {
    expect(screen.getByText('Classic Cheeseburger')).toBeInTheDocument();
    expect(screen.getByText('Double Mega burger')).toBeInTheDocument();
    // Check that a non-burger recipe is NOT displayed on the screen
    expect(screen.queryByText('Spaghetti Carbonara')).not.toBeInTheDocument();
  });
});

