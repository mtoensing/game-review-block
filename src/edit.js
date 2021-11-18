import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {

	const blockProps = useBlockProps();

	const onChangeSummary = ( newContent ) => {
		setAttributes( { summary: newContent } )
	}

	return (
		<RichText 
			{ ...blockProps }
			tagName="p"
			onChange={ onChangeSummary }
			allowedFormats={ [ 'core/bold', 'core/italic' ] }
			value={ attributes.summary }
			placeholder={ __( 'Write your text...' ) }
		/>
	);
}
