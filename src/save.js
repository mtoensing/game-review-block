import { __ } from '@wordpress/i18n';
import { RichText, useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 */
export default function save( { attributes } ) {

	const blockProps = useBlockProps.save();

	return (
		<p { ...blockProps } >
			<RichText.Content 
				tagName="strong" 
				className="item"
				value={ attributes.item } 
			/>
			<RichText.Content 
				tagName="span" 
				className="summary"
				value={ attributes.summary } 
			/>
			<RichText.Content 
				tagName="span" 
				className="value"
				value={ attributes.value } 
			/>
		</p>
	);
}
