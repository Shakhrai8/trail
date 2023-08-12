# Trail - Discover the World around you

Trail is an intuitive, user-friendly web application that helps users discover the top 5 historical sites near their location. Users can get detailed descriptions of each location, complete with text-to-speech functionality and step-by-step navigation. We leverage the Google Places API for location data, and OpenAI's GPT for generating engaging and informative descriptions.

The application is live and can be accessed at [trailapp.net](https://trailapp.net).

<p align="center">
 <img src="https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=white" alt="JavaScript" />
 <img src="https://img.shields.io/badge/react-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=white" alt="React" />
 <img src="https://img.shields.io/badge/express-%23000000.svg?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
 <img src="https://img.shields.io/badge/node.js-%23339933.svg?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
 <img src="https://img.shields.io/badge/cypress-%2317202C.svg?style=for-the-badge&logo=cypress&logoColor=white" alt="Cypress" />
 <img src="https://img.shields.io/badge/jest-%23C21325.svg?style=for-the-badge&logo=jest&logoColor=white" alt="Jest" />
 <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
 <img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
 <img src="https://img.shields.io/badge/AI-%23E34F26.svg?style=for-the-badge&logoColor=white" alt="AI" />
 <img src="https://img.shields.io/badge/googlecloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white" alt="Google Cloud" />
</p>

## Screenshots

![](./trail-screenshot.jpg)

## Table of Contents

- [Installation and Configuration](#installation-and-configuration)
- [Directory Structure](#directory-structure)
- [Usage](#usage)
- [Testing](#testing)
- [Acknowledgements](#acknowledgements)

## Installation and Configuration

### 1. Clone the repository:

    
    git clone https://github.com/Shakhrai8/trail.git
    

### 2. Obtain necessary API keys:

#### Google Cloud API Key:

- Create/login to your Google Cloud account: [cloud.google.com](https://cloud.google.com/)
- Navigate to APIs and Services
- Create a new project and enable Places API, Distance Matrix API, Maps Javascript API, and Cloud Text-To-Speech API.
- Generate an API Key under credentials.

#### OpenAI Key:

- Head to [openai.com](https://openai.com/) and create an account.
- Follow the instructions to generate an API key.

### 3. Set Environment Variables:

    export GOOGLE_API_KEY=<insert key here>
    export OPENAI_KEY=<insert key here>
    export TextToSpeech_KEY=<insert RELATIVE PATH to key file here>

### 4. Install dependencies:

- Navigate to the `api` directory and install:

    ```
    cd trail/api/
    npm install
    ```

- Navigate to the `frontend` directory and install:

    ```
    cd ../frontend/
    npm install
    ```

## Directory Structure

This project is organized into two main directories:

- `api/`: This directory contains the backend server logic written in Express. The `routes/`, `controllers/`, and `common/` folders can be found here. The `common/` folder contains all the required API call files.
- `frontend/`: This directory houses the React frontend. All the components used in the project are contained in the `src/` directory.

## Usage

To run the server:

1. Go to `api/bin/`:
    ```
    cd api/bin/
    ```

2. Run the following command:
    ```
    node www.js
    ```

To run the frontend:

1. Go to the `frontend` folder:
    ```
    cd ../../frontend/
    ```

2. Run the following command:
    ```
    npm run dev
    ```

Now, the app should be running on your specified local port.

## Testing

We use Jest for backend testing and Cypress for end-to-end testing on the frontend.

- To run backend tests, navigate to the `api` directory and run `jest`.
- To run frontend tests, navigate to the `frontend` directory and run `npm run cypress:run`.


## Acknowledgements

- [Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview) for providing location data.
- [OpenAI GPT](https://openai.com/research/) for generating engaging descriptions.
