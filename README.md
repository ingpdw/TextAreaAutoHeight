# textarea-auto-height
Automatically adjust textarea height

## Install

```
$npm install textarea-auto-height
```

## Usage

```
<textarea id="content" />
```

```
import TextAreaAutoHeight from 'textarea-auto-height';

let autoHeight = new TextAreaAutoHeight( jQuery( '#content' ) );

autoHeight.reset();

let autoHeight = new TextAreaAutoHeight( jQuery( '#content' ), jQuery( '#parent' ), 50 );

let autoHeight = new TextAreaAutoHeight( jQuery( '#content' ), jQuery( '#parent' ), 50, 1.5 /*lineHeight*/ );
//jQuery( '#content' ).css( 'line-height' )

```

## License
© 2015 ingpdw. MIT License
