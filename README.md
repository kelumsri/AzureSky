# AzureSky Weather App

A modern, real-time weather application built with React and Vite. AzureSky provides a sleek interface for tracking weather conditions, forecasts, and alerts across multiple cities worldwide.

## 🌟 Features

-   **Real-time Weather Data**: Get up-to-date weather information for cities worldwide
-   **City Search**: Powerful search functionality to find and select cities quickly
-   **Weather Metrics**: Comprehensive weather data including:
    -   Temperature (current, feels like, high/low)
    -   Humidity, Pressure, Wind speed and direction
    -   Visibility, Cloud coverage, Wind gusts
    -   Sunrise and Sunset times
-   **Automatic Refresh**: Weather data refreshes every 5 minutes automatically
-   **Smart Caching**: Efficient localStorage caching to reduce API calls
-   **Responsive Design**: Beautiful, modern UI that works on all devices
-   **Secure Authentication**: Protected access with Auth0 integration

## 🔐 Authentication & Authorization

### Auth0 Integration

AzureSky uses **Auth0** for secure user authentication and authorization. The application implements the following security features:

#### Authentication Flow

-   Users must authenticate via Auth0 before accessing weather data
-   Seamless login experience with redirect-based authentication
-   User profile information is displayed in the navigation bar

#### Signup Restriction

-   **Public signups are disabled** - Only pre-registered users can access the application
-   Users must be added to the Auth0 tenant by an administrator
-   This ensures that only authorized users can access the weather application
-   Prevents unauthorized account creation and maintains control over user base

#### Multi-Factor Authentication (MFA)

-   **MFA is enabled for all pre-registered users** in the Auth0 tenant
-   Users are required to set up MFA during their first login
-   Supports various MFA methods (Email verification)
-   Enhances security by requiring a second authentication factor beyond username/password
-   MFA configuration is managed through the Auth0 dashboard

#### User Management

-   User authentication state is checked on every route
-   Unauthenticated users are redirected to the landing page
-   Authenticated users have full access to weather features
-   Secure logout functionality with proper session cleanup

### Auth0 Configuration

The application uses the following Auth0 setup:

-   **Domain**: `dev-gd46by85swq1glsr.us.auth0.com`
-   **Client ID**: Configured for Single Page Application (SPA)
-   **Redirect URI**: Automatically set to the application origin
-   **Response Type**: Authorization code flow with PKCE

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18 or higher recommended)
-   npm or yarn package manager
-   Auth0 account with tenant configured

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd AzureSky
```

2. Install dependencies:

```bash
npm install
```


5. Start the development server:

```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

Preview the production build:

```bash
npm run preview
```

## 📁 Project Structure

```
AzureSky/
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── button.jsx          # Button component
│   │       ├── Navigation.jsx      # Navigation bar with search
│   │       └── Weathercard.jsx     # Weather display card
│   ├── Pages/
│   │   ├── Home.jsx                # Main weather page (protected)
│   │   └── Lnading.jsx            # Landing/login page
│   ├── services/
│   │   └── weatherService.js      # Weather API integration
│   ├── assets/
│   │   └── cities.json            # City data
│   ├── lib/
│   │   └── utils.js               # Utility functions
│   ├── App.jsx                    # Main app component
│   ├── main.jsx                   # Application entry point
│   └── index.css                  # Global styles
├── public/                        # Static assets
├── package.json                   # Dependencies
├── vite.config.js                 # Vite configuration
└── README.md                      # This file
```

## 🛠️ Tech Stack

### Core

-   **React 19** - UI library
-   **Vite 7** - Build tool and dev server
-   **React Router DOM** - Client-side routing

### Authentication

-   **@auth0/auth0-react** - Auth0 React SDK for authentication

### UI & Styling

-   **Tailwind CSS 4** - Utility-first CSS framework
-   **Lucide React** - Icon library
-   **Radix UI** - Accessible component primitives
-   **class-variance-authority** - Component variants
-   **clsx** & **tailwind-merge** - Class name utilities

### Data & HTTP

-   **Axios** - HTTP client for API requests
-   **OpenWeatherMap API** - Weather data source

### Development Tools

-   **ESLint** - Code linting
-   **TypeScript types** - Type definitions for better IDE support

## 🔧 Configuration

### Environment Variables (Optional)

For production, consider using environment variables:

```env
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_WEATHER_API_KEY=your-api-key
```

Update `src/main.jsx`:

```javascript
domain: import.meta.env.VITE_AUTH0_DOMAIN,
clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
```

Update `src/services/weatherService.js`:

```javascript
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
```

## 📝 Usage

### For End Users

1. **Access the Application**: Navigate to the AzureSky weather app
2. **Login**: Click the "Login" button on the landing page
3. **Complete MFA**: If prompted, complete multi-factor authentication
4. **Search Cities**: Use the search bar in the navigation to find cities
5. **View Weather**: Select a city to view detailed weather information
6. **Automatic Updates**: Weather data refreshes every 5 minutes automatically

### For Administrators

1. **User Management**: Add users through the Auth0 dashboard
2. **MFA Configuration**: Enable MFA in Auth0 Settings → Multi-factor Auth
3. **Disable Signups**: Ensure "Disable Sign Ups" is enabled in Auth0 dashboard
4. **Monitor Access**: Review authentication logs in Auth0 dashboard

## 🔒 Security Features

-   **No Public Signups**: Only pre-registered users can access
-   **Multi-Factor Authentication**: Required for all users
-   **Secure Session Management**: Proper token handling via Auth0
-   **Protected Routes**: Weather features only accessible to authenticated users
-   **API Key Protection**: Weather API keys should be secured (consider using environment variables)

## 📊 API Information

### OpenWeatherMap API

The application uses OpenWeatherMap's Current Weather Data API:

-   **Endpoint**: `https://api.openweathermap.org/data/2.5/weather`
-   **Caching**: Weather data is cached in localStorage for 5 minutes
-   **Units**: Metric (Celsius, km/h)
-   **Rate Limiting**: Be aware of API rate limits for your plan

## 🎨 Features in Detail

### City Search

-   Real-time search filtering
-   Displays up to 8 matching cities
-   Shows city code alongside city name
-   Click to select and view weather

### Weather Card

-   Large temperature display with feels-like temperature
-   High/low temperature indicators
-   Comprehensive weather metrics grid
-   Sunrise/sunset times
-   Conditional display of optional metrics (visibility, clouds, gusts)

### Navigation

-   User profile display with avatar
-   Logout functionality
-   Responsive design

## 🐛 Troubleshooting

### Authentication Issues

-   Ensure Auth0 domain and client ID are correctly configured
-   Check Auth0 dashboard for user account status
-   Verify MFA setup is complete
-   Check browser console for authentication errors

### Weather Data Issues

-   Verify OpenWeatherMap API key is valid
-   Check API rate limits
-   Clear browser localStorage if cached data is stale
-   Check network tab for API request errors

## 📄 License

This project is private and proprietary.

## 👥 Contributing

This is a private project. For questions or issues, contact the project administrator.

## 📧 Support

For support regarding:

-   **Auth0 Configuration**: Consult [Auth0 Documentation](https://auth0.com/docs)
-   **Weather API**: Consult [OpenWeatherMap Documentation](https://openweathermap.org/api)
-   **Application Issues**: Contact the development team

---

Built with ❤️ using React, Vite, and Auth0
