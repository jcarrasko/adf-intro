This is an example for setting up a simple application using Alfresco Development Framework (ADF).

# Use Case:

A simple app built on ADF that combines workflows and content.

The workflow built on the top of Alfresco Process Services will do the steps below:

1.	Order form
2.	Generate an order form document
3.	Store in Alfresco Content Services

The app will have:

1.	Customized login screen
2.	Order Form
3.	Order Library

# Prerequisites:

It’s needed to have installed the software below:

+ ACS 5.2
+ APS 1.7
+ Node.js 8.9.3
+ NPM
+ Angular Cli 1.6.1

It’s needed also to install the Yeoman Generator and the alfresco-adf-app generator:

```
npm install -g yo
npm install -g generator-alfresco-adf-app
yo alfresco-adf-app
```

# Installation:

1.	Install the veggy model in ACS using the model manager. You will find the model under content-services/veggy.zip
2.	Install the veggy app using the app import in quick start in APS. You will find the app under process-services/veggy-app.zip
3.  Edit proxy.conf.json and setup the server locations
