# electon-app-chat-on-socket.io
Socket training. Just a chat, with random nicknames. Posted on Heroku. Electron application is also made.

The socket-heroku folder contains a chat application that has been uploaded to Heroku. All the logic is there.
The simple-desktop-app-electronjs folder contains Electron.js for creating a desktop application.

<hr/>

## You can enter and see the work of the chat using the site: [**https://socket-chat-electron.herokuapp.com/**](https://socket-chat-electron.herokuapp.com/)

### You can also download this repository and follow the next steps to create an Electron application for your PC or Notebook:

#### 1) Go to the section: **/simple-desktop-app-electronjs**
<br />
1.1) Open **command line** or **terminal**
<br />
1.2) Enter: **npm install**
  
#### 2) When the necessary dependencies are downloaded, you can pack or make an application installation file for your platform
<br/>
2.1) Enter command: **npm run make** - for to attempt to automatically detect your platform and create an installation file.
<br/>
2.2) Enter command: **npm run package** - for to try to automatically detect your platform and create an immediately deployed package
of files in place with the application launch file
            
#### 3) To manually specify the platform and its architecture, you can use a command of the form: **--platform=platform --arch=arch**
<br/>
3.1) Example: With this code, we will pack an application for Linux with a 64-bit architecture: **npm run package --platform=linux --arch=x64**
<br/>
3.2) You can just specify the platform and that will be enough.
Example: **npm run package --platform=darwin** and such a code command will package applications for the Mac OS system
