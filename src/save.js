import { __ } from '@wordpress/i18n';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { useEntityProp } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 */
export default function save( { attributes } ) {

	const blockProps = useBlockProps.save();
	const posturl = attributes.post_url;
	const hrefPostURL = { href: posturl };

	return (
		<div { ...blockProps } >
			<div class="shortscore-hreview">
				<div class="text">
					<span class="item">
						<a class="score" { ...hrefPostURL }>
							<RichText.Content 
							tagName="strong" 
							className="game fn"
							value ={ attributes.game } /></a> 
					</span>
					<RichText.Content 
							tagName="span" 
							className="summary"
							value ={ attributes.summary } 
					/>
					<span class="reviewer vcard"> – 
						<span class="fn">Marc</span>
					</span>
				</div>
				<div class="rating">
					<RichText.Content 
						tagName="span" 
						className="rating"
						value ={ attributes.rating } 
					/>
				</div>
			</div>
		</div>
	);
}
