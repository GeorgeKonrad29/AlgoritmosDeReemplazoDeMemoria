# Memory Replacement Algorithms

This project implements various page replacement algorithms to demonstrate how they function. The algorithms included in this project are:

1. **FIFO (First-In-First-Out)**: This algorithm replaces the oldest page in memory. It is simple to implement but can lead to suboptimal performance in certain scenarios.

2. **FIFO+**: An enhancement of the FIFO algorithm, FIFO+ introduces optimizations to improve performance by considering the frequency of page usage.

3. **LRU (Least Recently Used)**: This algorithm keeps track of page usage over time and replaces the least recently used page when a page fault occurs. It is more efficient than FIFO in many cases.

4. **Optimal**: This algorithm replaces the page that will not be used for the longest period of time in the future. While it provides the best possible performance, it requires knowledge of future requests, making it impractical for real-world use.

## Project Structure

- `index.html`: The main HTML document that serves as the entry point for the application.
- `css/styles.css`: Contains basic styles for the application.
- `js/app.js`: The main JavaScript file that initializes the application and handles user interactions.
- `js/algorithms/`: Contains the implementations of the various page replacement algorithms:
  - `fifo.js`: Implementation of the FIFO algorithm.
  - `fifo-plus.js`: Implementation of the FIFO+ algorithm.
  - `lru.js`: Implementation of the LRU algorithm.
  - `optimal.js`: Implementation of the Optimal algorithm.

## How to Run the Project

1. Clone the repository to your local machine.
2. Open `index.html` in a web browser.
3. Use the interface to select and test different page replacement algorithms with various reference strings and frame sizes.

This project is intended for educational purposes to help understand how different page replacement algorithms work in memory management.