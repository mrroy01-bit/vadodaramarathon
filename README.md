# Vadodara Marathon Website

This is the official website for the Vadodara Marathon, built with React and Tailwind CSS.

## Features
- Event information and registration
- User authentication (login/registration)
- Sponsor and partner showcases
- Photo galleries
- Responsive design

## Project Structure
- `src/` - React source code
  - `Component/` - Reusable UI components
  - `pages/` - Main pages (Landing, Causes, Know Us, etc.)
  - `assest/` - Images and static assets
  - `services/` - API services and utilities
- `public/` - Static files and HTML template
- `tailwind.config.js` - Tailwind CSS configuration

## API Integration
The project includes API integration for authentication:
- Login: `{{base_url}}/api/login`
- Registration: `{{base_url}}/api/register`

Configure the API base URL in the `.env` file:
```
REACT_APP_API_BASE_URL=http://your-api-domain.com
```

## Getting Started
1. **Clone the repository:**
   ```bash
   git clone https://github.com/mrroy01-bit/vadodaramarathon.git
   cd vadodaramarathon
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:3000`.

## Build for Production
```bash
npm run build
```
The production-ready files will be in the `build/` directory.

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License.
