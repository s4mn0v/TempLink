# Temporary Link Generator with Nuxt, Pinia, and UUID

This repository contains a Nuxt.js application that enables users to create temporary links with customizable expiration times. The app utilizes Vue 3 for the frontend, Pinia for state management, and the `uuid` library for generating unique identifiers for each link.

## Features

- **Create Temporary Links**: Users can generate links with a specified title and a time limit (1 to 60 minutes).
- **Countdown Timer**: Each link features a countdown timer that displays the remaining time until expiration.
- **Link Validation**: The application checks if links are still valid based on their creation time and time limit.
- **Persistent Storage**: Links are stored in the browser's local storage, allowing users to refresh or navigate without losing data.
- **User-Friendly Interface**: An intuitive form for creating links and a straightforward display of active links with options to delete them.

## Technologies Used

- **Nuxt.js**: Framework for building server-rendered Vue applications.
- **Vue 3**: JavaScript framework for building user interfaces.
- **Pinia**: State management library for Vue applications.
- **UUID**: Library for generating unique IDs for links.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/s4mn0v/TempLink.git
   cd TempLink
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev -- -o
   ```

## Usage

1. Access the application in your browser (usually at `http://localhost:3000`).
2. Use the form to create new temporary links.
3. Click on the generated links to view them and see the countdown timer.
4. Delete any link you no longer need.