import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {

	const blockProps = useBlockProps();

	const onChangeSummary = ( newContent ) => {
		setAttributes( { summary: newContent } )
	}

	const onChangeItem = ( newItem ) => {
		setAttributes( { item: newItem } )
	}

	const onChangeValue = ( newValue ) => {
		setAttributes( { value: newValue} )
	}

	return (
		<p { ...blockProps }>
		<RichText 
			tagName="strong"
			onChange={ onChangeItem }
			className="item"
			allowedFormats={ [ 'core/bold', 'core/italic' ] }
			value={ attributes.item }
			placeholder={ __( 'Write your game title...' ) }
		/><br/	>
		<RichText 
			tagName="span"
			onChange={ onChangeSummary }
			className="summary"
			allowedFormats={ [ 'core/bold', 'core/italic' ] }
			value={ attributes.summary }
			placeholder={ __( 'Write your summary...' ) }
		/><br/	>
		<RichText 
			tagName="span"
			onChange={ onChangeValue }
			className="value"
			allowedFormats={ [ 'core/bold', 'core/italic' ] }
			value={ attributes.value }
			placeholder={ __( 'Write your rating score...' ) }
		/>
		</p>
	);
}
