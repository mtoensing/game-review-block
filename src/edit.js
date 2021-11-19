import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { RangeControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import './editor.scss';


export default function Edit( { attributes, setAttributes } ) {

	const blockProps = useBlockProps();

	const onChangeSummary = ( newContent ) => {
		setAttributes( { summary: newContent } )
	}

	const onChangeItem = ( newItem ) => {
		// remove html 
		setAttributes( { item: newItem.replace(/(<([^>]+)>)/gi, "") } )
	}

	const onChangeShortscore = ( newShortscore ) => {
		setAttributes( { shortscore: String(newShortscore)} )
	}

	const postType = useSelect(
		( select ) => select( 'core/editor' ).getCurrentPostType(),
		[]
	);

	const [ meta, setMeta ] = useEntityProp( 'postType', postType, 'meta' );

	const shortscore_meta = meta[ '_shortscore_user_rating' ];

	function updateShortscoreMeta( newValue ) {
		setMeta( { ...meta, _shortscore_user_rating: String(newValue) } );
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
				onChange={ updateShortscoreMeta }
				min={ 1 }
				max={ 10 }
				step={ 0.5 } 
				value={ Number ( shortscore_meta ) }
			/>
		</p>
	);
}
