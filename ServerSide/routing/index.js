const GoogleDriveUtil = require('../features/GoogleDrive/google_drive_uti');
const Readable = require('stream').Readable

module.exports =  (router) => {
  let googleDrive = new GoogleDriveUtil();


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

    googleDrive.makeCall(function(auth) {
      googleDrive.uploadFile(auth, fileMetadata, media);
    });

    return "";
  });

  router.post('/google_drive_upload', async function (ctx, next) {
    //console.log(ctx.request.body);
    const filename = "test_dataset";
    const mimeType = "application/json";
    const folder_id = "1FbWk3KGo2_BPcEV3EqdiV0jKct3ONnWy";

    var fileMetadata = {
      'name': filename,
      parents: [ folder_id ]
    };

    var s = new Readable
    s.push(JSON.stringify(ctx.request.body))    // the string you want
    s.push(null)      // indicates end-of-file basically - the end of the stream

    var media = {
      mimeType: mimeType,
      body: s
    };
    
    googleDrive.makeCall(function(auth) {
      googleDrive.uploadFile(auth, fileMetadata, media);
    });

    ctx.body = 'Redirecting to shopping cart';
  });
}
