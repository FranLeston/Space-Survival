# Space-Survival
Asteroids-like game for Ironhack

Originally I wanted to create a game like Thrust for the Atari but a few days in I was having trouble putting into code what I was envisioning.  After I created my ship and worked on the physics I decided to make the game behave more like "Asteroids".  Getting the ship to move around was not as easy as I had hoped.  I relied on rotating the whole canvas element in order to turn the ship, which made for some headaches going forward.  This is my first project in JavaScript, I am very happy with the result.  Some of the things that I plan on working are better object collision methods and updating the  High Scores screen with nicer UI.  Also, I need to work on developing a better levels implementation for the game and having a better game logic. The volume of the different music and sounds need to be adjusted, as well. 

Mostly, every object in the game has its own model file and I worked a lot with prototypes and Constructor functions.  

This was a good learning experience.  Towards the end of the project I felt more comfortable with the code and implementing my thoughts into code. I was finally having some fun making the game behave the way I wanted it too.

Gameplay Controls:
Shoot:  SPACEBAR
Thrust forward:  UP ARROW
Turn:  LEFT OR RIGHT ARROWS

You cannot go backwards, You need to tun the space ship around.  

Levels:

Level increments occur every time you destroy.   20 Asteroids or Enemy Spaceship.  If in Level 2, then 2 new Asteroids will created off camera.  If in Level 3, then 3 new ones, and so forth.  


