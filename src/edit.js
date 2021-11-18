import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { RangeControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import './editor.scss';


export default function Edit( { attributes, setAttributes } ) {

	const blockProps = useBlockProps();

	const onChangeSummary = ( newContent ) => {
		setAttributes( { summary: newContent } )
	}

	const onChangeItem = ( newItem ) => {
		setAttributes( { item: newItem.replace(/(<([^>]+)>)/gi, "") } )
	}

	const onChangeValue = ( newValue ) => {
		setAttributes( { value: String(newValue)} )
	}

	return (
		<p { ...blockProps }>
		<RichText 
			tagName="strong"
			onChange={ onChangeItem }
			className="item"
			withoutInteractiveFormatting
			allowedFormats={ [] }
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
		<RangeControl
				label="Rating"
				value={ Number(attributes.value) }
				onChange={ onChangeValue }
				min={ 1 }
				max={ 10 }
				step={ 0.5 } 
			/>
		</p>
	);
}
