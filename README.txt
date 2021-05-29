THIS IS AN OLD VERSION OF MY BOT THERE'S BUGS WHICH ARE FIXED IN THE PRIVATE VERSION, I'AM NOT GOING TO UPDATE THIS, THIS IS ONLY FOR EDUCATIONAL PURPOSE

THIS WAS MADE BY PICwarior381#2018

HOW TO SET UP THE BOT:

Install NodeJS (https://nodejs.org/en/)

Command to use:
npm i (Should normally get everything if not then read the errors)
npm i get-hrefs
npm i faker
npm i playwright-firefox

Make sure to put the MongoPath (see below)
Also make sure to put your Bot Token on the config.js
Put your proxy

Now Start the Bot with this command: Node .
If someone needs to use his own proxy he sure can by executing those command on discord: 
(THOSE ARE JUST AN EXAMPLE, YOU HAVE TO REPLACE THEM WITH THEIR PROXY INFORMATION)
!setproxy 127.0.0.1 
!setport 80 
!setusername ProxyUsername 
!setPassword ProxyPassword 
!setproxyAPI https://www.TheApiToRotateTheProxy.com

By puting his own proxy he can use the command: !generate 1

If they want to use YOUR proxy they can use this command: !proxyless 1


HOW TO SET UP YOUR MONGODB
----------------------------------
Go to https://www.mongodb.com/ and create your account
You should see something like this: https://imgur.com/a/GmS3bj8
Most of those aren't important, just click on "Javascript" and then "Continue" on the bottom right-hand corner of the screen
Click on the free cluster option and you should see something like this: https://imgur.com/a/lVUkFVf
You can select whichever cloud provider and region so long as it's closest to your current location, after that click 'Create Cluster' and wait for the website to create your cluster

Click on "CONNECT" under your cluster: https://imgur.com/a/hRqYTf2 and this should prompt: https://imgur.com/a/tUJXFPR
Click on "Add your Current IP Address" and create your database user, remember the Password you're typing because you will need that later on
After that, click on "Choose a connection method" on the bottom right hand corner of the prompt, and click on "Connect your application": https://imgur.com/a/fwEhFyp
Copy the link from the next page and paste that in the quotations beside "mongoPath"
Replace the entire <password> from the link you just pasted in "mongoPath" with the password that you're supposed to remember.
