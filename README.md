
# Blogging application - ECE Webtech project

Welcome to our Movie Rating Website project! This application is designed to allow users to discover, rate, and discuss their favorite movies using Next.js as a React framework, tailwind CSS and Supabase as our database. With user authentication, content management, and community interaction features, we've created a platform where movie enthusiasts can come together to share their thoughts and recommendations.

### Introduction

Our Movie Rating Website offers a comprehensive platform for movie lovers. Whether you're looking for the latest blockbuster, a classic gem, or a hidden indie gem, our platform provides you with a space to explore, rate, and review movies. You can connect with other users, engage in discussions through film rating and commenting, and stay updated on the latest film releases, with a possibility to add films and series to a watchlist to remember on your next movie night.

!! You will see on the commit history that Ikram did not commited anything for this project, it is however normal. Her PC died and with it her access to the Github repository from her computer. She wasn't able to get it fix before the end of the project. However, she did send us lots of code on another pc ( no github access without her ID keys) related to the css optimization and changes and css related features Gravatar/Light and dark mode and home page display between others. It was a bit more tricky to work like this but we figured it out, and wanted to make sure that her work would be properly considered and not overlooked because of the commit issue. !!

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
  * Grade: *4/4*
  * Comments: *Provide a login/logout button in the header. On login, open the login page with a signin/signup form with GitHub provider using Auth component of Supabase. Persist authenticated user information in React context and display it on the profile page and the header.*
* **Post creation and display**
  * Grade: *6/6*
  * Comments: *Every authenticated user can post on the website, edit it's post and remove them, every post persist en the database after deconnection, the user can see all it's post and the post are also displayed when the movie posted on is searched with all post of other users related*
  * Task feedback: *Lot's of query and database handling, especially hard for vercel deployment to fix all the little issues*
* **Comment creation and display**
  * Grade: *4/4*
  * Comments: *The user can make a comment/request to the website using it's email adress first name and last name and is then accessible as all your other comments for you and the admin on your profile*
  * Task feedback: *We started by this contacts form to use db so it was a great task to train on how to use databse and databse oauth and RLS*
* **Post modification and removal**
  * Grade: *4/4*
  * Comments: *Every authenticated user can remove or edit each of it's rating and comments post on each film in it's reviews section and it will be applied to the database and therefore be persistent*
  * Task feedback: *Using supabase db to train to delete, edit, ... and make those types of queries was great.*
* **Search**
  * Grade: *6/6*
  * Comments: *We incorporated a search engige through a movie database on the server side using an external API as movie database, working with an environnement key*
  * Task feedback: *Once you get the way this API work and what it precisly return to the server it was pretty easy to implement the search*
* **Use an external API**
  * Grade: *2/2*
  * Comments: *We use OMDB API to manage our film database and have all the information updated*
  * Task feedback: *Easy access and implementation*
* **Resource access control**
  * Grade: *6/6*
  * Comments: *Every table and interraction between tbale and the website is secured with RLS. IN fact, we configured all the requirements for the three databases we are using.For example, only an authenticated user can write reviews under movies. If not, there is an appropriate HTTP response code and message*     
  * Task feedback: *Fpretty hard to handle and to understand at first, because it caused a lot of troubles and bugs. But when we know how to use it, it is very helpful and facilitate the code because.*
* **Account settings**
  * Grade: *3/4*     
  * Comments: *At first, nobody is logged in? If a user logs in using github or his email address (oauth), a user is created in the authentication table in supabase. Once he is logged, you can see his profile infos (email, phone number, ...)or an other page with his reviews that he can manages. He can log out from his profile infos page and see all the comments from the contact us page he has done. However, the button delete account is not working because we did not manage to configure properly the deletion of a user from the authenticate table in supabase.*
  * Task feedback: *great to handle but the concept of oauth and the authenticate table in supabase is really hard to understand and handle. For example, to understand the concept of twilio token for phone number is not usual and evident. But really instructive ! We really learnt a lot from there.*
* **WYSIWYG integration**
  * Grade: *2/2*
  * Comments: *The user see how he will impact the page in real time and when applied it instantly appear at the place the user saw it ( for the posts and ratings)*
* **Gravatar integration**
  * Grade: *2/2*
  * Comments: *Gravatar is linked with the email adress of connection ( does not show when not connected), if the person has an existing account it displays it on the top right corner and if not, it displays a random one*
* **Light/dark mode**
  * Grade: *1/2*
  * Comments: *Ligh and dark mode only on the header part and not the whole site*
  * Task feedback: *tried to do this last task but failed to generalize it to the global css*

### Bonus Tasks

* ***Admin dashboard***   
  * Comments: *Complete admin dashboard, the admin can access all the contact comments from all the people where an authenticated user can only see his comments done in the contact form. He can also remove every post under any film when connected with it's admin account, in his reviews page in his profile.*
* ***Watchlist for users***   
  * Comments: *We implementde a watchlist for all user to make sure to remember the film they want to see or rate that is only accessible by them and can be modified as wished. It means that there is another db that uses the id of films and email of users. If a user likes a movie after searching for it or clicking it from the home page, he can clicks on a button that will add to his watchlist (controlled by RLS to not put twice the same film for a unique user.). This my watchlist button in the header only display when a user is connected.*

## Miscellaneous

### Course Feedback

*About this class, we loved the teamworking environnement, the way that the labs were evaluated every week. It allowed us to be guided more easily by asking us rigor, granting us a regular and linear progression. However one negative point would be that the vercel deployment wasn't explained enough wich made it hard to really understand what were the problems when there was some. It was also really interresting to learn and discorver lots of languages and modules that we could use for web developpement.*

### Project Reuse

- [x] We authorize the professors to use our project as an example for the next year students (facultative).