# DoL Extended Reminders

This Project provides an easy to use extension for Dol (Degrees of Lewdity) to show additional Daily and Weekly Reminders.

## How to Build

### Build

Building this extension can easily be done using npm. To do that, run the following npm commands:

- Install all dependencies (only has to be done once).
  ```
  npm install
  ```

- Build the Typescript project
  ```
  npm run build
  ```

- Prepare all files for distribution
  ```
  npm run dist
  ```

### Clean

To clean up the project for a clean build, run the following:
  ```
  npm run clean
  ```

### Integrate

Some integrate scripts have been set up. They are written for Windows and require additional tools

For the HTML integration the following applications are also required:
- 7z

For the Android integration the following applications are also required:
- apktool
- keytool
- zipalign
- apksigner

Make sure their executables are in the `path`-environment variable.

To make use of them, the following manual steps are required:

- create the following folder structure:
  <div style="line-height: 0">
  <code>
  dolExtendedReminders<br>
  │ &nbsp;&nbsp;README.md<br>
  │ &nbsp;&nbsp;package.json<br>
  │ &nbsp;&nbsp;etc...<br>
  │ &nbsp;&nbsp;<br>
  └── <span style="color:green"> integrate </span><br>
  &nbsp;&nbsp;&nbsp;&nbsp;├── <span style="color:green"> android </span> <br>
  &nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;<i>set up android integration</i> <br>
  &nbsp;&nbsp;&nbsp;&nbsp;└── <span style="color:green"> html </span> <br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>set up html integration</i>
  </code>
  </div>
#### Android Integration
> **NOTE** due to apktool being weird, locate the `apktool.bat` file and append the following at the end:
  >```
  >exit
  >```

- in the android folder, copy the apk of the game version that should be integrated
- rename the apk to `Degrees_of_Lewdity.apk`
- create a keystore for signing the apk
  - use the existing npm script:
  ```
  npm run integrate:android:keytool
  ```
  - set the password to `dolExtendedReminders`
  - fill in the required details

Android Integration is now set up. To start the integration use the following command:
```
npm run integrate:android
```

#### HTML Integration
- in the html folder, extract the game version that should be integrated
- rename the folder from `Degrees of Lewdity` to `Degrees_of_Lewdity` (i.e. add underscores instead of spaces)
- go into the folder and rename the `.html` file to `Degrees of Lewdity.html` (i.e. remove the version)
- go back to the html folder and add the `Degrees_of_Lewdity` folder to a zip Archive named `Degrees_of_Lewdity.zip`

HTML Integration is now set up. To start the integration use the following command:
```
npm run integrate:html
```

This command will extract the zip archive and copy the contents of the dist folder into the extracted game folder.

## Installation

### Install as the only extension of this type

To use this extension, follow these steps to add it to a clean DoL game. Clean in this case means, no other extensions with this framework are used.

- Copy the contents of the [dist folder](./dist/) to the DoL folder

- Edit the `index.html` file using any text editor
  - Find the `iframe`-element with the id `dolEmbedded`
  - Edit the `src`-attribute to point the the original game file (usually only the version needs to be adjusted)
  - Save the file

### Install as additional extension

If the game already has an extension with this framework, installation of this extension becomes a little bit harder.

- Copy the [dolExtendedReminders](/dist/dolExtendedReminders/) and [dolExtendedRemindersStyle](/dist/dolExtendedRemindersStyle/) folders to the DoL folder.

- The [index.html](/dist/index.html), [index.css](/dist/index.css) and [package.json](/dist/package.json) files should already be in the modified game folder.
  - if not: copy the missing files as well, though it is more likely that the game does not have an extension of this framework.
  - if the [index.html](/dist/index.html) was missing, it definitely did not have an extension of this framework. After copying all files, the extension is now fully installed. (See [here](#install-as-the-only-extension-of-this-type))

- Edit the `index.html` file using any text editor
  - In the `<body>`-section of the html file, add the following line:
  ```html
  <script src="/dolExtendedReminders/index.js" async defer></script>
  ```
  - Save the file

## How to Use

To use the extension, follow the steps described in the [Installation](#installation) section.

### Launching the Extension

To start the game with the extension, open the `index.html` in the browser / webview of choice.

> **NOTE**: Most browsers block Cors between files, so using webviews like `nw.js` with the option `"chromium-args": "--allow-file-access-from-files"` is highly recommended.

### Using the Extension

> **TODO**

## Extension Framework

This extension wraps the base game with an `iframe`-element. The framework aims to allow multiple extensions like this one to work simultaneously.

An extension should load all its content using a single script. This allows easy management of extensions and helps mitigating collisions. An example of what adding a script should look like is here:
```html
<script src="/dolExtendedReminders/index.js" async defer></script>
```

- **DOM-Elements**:<br>
DOM-Elements should be prefixed with a somewhat unique identifier. This could be the extensions name or the name of the creator. Using a random string of characters is also a valid choice.
- **Adding CSS**:<br>
CSS files should be loaded dynamically from the init script by creating a `link`-element using the DOM and setting the href attribute to the file location. The element should be added as a child of the documents head.
- **Adding JS**:<br>
If the extension should makes use of several Javascript files, they can be added using the init script. They can be linked using a `script`-element created using the DOM and added as a child of the documents head.
- **Adding HTML**:<br>
HTML elements can be added using either of the following methods:
  - Creating an `iframe`-element using the DOM and linking the HTML file.
  - Creating the HTML elements directly in the DOM using Javascript.

