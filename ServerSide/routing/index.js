const GoogleDriveUtil = require('../features/GoogleDrive/google_drive_uti');

module.exports =  (router) => {
  router.get('/', async function (ctx, next) {
    ctx.state = {
      title: 'HSINPA'
    };

    await ctx.render('index', {title: ctx.state});
  });


  router.get('/test_google_drive', async function (ctx, next) {
    let googleDrive = new GoogleDriveUtil();

    const filename = "test_dataset";
    const path = "data/test_dataset.json";
    const mimeType = "application/json";
    const folder_id = "1FbWk3KGo2_BPcEV3EqdiV0jKct3ONnWy";

    googleDrive.makeCall(function(auth) {
      googleDrive.uploadFile(auth, path, filename, mimeType, folder_id);
    });

    return "";
  });

}
