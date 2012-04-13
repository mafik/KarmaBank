KarmaBank
=========

KarmaBank is a service that stores karma points associated with users' emails.

It is fully transparent - by using SOAP & REST API anyone can:

 - check others karma
 - graph incoming & outgoing karma for any account
 - initiate karma transfers
 - generate karma QR cheques - for real-life karma exchange
 - generate karma transfer templates - for website buttons

Android App
-----------

*TODO: screenshots & description of android app (Paweł)*

### QR Cheques

*TODO: description of QR cheques (Paweł)*

Desktop App
-----------

*TODO: screenshots & description of desktop app (Łukasz)*

Web Browser
-----------

*TODO: screenshots & description of website (Marek)*

Architecture
------------

![Architecture](https://github.com/mafik/KarmaBank/raw/master/arch.png)

### Directory Structure

    /MySQL       - MySQL structure, data & scripts
	/WebService  - Java WebService implementatian
	/Android     - Android WebService client
	/Desktop     - Desktop Application
	/Node        - Website & REST API server

### SOAP API

Provided by Java WebService

*TODO: detailed api description (Łukasz)*

### REST API

Provided by Node

*TODO: detailed api description (Marek)*
