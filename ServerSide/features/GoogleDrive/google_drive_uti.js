const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

module.exports = class GoogleDriveUtil {
    
    constructor() {
        this.SCOPES = ['https://www.googleapis.com/auth/drive'];
        this.TOKEN_PATH = 'data/token.json';

        // Load client secrets from a local file.
        fs.readFile('data/credentials.json', (err, content) => {
            if (err) return console.log('Error loading client secret file:', err);
            // Authorize a client with credentials, then call the Google Drive API.
            this.authorize(JSON.parse(content), (auth) => {
                //this.listFiles(auth);
            });
        });
    }

    makeCall(callback) {
        // Load client secrets from a local file.
        fs.readFile('data/credentials.json', (err, content) => {
            if (err) return console.log('Error loading client secret file:', err);
            // Authorize a client with credentials, then call the Google Drive API.
            this.authorize(JSON.parse(content), (auth) => {
                callback(auth);
            });
        });
    }
    
    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */
    authorize(credentials, callback) {
        const {client_secret, client_id, redirect_uris} = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);

        // Check if we have previously stored a token.
        fs.readFile(this.TOKEN_PATH, (err, token) => {
            if (err) return this.getAccessToken(oAuth2Client, callback);
            oAuth2Client.setCredentials(JSON.parse(token));
            callback(oAuth2Client);
        });
    }

    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback for the authorized client.
     */
    getAccessToken(oAuth2Client, callback) {
        const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: this.SCOPES,
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        });
        rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(this.TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) return console.error(err);
            console.log('Token stored to', this.TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
        });
    }

    /**
     * Lists the names and IDs of up to 10 files.
     * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
     */
    listFiles(auth) {
        const drive = google.drive({version: 'v3', auth});
        drive.files.list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name)',
        }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            const files = res.data.files;
            if (files.length) {
                console.log('Files:');
                files.map((file) => {
                console.log(`${file.name} (${file.id})`);
                });
            } else {
                console.log('No files found.');
            }
        }); 
    }

    /**
     * Upload file
     * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
     * @param {object} fileMetadata file name
     * @param {object} media mimeType
     * @param {string} folderId folder id
     */
    uploadFile(auth, fileMetadata, media) {
        const drive = google.drive({version: 'v3', auth});
        const self = this;

          drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id'
          }, function (err, file) {
            if (err) {
              // Handle error
              console.error(err);
            } else {
                console.log("File ID " + file.data.id);
                self.grantPermission(auth, file.data.id);
            }
          });
    }

    /**
     * Grant File Permission
     * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
     * @param {string} file_id file id
     * @param {function} permissionCallback The callback to call with the permission ID.
     */

    grantPermission(auth, file_id, permissionCallback) {
        const drive = google.drive({version: 'v3', auth});

        var permission = 
            {
              'type': 'anyone',
              'role': 'writer',
            };

          drive.permissions.create({
            resource: permission,
            fileId: file_id,
            fields: 'id',
          }, function (err, res) {
            if (err) {
              // Handle error...
              console.error(err);
              //permissionCallback(err);
            } else {
                console.log("Set Permission");
            }
          });
    }

}

