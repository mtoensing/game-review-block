import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import {
	RangeControl,
	Dashicon,
	TextControl,
	TextareaControl,
} from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import ServerSideRender from '@wordpress/server-side-render';

import './editor.scss';

export default function Edit( {
	attributes,
	setAttributes,
	context: { postType, postId },
} ) {
	const blockProps = useBlockProps();

	const [ meta, setMeta ] = useEntityProp( 'postType', postType, 'meta' );

	if ( ! postId && ! postType ) {
		return (
			<div { ...blockProps }>
				<p>
					{ ' ' }
					{ __(
						'The review block works only in a post context.',
						'game-review'
					) }{ ' ' }
				</p>
			</div>
		);
	}

	const shortscoreMeta = meta._shortscore_rating;
	const gameMeta = meta._shortscore_game;
	const summaryMeta = meta._shortscore_summary;
	const statusiconAttribute = { icon: attributes.statusicon };

	setAttributes( { game: gameMeta } );
	setAttributes( { rating: String( shortscoreMeta ) } );
	checkStatus();

	function updateSummary( newValue ) {
		setMeta( { ...meta, _shortscore_summary: String( newValue ) } );
		checkStatus();
	}

	function updateShortscoreMeta( newValue ) {
		setMeta( { ...meta, _shortscore_rating: String( newValue ) } );
		setAttributes( { rating: String( newValue ) } );
		checkStatus();
	}

	function updateGameMeta( newValue ) {
		setMeta( {
			...meta,
			_shortscore_game: newValue.replace( /(<([^>]+)>)/gi, '' ),
		} );
		setAttributes( { game: newValue } );
		checkStatus();
	}

	function checkStatus() {
		if ( summaryMeta !== '' && attributes.game !== '' ) {
			setAttributes( { status: __( 'All done.', 'game-review' ) } );
			setAttributes( { statusicon: 'saved' } );
		} else {
			setAttributes( {
				status: __( 'Please fill out all fields.', 'game-review' ),
			} );
			setAttributes( { statusicon: 'hidden' } );
		}
	}

	return (
		<div { ...blockProps }>
			<TextControl
				onChange={ updateGameMeta }
				className="game"
				label={ __( 'Game' ) }
				value={ gameMeta }
				placeholder={ __(
					'Write the name of the game …',
					'game-review'
				) }
			/>

			<TextareaControl
				onChange={ updateSummary }
				className="summary"
				label={ __( 'Summary' ) }
				value={ summaryMeta }
				placeholder={ __(
					'Write a short review summary…',
					'game-review'
				) }
			/>
			{ /**
					  <div class="wp-block-game-review-box">
					  <div class="shortscore-hreview">
					  <div class="rating">
					  <div id="shortscore_value" { ...ratingAttribute }><span class="value">{ attributes.rating }</span></div>
					  <div class="outof">von <span class="best">10</span></div>
					  </div>
					  </div>
					  </div>
					 */ }

			<RangeControl
				label="Rating"
				help={ __(
					'Review score from 1 to 10. The higher the better.',
					'game-review'
				) }
				onChange={ updateShortscoreMeta }
				min={ 1 }
				max={ 10 }
				step={ 0.5 }
				value={ Number( shortscoreMeta ) }
			/>

			<p className="status notice">
				<Dashicon { ...statusiconAttribute } /> { attributes.status }
			</p>

			<ServerSideRender
				block="game-review/review-box"
				attributes={ attributes }
			/>
		</div>
	);
}
