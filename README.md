# R/Place Clone

Welcome to the R/Place Clone project! This project is a recreation of the popular Reddit April Fools' experiment, R/Place, where users collaboratively build and modify a canvas by placing colored pixels. This clone has been implemented using a combination of JavaScript for the frontend and Python for the backend.

![pic of application](https://i.redd.it/pvrdf0kxje691.png)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

R/Place Clone provides a platform for users to collectively create and modify pixel art on a shared canvas. The project aims to recreate the social and collaborative experience of the original R/Place experiment while offering a flexible and scalable architecture.



## Features

- **Real-time Collaboration**: Multiple users can simultaneously interact with the canvas in real-time, allowing for a dynamic and collaborative pixel art creation experience.

- **Pixel Placement Restrictions**: To prevent abuse, there are constraints on how often a user can place a pixel, and a cooldown period between placements.

- **Responsive Design**: The frontend is designed to be responsive, ensuring a seamless experience across various devices and screen sizes.

- **History and Undo**: The system keeps track of pixel changes, allowing users to undo their actions and review the history of the canvas.

## Technologies Used

- **Frontend**: JavaScript, HTML, CSS, WebSocket (for real-time communication)
- **Backend**: Python, Flask (web framework), WebSocket (for real-time communication)
- **Database**: MongoDB (for user authentication and data storage)
- **Deployment**: Docker, Heroku (or your preferred deployment platform)

## Getting Started

To get started with the R/Place Clone, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/r-place-clone.git
   cd r-place-clone
   ```

2. Install dependencies:
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   pip install -r requirements.txt
   ```

3. Set up the database:
   - Create a MongoDB database and update the database configuration in the backend.

4. Run the application:
   ```bash
   # Run the frontend
   cd frontend
   npm start

   # Run the backend
   cd ../backend
   python app.py
   ```

5. Open your browser and navigate to `http://localhost:3000` to access the R/Place Clone.

## Project Structure

The project is structured into two main components:

- **frontend**: Contains the JavaScript, HTML, and CSS files for the user interface.
- **backend**: Implements the server-side logic using Python and Flask.

## Usage

1. Register an account or log in if you already have one.
2. Start placing pixels on the canvas by selecting a color and clicking on the desired location.
3. Collaborate with other users in real-time to create unique pixel art.
4. Use the undo feature to revert your actions or explore the canvas's history.

## Contributing

Contributions are welcome! If you have ideas for improvements, new features, or bug fixes, please submit a pull request. For major changes, please open an issue first to discuss the proposed changes.

## License

This project is licensed under the [MIT License](LICENSE).

Thank you for checking out the R/Place Clone project! We hope you enjoy the collaborative pixel art experience.
