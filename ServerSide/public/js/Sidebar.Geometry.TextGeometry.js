/**
 * @author mrdoob / http://mrdoob.com/
 */

Sidebar.Geometry.TextGeometry = function ( editor, object ) {

	var strings = editor.strings;

	var signals = editor.signals;

	var container = new UI.Row();

	var geometry = object.geometry;
	var parameters = geometry.parameters;

	// Text Value

	var textRow = new UI.Row();

    var textObject = new UI.Input().setWidth( '150px' ).setFontSize( '12px' ).onChange(update);
    textObject.setValue( parameters.text );

	textRow.add( new UI.Text('Text Value' ).setWidth( '90px' ) );
	textRow.add( textObject );

	container.add( textRow );


	// font size

	var fontSizeRow = new UI.Row();
	var fontSize = new UI.Number( parameters.parameters.size ).onChange( update );

	fontSizeRow.add( new UI.Text( 'Font Size' ).setWidth( '90px' ) );
	fontSizeRow.add( fontSize );

	container.add( fontSizeRow );

	// height

	var heightRow = new UI.Row();
	var height = new UI.Number( parameters.parameters.height ).onChange( update );

	heightRow.add( new UI.Text( strings.getKey( 'sidebar/geometry/box_geometry/height' ) ).setWidth( '90px' ) );
	heightRow.add( height );

	container.add( heightRow );


	function update() {
        console.log(height.getValue());

		editor.execute( new SetGeometryCommand( editor, object, new THREE[ geometry.type ](
            textObject.getValue(),
            {
                font : parameters.parameters.font,
                size : fontSize.getValue(),
                height : height.getValue()
            }
		) ) );

	}

	return container;

};

Sidebar.Geometry.TextBufferGeometry = Sidebar.Geometry.TextGeometry;
