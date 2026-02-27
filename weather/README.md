# 🌦️ Weatherly

Weatherly is a React application that combines a modern weather interface with an admin dashboard for managing users. It uses **Supabase** for authentication and user storage, and **Redux Toolkit** for global state management.

---

## Features

### Authentication (Supabase)
- Email + password login  
- Automatic account creation if the user does not exist  
- Logout  
- Protected routes  

### Admin Dashboard
- View all users (from Supabase `users` table)  
- Sorting, filtering, and pagination  
- Add new users  
- Delete users  
- Auto-logout if a user deletes their own account  

### Weather App
- Search for cities  
- Current weather + forecast  
- Favorite cities (saved in `localStorage`)  
- Recent searches (saved in `localStorage`)  
- Automatically reloads the last searched city after refresh  

---

## Tech Stack

- React + Vite  
- Redux Toolkit  
- Supabase Auth & Database  
- OpenWeather API  

---

##  Installation

```bash
git clone https://github.com/bndlaura/MyDataApp.git
cd weather
npm install
```

Create a .env file
```code
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_WEATHER_API_KEY=your_openweather_api_key
```

Run the project
```bash
npm run dev
```

## Supabase Setup

Create the users table:

```sql
create table users (
  id bigint generated always as identity primary key,
  auth_id uuid references auth.users(id) on delete cascade,
  email text unique
);
```
