# Power BI Report Viewer App

## Overview

The **Power BI Report Viewer App** is a web application that allows users to securely log in and access embedded Power BI reports online. The app integrates with Microsoft Power BI to provide seamless access to interactive reports and dashboards.

---

## Features

- **User Authentication**: Secure login system for users.
- **Power BI Integration**: Embed and view Power BI reports directly in the app.
- **Responsive Design**: Works on desktop and mobile devices.
- **Role-Based Access Control**: Restrict access to reports based on user roles.
- **Easy Deployment**: Simple setup and deployment process.

---

## Prerequisites

Before you begin, ensure you have the following:

1. **Node.js** installed (v16 or higher).
2. A **Microsoft Power BI** account with reports published to the Power BI Service.
3. **Azure AD App Registration** for authentication and Power BI API access.
4. **MongoDB** (or any other database) for storing user data.

---

## Technologies Used

- **Frontend**: Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Power BI Integration**: Power BI REST API, Power BI Embedded

---

## Installation

### 1. Install Dependencies

Run the following command to install all dependencies:

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the `config` folder and add the following variables:

```env
PORT = 2121 # (can be any port, e.g., 3000)
DB_STRING = your_database_URI
CLOUD_NAME = your_cloudinary_cloud_name
API_KEY = your_cloudinary_api_key
API_SECRET = your_cloudinary_api_secret
```

---

## Run the Application

To start the application, run:

```bash
npm start
```

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Support

For any questions or issues, please open an issue on the [GitHub repository](https://github.com/your-username/power-bi-report-viewer/issues).

---

Enjoy using the Power BI Report Viewer App! 🚀

---

### Notes:

- Replace placeholders like `your_database_URI`, `your_cloudinary_cloud_name`, etc., with actual values.
- Add a `LICENSE` file if you want to include licensing information.
- Customize the content further based on your app's specific features and requirements.
