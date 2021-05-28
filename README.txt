HOW TO SET UP YOUR MONGODB WEBSITE
----------------------------------
This only matters if your bot requires a database, you can check if it needs one by seeing if "mongoPath" exists in your config.js
If it doesn't, you can ignore this entire section and head on straight to "STARTING YOUR BOT"
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