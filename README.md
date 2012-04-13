KarmaBank
=========

KarmaBank is a service that stores karma points associated with users' emails.

It is fully transparent - by using SOAP & REST API anyone can:

 - check others karma
 - graph incoming & outgoing karma for any account
 - initiate karma transfers
 - generate karma QR cheques - for real-life karma exchange
 - generate karma transfer templates - for website buttons

Android App (@mpawel)
-----------

*TODO: screenshots & description of android app*

### QR Cheques

*TODO: description of QR cheques*

Desktop App (Łukasz)
-----------

*TODO: screenshots & description of desktop app*

Web App (@mafik)
-------

*TODO: screenshots & description of website*

Architecture
------------

![Architecture](https://github.com/mafik/KarmaBank/raw/master/arch.png)

### Directory Structure

    /MySQL       - MySQL structure, data & scripts
	/WebService  - Java WebService implementatian
	/Android     - Android WebService client
	/Desktop     - Desktop Application
	/Node        - Website & REST API server

### SOAP API (Łukasz)

Provided by Java WebService

*TODO: detailed api description*

### REST API (@mafik)
	
*TODO: detailed api description*

#### Server

Setup:

    cd Node && npm install
	
Running (inside `/Node`):

    node app.js
