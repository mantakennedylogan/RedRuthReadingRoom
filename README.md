# Overview

## About

The Redruth Reading Room serves as a platform for administrators to generate audio collections aimed at collecting oral testimonies from specific participants. Admin users have the capability to oversee and handle audio submissions, while participants can record and upload their audio responses

## Current Functionality
* Admin users can login
     - Email: test@gmail.com
     - Password: @Test123
* Home page has introductory content
* Record page
      - Displays error when invalid prompt url is given
       - If given valid prompt url, prompt and discription appears along with a place to record and submit the audio recording
* Research Tab
     - Home: All current collections appear with accurate collection information
     - Inbox: all submitted audios appear. Audio playback currently unavailable, but response display is visible and accurate.
     - Edit & Publish: To be implemented 


#  Redruth Reading Room Application - React Client (redruthforged-master)
This is what the user sees!

* How do I get set up?
  - Install node

  - Clone this repository

* To install the necessary packages run

  - make install

* To run the application for development purposes run 'make'

  - This will start the application on 127.0.0.1:3000


# Redruth Reading Room Application - Server (redruthforged-server-master)
handles database reads/writes

* How do I get set up?
  - Install node

  - Clone this repository

  - Navigate to the directory
    
  - Install necessary packages by running 'make install'

  - To run the application for development purposes run 'make'


    - This will start the application on 127.0.0.1:8000



# Testing suite (TestFolder)
* To test Gurkins 

  - Download project
  
  - Go to hellocucumber
  
  - Run mvn test
  
  
  <strong>Note</strong>: This will not build due to the fact that there is no classes defined currently.
  <br></br>
* To test Unit Tests

  - In project root dirictory
  
  - Run ./node_modules/mocha/bin/mocha.js
  
  
