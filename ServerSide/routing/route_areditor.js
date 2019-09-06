const GoogleDriveUtil = require('../features/GoogleDrive/google_drive_uti');
const Utility = require("../features/Utility");
const fs = require('fs');

const { KVdb } = require('kvdb.io')
 
 

module.exports =  (router) => {
    let googleDrive = new GoogleDriveUtil();
    let utility = new Utility();
    const folder_id = "1FbWk3KGo2_BPcEV3EqdiV0jKct3ONnWy";
    const bucket = KVdb.bucket('LgW7AmCUa7Jg5ijKsWCBAb') // access token arg optional

    //Landing page
    router.get('/ar_editor', async function (ctx, next) {
        await ctx.render('./editor_script/index');
    });

    //Test upload purpose
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

    router.get('/get_arpatt_id/:_id', async function (ctx, next) {
        let patt_id = await bucket.get(ctx.params._id);
        ctx.body = patt_id;
    });

    router.post('/gd_data_upload', async function (ctx, next) {
        var uuid = utility.GetUUID();

        const filename = uuid;
        const mimeType = "application/json";
        
        let fileMediaData = googleDrive.getFileMedaData(filename, folder_id);
        let media = googleDrive.getMedia(mimeType, ctx.request.rawBody);
        
        var fileID = await googleDrive.uploadAndGrandPermission(fileMediaData, media);

        ctx.body = fileID;
    });

    router.post('/gd_armarker_upload', async function (ctx, next) {
        var uuid = utility.GetUUID();

        const filename = uuid+".patt";
        const mimeType = "text/plain";
        
        console.log(ctx.request.body);
        let arDataID = ctx.request.body._id;
        let pattData = ctx.request.body.data;

        let fileMediaData = googleDrive.getFileMedaData(filename, folder_id);
        let media = googleDrive.getMedia(mimeType, pattData);
        
        var fileID = await googleDrive.uploadAndGrandPermission(fileMediaData, media);
        await bucket.set(arDataID, fileID);

        ctx.body = fileID;
    });

};