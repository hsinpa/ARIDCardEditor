/**
 * @author mrdoob / http://mrdoob.com/
 */

Menubar.File = function ( editor ) {

	var NUMBER_PRECISION = 6;

	function parseNumber( key, value ) {

		return typeof value === 'number' ? parseFloat( value.toFixed( NUMBER_PRECISION ) ) : value;

	}

	//

	var config = editor.config;
	var strings = editor.strings;

	var container = new UI.Panel();
	container.setClass( 'menu' );

	var title = new UI.Panel();
	title.setClass( 'title' );
	title.setTextContent( strings.getKey( 'menubar/file' ) );
	container.add( title );

	var options = new UI.Panel();
	options.setClass( 'options' );
	container.add( options );

	// New

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/file/new' ) );
	option.onClick( function () {

		if ( confirm( 'Any unsaved data will be lost. Are you sure?' ) ) {

			editor.clear();

		}

	} );
	options.add( option );

	//

	options.add( new UI.HorizontalRule() );

	// Import

	var form = document.createElement( 'form' );
	form.style.display = 'none';
	document.body.appendChild( form );

	var fileInput = document.createElement( 'input' );
	fileInput.multiple = true;
	fileInput.type = 'file';
	fileInput.addEventListener( 'change', function ( event ) {

		editor.loader.loadFiles( fileInput.files );
		form.reset();

	} );
	form.appendChild( fileInput );

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/file/import' ) );
	option.onClick( function () {

		fileInput.click();

	} );
	options.add( option );

	//

	// options.add( new UI.HorizontalRule() );

	// // Export Geometry

	// var option = new UI.Row();
	// option.setClass( 'option' );
	// option.setTextContent( strings.getKey( 'menubar/file/export/geometry' ) );
	// option.onClick( function () {

	// 	var object = editor.selected;

	// 	if ( object === null ) {

	// 		alert( 'No object selected.' );
	// 		return;

	// 	}

	// 	var geometry = object.geometry;

	// 	if ( geometry === undefined ) {

	// 		alert( 'The selected object doesn\'t have geometry.' );
	// 		return;

	// 	}

	// 	var output = geometry.toJSON();

	// 	try {

	// 		output = JSON.stringify( output, parseNumber, '\t' );
	// 		output = output.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );

	// 	} catch ( e ) {

	// 		output = JSON.stringify( output );

	// 	}

	// 	saveString( output, 'geometry.json' );

	// } );
	// options.add( option );

	// // Export Object

	// var option = new UI.Row();
	// option.setClass( 'option' );
	// option.setTextContent( strings.getKey( 'menubar/file/export/object' ) );
	// option.onClick( function () {

	// 	var object = editor.selected;

	// 	if ( object === null ) {

	// 		alert( 'No object selected' );
	// 		return;

	// 	}

	// 	var output = object.toJSON();

	// 	try {

	// 		output = JSON.stringify( output, parseNumber, '\t' );
	// 		output = output.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );

	// 	} catch ( e ) {

	// 		output = JSON.stringify( output );

	// 	}

	// 	saveString( output, 'model.json' );

	// } );
	// options.add( option );

	// // Export Scene

	// var option = new UI.Row();
	// option.setClass( 'option' );
	// option.setTextContent( strings.getKey( 'menubar/file/export/scene' ) );
	// option.onClick( function () {

	// 	var output = editor.scene.toJSON();

	// 	try {

	// 		output = JSON.stringify( output, parseNumber, '\t' );
	// 		output = output.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );

	// 	} catch ( e ) {

	// 		output = JSON.stringify( output );

	// 	}

	// 	saveString( output, 'scene.json' );

	// } );
	// options.add( option );

	// //

	// options.add( new UI.HorizontalRule() );

	// // Export DAE

	// var option = new UI.Row();
	// option.setClass( 'option' );
	// option.setTextContent( strings.getKey( 'menubar/file/export/dae' ) );
	// option.onClick( function () {

	// 	var exporter = new THREE.ColladaExporter();

	// 	exporter.parse( editor.scene, function ( result ) {

	// 		saveString( result.data, 'scene.dae' );

	// 	} );

	// } );
	// options.add( option );

	// // Export GLB

	// var option = new UI.Row();
	// option.setClass( 'option' );
	// option.setTextContent( strings.getKey( 'menubar/file/export/glb' ) );
	// option.onClick( function () {

	// 	var exporter = new THREE.GLTFExporter();

	// 	exporter.parse( editor.scene, function ( result ) {

	// 		saveArrayBuffer( result, 'scene.glb' );

	// 		// forceIndices: true, forcePowerOfTwoTextures: true
	// 		// to allow compatibility with facebook
	// 	}, { binary: true, forceIndices: true, forcePowerOfTwoTextures: true } );

	// } );
	// options.add( option );

	// // Export GLTF

	// var option = new UI.Row();
	// option.setClass( 'option' );
	// option.setTextContent( strings.getKey( 'menubar/file/export/gltf' ) );
	// option.onClick( function () {

	// 	var exporter = new THREE.GLTFExporter();

	// 	exporter.parse( editor.scene, function ( result ) {

	// 		saveString( JSON.stringify( result, null, 2 ), 'scene.gltf' );

	// 	} );


	// } );
	// options.add( option );

	// // Export OBJ

	// var option = new UI.Row();
	// option.setClass( 'option' );
	// option.setTextContent( strings.getKey( 'menubar/file/export/obj' ) );
	// option.onClick( function () {

	// 	var object = editor.selected;

	// 	if ( object === null ) {

	// 		alert( 'No object selected.' );
	// 		return;

	// 	}

	// 	var exporter = new THREE.OBJExporter();

	// 	saveString( exporter.parse( object ), 'model.obj' );

	// } );
	// options.add( option );

	// // Export STL (ASCII)

	// var option = new UI.Row();
	// option.setClass( 'option' );
	// option.setTextContent( strings.getKey( 'menubar/file/export/stl' ) );
	// option.onClick( function () {

	// 	var exporter = new THREE.STLExporter();

	// 	saveString( exporter.parse( editor.scene ), 'model.stl' );

	// } );
	// options.add( option );

	// // Export STL (Binary)

	// var option = new UI.Row();
	// option.setClass( 'option' );
	// option.setTextContent( strings.getKey( 'menubar/file/export/stl_binary' ) );
	// option.onClick( function () {

	// 	var exporter = new THREE.STLExporter();

	// 	saveArrayBuffer( exporter.parse( editor.scene, { binary: true } ), 'model-binary.stl' );

	// } );
	// options.add( option );

	//

	options.add( new UI.HorizontalRule() );
	//Publish
	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/file/publish' ) );

	option.onClick( function () {
		var output = editor.toJSON();
		output.metadata.type = 'App';
		delete output.history;
		// console.log(document.querySelector("#center_modal .content"));
		var centerModalDom = $("#qrcode_modal");
		var QRCanvas = document.getElementById('qr_canvas');
		QRCanvas.width  = 1024;
		QRCanvas.height = 1024;
		QRCanvas.style.width  = '512px';
		QRCanvas.style.height = '512px';
		
		generateQrCodeImage();
		output = JSON.stringify( output );
		var uploadURL = "/gd_data_upload";
		$.post( uploadURL, output)
		.done(function( file_id ) {
			var ar_live_url = ("https://hsinpa.github.io/ARIDCardEditor/index_ar.html?id=" + file_id);
			console.log(ar_live_url);

			generateArCodeCanvas(QRCanvas, ar_live_url, function() {
				centerModalDom.css("visibility", "visible");
			});

			//Clear whats inside
			// $("#center_modal .content").html("");

			// var qrcode = new QRCode(document.querySelector("#center_modal .content"), {
			// 	text: ar_live_url,
			// 	width: 256,
			// 	height: 256,
			// 	colorDark : "#000000",
			// 	colorLight : "#ffffff",
			// 	//correctLevel : QRCode.CorrectLevel.H
			// });

			// $("#center_modal .content").find('img').on('load', function() {
			// 	var patternRatio = 0.8;
			// 	var imageSize = 256;
			// 	var borderColor = "black";
			// 	var imageSelf = this;
			// 	// THREEx.ArPatternFile.buildFullMarker(imageSelf.src, patternRatio, imageSize, borderColor, function onComplete(markerUrl){	
			// 	// 	$("#center_modal .content").html("");
			// 	// 	var fullMarkerImage = document.createElement('img');					
			// 	// 		fullMarkerImage.src = markerUrl;

			// 	// 		THREEx.ArPatternFile.encodeImageURL(imageSelf.src, function onComplete(patternFileString) {
			// 	// 			$.post( '/gd_armarker_upload', {"_id" : file_id, "data" : patternFileString})
			// 	// 			.done(function() {
			// 	// 				$("#center_modal .content").append(fullMarkerImage);
			// 	// 			});
			// 	// 		});				
			// 	// });
		
			// });
			
		});
	});
	options.add( option );

	// Export

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( 'Export' );
	option.onClick( function () {

		var zip = new JSZip();

		//

		var output = editor.toJSON();
		output.metadata.type = 'App';
		delete output.history;

		var vr = output.project.vr;
		output = JSON.stringify( output );

		zip.file( 'app.json', output );

		//

		var title = config.getKey( 'project/title' );

		var manager = new THREE.LoadingManager( function () {

			save( zip.generate( { type: 'blob' } ), ( title !== '' ? title : 'untitled' ) + '.zip' );

		} );

		var loader = new THREE.FileLoader( manager );
		loader.load( 'js/libs/app/index.html', function ( content ) {

			content = content.replace( '<!-- title -->', title );

			var includes = [];

			if ( vr ) {

				includes.push( '<script src="js/WebVR.js"></script>' );

			}

			content = content.replace( '<!-- includes -->', includes.join( '\n\t\t' ) );

			var editButton = '';

			if ( config.getKey( 'project/editable' ) ) {

				editButton = [
					'',
					'			var button = document.createElement( \'a\' );',
					'			button.href = \'https://threejs.org/editor/#file=\' + location.href.split( \'/\' ).slice( 0, - 1 ).join( \'/\' ) + \'/app.json\';',
					'			button.style.cssText = \'position: absolute; bottom: 20px; right: 20px; padding: 12px 14px; color: #fff; border: 1px solid #fff; border-radius: 4px; text-decoration: none;\';',
					'			button.target = \'_blank\';',
					'			button.textContent = \'EDIT\';',
					'			document.body.appendChild( button );',
					''
				].join( '\n' );
			}

			content = content.replace( '\n\t\t\t/* edit button */\n', editButton );

			zip.file( 'index.html', content );

		} );
		loader.load( 'js/libs/app.js', function ( content ) {

			zip.file( 'js/app.js', content );

		} );
		loader.load( '../build/three.min.js', function ( content ) {

			zip.file( 'js/three.min.js', content );

		} );

		if ( vr ) {

			loader.load( '../examples/js/vr/WebVR.js', function ( content ) {

				zip.file( 'js/WebVR.js', content );

			} );

		}

	} );
	options.add( option );

	//

	var link = document.createElement( 'a' );
	function save( blob, filename ) {

		link.href = URL.createObjectURL( blob );
		link.download = filename || 'data.json';
		link.dispatchEvent( new MouseEvent( 'click' ) );

		// URL.revokeObjectURL( url ); breaks Firefox...

	}

	function saveArrayBuffer( buffer, filename ) {

		save( new Blob( [ buffer ], { type: 'application/octet-stream' } ), filename );

	}

	function saveString( text, filename ) {

		save( new Blob( [ text ], { type: 'text/plain' } ), filename );

	}

//////////////////////////////////////////////////////////////////////////////
//                Code Separator
//////////////////////////////////////////////////////////////////////////////

	var hiroImage = new Image;
	hiroImage.src = './images/hiro_patt.jpg';

	/**
	 * Generate AR-Code
	 */
	function generateArCodeCanvas(canvas, text, onLoad){
		var context = canvas.getContext('2d')
		
		context.drawImage(hiroImage, 0, 0, canvas.width, canvas.height);

		generateQrCodeImage(text, function onLoaded(qrCodeImage){
				console.log('qrcode generated')
				context.drawImage(qrCodeImage,canvas.width*0.50,canvas.height*0.30,canvas.width*0.20, canvas.height*0.20);      
				
				onLoad && onLoad()          
		})
	}

	/**
	* Generate AR-Code
	*/
	function generateQrCodeImage(text, onLoaded){
		var container = document.createElement('div')

		var qrcode = new QRCode(container, {
				text: text,
				width: 256,
				height: 256,
				colorDark : '#000000',
				colorLight : '#ffffff',
				correctLevel : QRCode.CorrectLevel.H
		});

		var qrCodeImage = container.querySelector('img')
		qrCodeImage.addEventListener('load', function(){
				onLoaded(qrCodeImage)
		})
	}



	return container;

};
