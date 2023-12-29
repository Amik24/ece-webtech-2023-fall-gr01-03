
# Blogging application - ECE Webtech project

Welcome to our Movie Rating Website project! This application is designed to allow users to discover, rate, and discuss their favorite movies using Next.js as a React framework, tailwind CSS and Supabase as our database. With user authentication, content management, and community interaction features, we've created a platform where movie enthusiasts can come together to share their thoughts and recommendations.

### Introduction

Our Movie Rating Website offers a comprehensive platform for movie lovers. Whether you're looking for the latest blockbuster, a classic gem, or a hidden indie gem, our platform provides you with a space to explore, rate, and review movies. You can connect with other users, engage in discussions through film rating and commenting, and stay updated on the latest film releases, with a possibility to add films and series to a watchlist to remember on your next movie night.

## Prerequisites

Before you get started, make sure you have the following prerequisites if you want to run the website on your machine:

- Node.js: Ensure you have Node.js installed on your machine.
- Supabase Account: Sign up for a Supabase account to handle user authentication and database storage.
- GitHub Account: You'll need a GitHub account to authenticate with our platform.

## Installation

Follow these steps to set up the Movie Rating Website on your local machine:

1. Clone the GitHub repository:

   ```bash
   git clone https://github.com/your-username/movie-rating-website.git

2. Instal Node.js
    ```bash
    npm install

3. Create and enter into a .env.local file insipe the app folder the environnement keys as follow:

    ```bash
    NEXT_PUBLIC_SUPABASE_URL= https://lggtnepnxoddkoxrgufh.supabase.co
    NEXT_PUBLIC_SUPABASE_ANON_KEY= eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxnZ3RuZXBueG9kZGtveHJndWZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM2NzM3MjEsImV4cCI6MjAxOTI0OTcyMX0.r_R06o0M_oRtYRNXZVl6ucadPoTo_YFynRSloixzrDY
    OMDB_API_KEY= aadb27a

4. Run the Application

    ```bash
    npm run dev 


## Deliverables 

- Vercel URL: *https://ece-webtech-2023-fall-gr01-03.vercel.app/*
- Supabase project URL: *https://supabase.com/dashboard/project/lggtnepnxoddkoxrgufh*

## Authors

- *Ikram AMINE, Grp01(inter)-03*
- *Alexandre BENSARSA, Grp01(inter)-03*
- *Clement GASNET, Grp01(inter)-03*

## Evaluation

### Mandatory Tasks

* **Naming convention**
  * Grade: *1.5/2*
  * Comments: *Every of our commit for this project respect the common naming convention, folders have an explicit name and files are named accordingly to their use, we however haven't got the time to squash previous commit not respecting that convention*
* **Project structure**
  * Grade: *2/2*
  * Comments: *The structure respect what was asked and is comprehensible*, with two main folders, app and supabase, inside the app folder we have 4 main folders
  one for the pages, one for the layout/components/ one for the public photos and a last one for the tailwind setup*
* **Git usage**
  * Grade: *2/2*
  * Comments: *We used git to commit and push our changes on the master branch. Each commit's names use the conventional commit method and is labbeled with a keyword like feat: or fix:.*
* **Code quality**
  * Grade: *4/4*
  * Comments: *Indentation and spacing are respected. The code is well structured and the function are clear and named properly*
* **Design, UX, and content**
  * Grade: *4/4*
  * Comments: *The button placement and functions are clear and intuitive. It is really easy to access what you search for and add or delete elements to what's possible. The CSS used with tailwind make the global appearance clean and simple to apprehend*

* **Home page**
  * Grade: *2/2*
  * Comments: *Home page is good looking, user can click on a carroussel of featured/trending movies and access their page to either add it to his wishlist or rate it*
  * Task feedback: *Hard to do the transition between local developpement and vercel deployment*
* **Navigation**
  * Grade: *2/2*
  * Comments: *Clear button on a navigation bar located in the header to access all usefull pages*
* **Login and profile page**
  * Grade: *How many points you think you deserve*
  * Comments: *How did you implement the task*
  * Task feedback: *Facultative, how did you find the task (difficulty, pertinence...)*
* **Post creation and display**
  * Grade: *How many points you think you deserve*
  * Comments: *How did you implement the task*
  * Task feedback: *Facultative, how did you find the task (difficulty, pertinence...)*
* **Comment creation and display**
  * Grade: *How many points you think you deserve*
  * Comments: *How did you implement the task*
  * Task feedback: *Facultative, how did you find the task (difficulty, pertinence...)*
* **Post modification and removal**
  * Grade: *How many points you think you deserve*
  * Comments: *How did you implement the task*
  * Task feedback: *Facultative, how did you find the task (difficulty, pertinence...)*
* **Search**
  * Grade: *How many points you think you deserve*
  * Comments: *How did you implement the task*
  * Task feedback: *Facultative, how did you find the task (difficulty, pertinence...)*
* **Use an external API**
  * Grade: *How many points you think you deserve*
  * Comments: *How did you implement the task*
  * Task feedback: *Facultative, how did you find the task (difficulty, pertinence...)*
* **Resource access control**
  * Grade: *How many points you think you deserve*
  * Comments: *How did you implement the task*
  * Task feedback: *Facultative, how did you find the task (difficulty, pertinence...)*
* **Account settings**
  * Grade: *How many points you think you deserve*
  * Comments: *How did you implement the task*
  * Task feedback: *Facultative, how did you find the task (difficulty, pertinence...)*
* **WYSIWYG integration**
  * Grade: *How many points you think you deserve*
  * Comments: *How did you implement the task*
  * Task feedback: *Facultative, how did you find the task (difficulty, pertinence...)*
* **Gravatar integration**
  * Grade: *How many points you think you deserve*
  * Comments: *How did you implement the task*
  * Task feedback: *Facultative, how did you find the task (difficulty, pertinence...)*
* **Light/dark mode**
  * Grade: *How many points you think you deserve*
  * Comments: *How did you implement the task*
  * Task feedback: *Facultative, how did you find the task (difficulty, pertinence...)*

### Bonus Tasks

* ***Task title 1***   
  * Grade: *How many points you think you deserve*
  * Comments: *How did you implement the task*
* ***Task title 2***   
  * Grade: *How many points you think you deserve*
  * Comments: *How did you implement the task*

## Miscellaneous

### Course Feedback

*Your feedback about the course, what you liked, what you disliked, what you missed...*

### Project Reuse

- [ ] We authorize the professors to use our project as an example for the next year students (facultative).