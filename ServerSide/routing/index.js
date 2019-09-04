const GoogleDriveUtil = require('../features/GoogleDrive/google_drive_uti');
const Readable = require('stream').Readable
const Utility = require("../features/Utility");
const fs = require('fs');

module.exports =  (router) => {
  let googleDrive = new GoogleDriveUtil();
  let utility = new Utility();

  router.get('/', async function (ctx, next) {
    ctx.state = {
      title: 'HSINPA'
    };

    await ctx.render('index', {title: ctx.state});
  });

  router.get('/ar_editor', async function (ctx, next) {
    await ctx.render('./editor_script/index');
  });

  router.get('/test_google_drive', async function (ctx, next) {

    const filename = "test_dataset";
    const path = "data/test_dataset.json";
    const mimeType = "application/json";
    const folder_id = "1FbWk3KGo2_BPcEV3EqdiV0jKct3ONnWy";

    var fileMetadata = {
      'name': filename,
      parents: [ folder_id ]
    };

    var media = {
      mimeType: mimeType,
      body: fs.createReadStream(path)
    };

    var auth = await googleDrive.makeCall();
    var fileID = await googleDrive.uploadFile(auth, fileMetadata, media);
    googleDrive.grantPermission(auth, fileID, function() {
      console.log("Permission Get");
    });

    return "";
  });

  router.post('/google_drive_upload', async function (ctx, next) {
    //console.log(ctx.request.body);

    
    var uuid = utility.GetUUID();

    const filename = uuid;
    const mimeType = "application/json";
    const folder_id = "1FbWk3KGo2_BPcEV3EqdiV0jKct3ONnWy";

    var fileMetadata = {
      'name': filename,
      parents: [ folder_id ]
    };

    var s = new Readable
    s.push(ctx.request.rawBody)    // the string you want
    s.push(null)      // indicates end-of-file basically - the end of the stream

    var media = {
      mimeType: mimeType,
      body: s
    };
    
    var auth = await googleDrive.makeCall();
    var fileID = await googleDrive.uploadFile(auth, fileMetadata, media);
    googleDrive.grantPermission(auth, fileID, function() {
      console.log("Permission Get");
    });

    ctx.body = fileID;
  });
}
