# ReVape

## Project Overview

ReVape is a comprehensive system developed to tackle the environmental issues caused by the improper disposal of vape devices. The project consists of both hardware and software components designed to create an efficient vape recycling management system. It connects manufacturers, recycling facilities, retailers, and users in an effort to promote the responsible disposal of used vaping devices.

The software component is a mobile and web application that encourages users to recycle vapes by offering rewards. The hardware consists of containers equipped with screens and sensors to gather data and provide feedback to users.

## Objectives

The ReVape project focuses on creating an integrated system that combines hardware and software to promote responsible disposal practices. Key objectives include:
- **User Engagement:** Encourage users to dispose of vape devices properly using a points-based reward system.
- **Tracking and Management:** Enable users to track their disposal activity and earn rewards.
- **Seamless Integration:** Develop a user-friendly mobile app that allows users to view container locations, track points, and redeem rewards.
- **Hardware Integration:** Interface with vape recycling containers equipped with screens, LEDs, and sensors to collect data in real-time.

## System Architecture

### Software
- **Authentication:** Secure user login system using JSON Web Tokens (JWT) for authorized access.
- **Points System:** Users earn points by disposing of vapes in designated containers, which can be redeemed for rewards.
- **Google Maps Integration:** Users can locate nearby vape recycling containers through the app.
- **Coupons:** Redeemed points can be exchanged for discounts and rewards within the app.
- **Web Interface:** Web application built using the MERN stack (MongoDB, Express.js, React, Node.js) for efficient management.

### Hardware
- **Containers with Screens and LEDs:** Collect disposable vapes and display information such as QR codes and status updates.
- **Sensors (Infrared, Ultrasonic):** Gather real-time data such as capacity and object distance to monitor the status of recycling containers.
- **Server Communication:** Data is transmitted between the hardware (containers) and the server for tracking and management.

## Features
- **Mobile and Web App:** Users can interact with the system through a mobile and web application.
- **View Containers:** The app integrates with Google Maps to display nearby recycling containers.
- **Incentives:** Users earn points for responsible disposal and can redeem them for rewards.
- **Real-Time Data:** Hardware sensors provide up-to-date information on container status.
- **Security:** JWT-based authentication ensures that only authorized users can access the system.

## Dependencies

- **ReactJS:** A JavaScript library for building user interfaces. [ReactJS Documentation](https://react.dev/)
- **Node.js:** JavaScript runtime for backend services. [Node.js Documentation](https://nodejs.org/)
- **Express.js:** Web framework for Node.js applications. [Express.js Documentation](https://expressjs.com/)
- **MongoDB:** NoSQL database for storing user and container data. [MongoDB Documentation](https://www.mongodb.com/)
- **JWT (JSON Web Token):** Used for secure user authentication. [JWT Documentation](https://jwt.io/)
- **Google Maps API:** Displays container locations. [Google Maps API Documentation](https://developers.google.com/maps)

## Getting Started

### Prerequisites
- **Node.js** and **npm** installed.
- **MongoDB** set up locally or using a cloud provider.
- Access to **Google Maps API** keys for container location services.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/algoxpert.git
2. Install dependencies:
   ```bash
   cd algoxpert
   npm install
3. Setup MongoDB and update the connection string in the .env file.
4. Run the application:
   ```bash
   npm start

## Future Work
- User Engagement Features: Enhance the app with features to increase user participation, such as gamification and social sharing.
- Partnerships: Collaborate with manufacturers and retailers to expand the reach and impact of the ReVape system.
- Mobile App Transition: Consider transitioning the web app to a mobile app for better accessibility and flexibility.
- Security Enhancements: Conduct regular security audits to improve data protection and authentication mechanisms.
- Continuous Improvement: Keep the system updated with the latest developments in the MERN stack and other relevant technologies.
