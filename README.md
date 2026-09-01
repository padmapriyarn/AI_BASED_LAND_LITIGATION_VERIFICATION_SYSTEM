# AI-Based Land Litigation Verification System Using Survey Number

## 📌 Project Overview

The **AI-Based Land Litigation Verification System Using Survey Number** is a web-based application designed to simplify the process of land verification.

The system allows users to search for land information using details such as **district, village, and survey number**. It connects land records with available court case information and uses an AI service to provide a simple **litigation risk level, reason, and recommendation in Tamil**.

The system is designed to help users understand potential legal issues associated with a property before making property-related decisions.

---

## 🎯 Problem Statement

Land buyers, farmers, landowners, and other users may need to verify whether a property is associated with legal disputes before making a decision.

Land records and court case information can be difficult to search and understand when they are maintained separately. Manually checking different records can be time-consuming and confusing.

This project provides a centralized platform that connects available land records with associated litigation information and presents the results in an easy-to-understand format.

---

## 💡 Proposed Solution

The proposed system provides a centralized web application for:

* Managing land records
* Searching land using survey number
* Retrieving associated court case information
* Identifying available litigation details
* Performing AI-assisted risk analysis
* Providing a simple risk level: **Low, Medium, or High**
* Generating a reason and recommendation in **Tamil**

---

## ✨ Key Features

### 👤 User Authentication

* User registration
* User login
* Credential validation
* Database-based user management

### 🏡 Land Record Management

The system stores important land information such as:

* District
* Taluk
* Village
* Survey Number
* Owner Name
* Patta Number
* Land Area
* Land Type

Land types include:

* Agricultural
* Residential
* Commercial
* Industrial

### 🔍 Land Search and Verification

Users can search for land using available land details, with the **survey number** acting as an important identification field.

### ⚖️ Court Case Information

The system maintains litigation information associated with land records, including:

* Case Number
* Court Name
* Case Type
* Case Status

### 🤖 AI-Based Risk Analysis

The system sends available land and litigation information to an AI service through the **OpenRouter API**.

The AI provides:

* Risk Level – Low / Medium / High
* Reason – in Tamil
* Recommendation – in Tamil

### 👨‍💼 Admin Panel

The administrator can add and manage land records that are stored in the MySQL database and later used for verification.

---

## 🔄 System Workflow

```text
User
  ↓
Register / Login
  ↓
Enter Land Details
  ↓
Search Using Survey Number
  ↓
Node.js / Express Backend
  ↓
MySQL Database
  ↓
Retrieve Land Record
  ↓
Check Associated Court Cases
  ↓
AI Analysis
  ↓
Risk Level + Reason + Recommendation
  ↓
Verification Result
```

---

## 🛠️ Technology Stack

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MySQL

### Database Connectivity

* Node.js MySQL connection

### AI Service

* OpenRouter API
* OpenAI GPT-3.5 Turbo through OpenRouter

### Communication

* REST API

### Development Environment

* Localhost
* Server Port: `5000`

---

## 🏗️ System Architecture

The application follows a simple layered architecture.

### 1. User Layer

Users access the application through a web browser and enter land-related information.

### 2. Frontend Layer

HTML, CSS, and JavaScript provide the user interface for:

* Registration
* Login
* Land search
* Land information entry
* Verification results

### 3. Backend Layer

Node.js and Express.js process requests from the frontend and communicate with the database and AI service.

### 4. Database Layer

MySQL stores:

* User information
* Land records
* Court case information
* Relationships between land and court cases

### 5. AI Analysis Layer

The backend sends relevant land and litigation information to the OpenRouter AI API for analysis.

### 6. Result Layer

The system displays the available land information, litigation details, AI risk level, reason, and recommendation.

---

## 🤖 AI Component

The AI component is used to analyze the available land and court case information.

The backend creates a prompt using the retrieved information and sends it to the AI model through the OpenRouter API.

The expected AI response contains:

```text
Risk Level
Reason
Recommendation
```

The risk level is classified as:

* 🟢 Low
* 🟡 Medium
* 🔴 High

The reason and recommendation are generated in Tamil to make the result easier for local users to understand.

---

## 🔌 API Endpoints

The backend provides REST API endpoints for the major system operations.

### User Registration

```text
POST /api/register
```

Registers a new user.

### User Login

```text
POST /api/login
```

Authenticates a registered user.

### Add Land Record

```text
POST /api/add-land
```

Adds a new land record to the database.

### Retrieve Land Information

```text
GET /api/land
```

Retrieves land information and associated court case details.

### AI Land Analysis

```text
POST /api/ai-check
```

Performs AI-based land litigation risk analysis.

---

## 🗄️ Database Design

The MySQL database contains the main information required by the application.

### Users

Stores user authentication information required for registration and login.

### Land Records

Stores:

* ID
* District
* Taluk
* Village
* Survey Number
* Owner Name
* Patta Number
* Land Area
* Land Type

### Court Cases

Stores:

* Case Number
* Court Name
* Case Type
* Case Status
* Associated Land ID

The relationship between land records and court cases allows the system to retrieve litigation information associated with a particular property.

---

## 🚀 How to Run the Project

### 1. Clone the Repository

```bash
git clone <repository-url>
cd AI-Land-Litigation-Verification
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure MySQL

Create the required MySQL database and tables for:

* Users
* Land Records
* Court Cases

Update the database connection details in the backend configuration.

### 4. Configure AI API

Add your OpenRouter API key to the project configuration or environment variables.

Example:

```text
OPENROUTER_API_KEY=your_api_key
```

Do not upload your actual API key to GitHub.

### 5. Start the Backend

```bash
node server.js
```

The backend runs on:

```text
http://localhost:5000
```

### 6. Open the Application

Open the frontend in a browser and use the registration/login and land verification features.

---

## 🧪 Testing

The major functionalities of the system can be tested using:

* User registration
* Duplicate registration
* Valid login
* Invalid login
* Adding land records
* Retrieving land records
* Retrieving associated court cases
* AI-based land analysis
* Empty or invalid input handling

The system should return appropriate responses for valid and invalid inputs.

---

## 📊 Sample Verification

### Sample Input

```text
District      : Trichy
Village       : Example Village
Survey Number : 123/4
Owner Name    : Example Owner
Patta Number  : P12345
Land Area     : 2 Acres
Land Type     : Agricultural
```

### Sample Output

```text
Land Status   : Record Found
Owner         : Example Owner
Survey Number : 123/4
Land Type     : Agricultural
Court Case    : Available
Risk Level    : Medium
```

The AI also provides a reason and recommendation in Tamil based on the available land and litigation information.

> Sample values are for demonstration purposes only.

---

## ⚠️ Limitations

* The system depends on the land and court case information stored in its database.
* It does not independently verify ownership using official government records.
* AI analysis depends on the information provided to the AI service.
* AI-generated results should not be considered professional legal advice.
* The current version is primarily developed and tested in a local environment.
* External AI API availability can affect the analysis feature.
* Existing disputes may not be detected if the corresponding information is not available in the database.

---

## 🔮 Future Scope

The project can be enhanced with:

* Integration with authorized government land record sources
* Automated land document verification
* AI-based document analysis
* Advanced litigation risk analysis
* Complete Tamil language support
* Map-based land identification
* Stronger authentication and password security
* Cloud deployment
* Improved legal document analysis
* More comprehensive court case data integration

---

## 🎯 Target Users

The system is mainly designed for:

* Land Buyers
* Farmers
* Land Owners
* General Users
* Property-related Users
* Administrators

---

## 📸 Project Screenshots

Add your actual project screenshots here:

```text
1. User Registration Page
2. User Login Page
3. Land Search Page
4. Land Search with Survey Number
5. Land Verification Result
6. Court Case Details
7. AI Litigation Analysis
8. Print Report Preview
```


## 📚 References

* Node.js Documentation
* Express.js Documentation
* MySQL Documentation
* OpenRouter API Documentation
* OpenAI Model Documentation
* HTML Documentation
* CSS Documentation
* JavaScript Documentation

---

## ⚖️ Disclaimer

This project is developed for **academic and research purposes**. The system provides AI-assisted preliminary analysis based on the information available in its database. It does not replace official government land records, legal verification, or professional legal advice.
