# grunt-facebook-app

> Create a Facebook App scaffold with [grunt-init][].

[grunt-init]: http://gruntjs.com/project-scaffolding

## Installation
If you haven't already done so, please install [grunt-init][].

Once grunt-init is installed, place this template in your `~/.grunt-init/` directory. It's recommended that you use git to clone this template into that directory, as follows:

### Linux/Mac Users

```
git clone git@github.com:jepser/grunt-facebook-app.git ~/.grunt-init/facebook-app
```

### Windows Users

```
git clone git@github.com:jepser/grunt-facebook-app.git %USERPROFILE%/.grunt-init/facebook-app
```

## Usage

At the command-line, cd into an empty directory, run this command and follow the prompts.

```
grunt-init facebook-app
```

_Note that this template will generate files in the current directory, so be sure to change to a new directory first if you don't want to overwrite existing files._

Install the NPM modules required to actually process your newly-created project by running:

```
npm install
```

## Scaffold

After running the init command above, you will be presented with a standard directory structure similar to:

    /src
    .. /styles
    .. 
    .. /scripts
    .. /images
    .. /includes
    .. /services
    .. /partials
    .. .gitignore
    .. Gruntfile.js
    .. index.html


## Release History

 * 2014-07-25   v0.1.4   Nadd.co changes for your propouses
 * 2013-07-18   v0.1.3   Better grunt module inclusion (props @aaronjorbin)
 * 2013-05-31   v0.1.2   Fix a template renaming bug.
 * 2013-04-29   v0.1.1   Update directory structure and minified file names. Fix some naming mismatches.
 * 2013-04-26   v0.1.0   Initial public release
