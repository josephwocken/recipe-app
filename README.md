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
rm Build.zip
npm run build
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


Errors:
DraftEditorContents-core.react.js:119 Uncaught (in promise) TypeError: Cannot read property 'getCurrentContent' of null
    at r.a.render (DraftEditorContents-core.react.js:119)
    at Fa (react-dom.production.min.js:182)
    at Ka (react-dom.production.min.js:181)
    at vu (react-dom.production.min.js:263)
    at sl (react-dom.production.min.js:246)
    at ul (react-dom.production.min.js:246)
    at Zu (react-dom.production.min.js:239)
    at react-dom.production.min.js:123
    at t.unstable_runWithPriority (scheduler.production.min.js:19)
    at Ui (react-dom.production.min.js:122)


    _proto.render = function render() {
      var _this$props = this.props,
          blockRenderMap = _this$props.blockRenderMap,
          blockRendererFn = _this$props.blockRendererFn,
          blockStyleFn = _this$props.blockStyleFn,
          customStyleMap = _this$props.customStyleMap,
          customStyleFn = _this$props.customStyleFn,
          editorState = _this$props.editorState,
          editorKey = _this$props.editorKey,
          preventScroll = _this$props.preventScroll,
          textDirectionality = _this$props.textDirectionality;
      var content = editorState.getCurrentContent();
      var selection = editorState.getSelection();
      var forceSelection = editorState.mustForceSelection();
