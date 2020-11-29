This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Configure front end server (ubuntu)
```
sudo su
mkdir -p /opt/recipe-app/build
cp Build.zip /opt/recipe-app/build
cd /opt/recipe-app/build
apt install xsel
apt-get install unzip
unzip Build.zip

# node
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs

# serve
npm install -g serve

# start
cd /opt/recipe-app
serve -s build -l 443 & //redirect stdout and stderr to log?
```

### Configure backend server (ubuntu)
```
sudo apt install default-jdk
```

### Build
```
cd ~/dev/recipes-app
npm run build
rm Build.zip
PS C:\Users\josep\dev\recipe-app> $compress = @{
Path = "build\*"
CompressionLevel = "Fastest"
DestinationPath = ".\Build.zip"
}
PS C:\Users\josep\dev\recipe-app> Compress-Archive @compress
```

### Copy front end app to server
```
PS C:\Users\josep\dev\recipe-app> scp -i <pem-key-path> Build.zip ubuntu@<host>:/tmp/Build.zip

Build.zip                                                                                         100%  246KB 761.1KB/s   00:00
```

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
