import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { RangeControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import ServerSideRender from '@wordpress/server-side-render';
import './editor.scss';


export default function Edit( { attributes, setAttributes } ) {

	const blockProps = useBlockProps();
	
	const postType = useSelect(
		( select ) => select( 'core/editor' ).getCurrentPostType(),
		[]
	);

	const [ meta, setMeta ] = useEntityProp( 'postType', postType, 'meta' );

	const shortscore_meta = meta[ '_shortscore_rating' ];
	const game_meta = meta[ '_shortscore_game' ];
	const summary_meta = meta[ '_shortscore_summary' ];
	const post_url = wp.data.select("core/editor").getPermalink();

	setAttributes( { post_url: post_url } );
	setAttributes( { game: game_meta } );
	setAttributes( { rating: String(shortscore_meta) } );
	setAttributes( { summary: summary_meta.replace(/(<([^>]+)>)/gi, "") } );

	function onChangeSummary ( newValue ) {
		setMeta( { ...meta, _shortscore_summary: String(newValue) } );
		setAttributes( { summary: newValue.replace(/(<([^>]+)>)/gi, "") } );
	}

	function updateShortscoreMeta( newValue ) {
		setMeta( { ...meta, _shortscore_rating: String(newValue) } );
		setAttributes( { rating: String(newValue) } );
	}

	function updateGameMeta( newValue ) {
		setMeta( { ...meta, _shortscore_game: newValue.replace(/(<([^>]+)>)/gi, "") } );
		setAttributes( { game: newValue } );
	}

	return (
		<div { ...blockProps }>
		<RichText 
			tagName="strong"
			onChange={ updateGameMeta }
			className="game"
			withoutInteractiveFormatting
			allowedFormats={ [] }
			value={ game_meta }
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
			<ServerSideRender
                    block="create-block/game-review"
                    attributes={ blockProps.attributes }
            />
		</div>
	);
}
