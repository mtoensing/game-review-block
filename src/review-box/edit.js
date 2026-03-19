import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import {
	RangeControl,
	Dashicon,
	TextControl,
	TextareaControl,
} from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import { useEffect } from '@wordpress/element';

import './editor.scss';

export default function Edit( {
	attributes,
	setAttributes,
	context: { postType, postId },
} ) {
	const blockProps = useBlockProps();

	const [ meta, setMeta ] = useEntityProp( 'postType', postType, 'meta' );

	const shortscoreMeta = meta._shortscore_rating;
	const gameMeta = meta._shortscore_game;
	const summaryMeta = meta._shortscore_summary;
	const statusiconAttribute = { icon: attributes.statusicon };
	const statusClass = 'status notice status_' + attributes.statusicon;
	const ratingNumber = Number( shortscoreMeta );
	const hasValidRating = Number.isFinite( ratingNumber );
	const previewRating = hasValidRating
		? String( Number( ratingNumber.toFixed( 1 ) ) )
		: '0';
	const previewScoreClass = `shortscore shortscore-${
		hasValidRating ? Math.max( 0, Math.floor( ratingNumber ) ) : 0
	}`;
	const previewGame = gameMeta || __( 'Game title', 'game-review-block' );
	const previewSummary =
		summaryMeta ||
		__( 'A short summary of the review.', 'game-review-block' );

	// Keep SSR preview attributes aligned with the editor meta state.
	useEffect( () => {
		setAttributes( {
			game: gameMeta,
			rating: String( shortscoreMeta ),
			summary: summaryMeta,
		} );
	}, [ gameMeta, shortscoreMeta, summaryMeta, setAttributes ] );

	// Update status / statusicon based on summary & game after render
	useEffect( () => {
		const hasSummary = summaryMeta && summaryMeta !== '';
		const hasGame =
			( attributes.game && attributes.game !== '' ) ||
			( gameMeta && gameMeta !== '' );

		if ( hasSummary && hasGame ) {
			setAttributes( {
				status: __( 'All done.', 'game-review-block' ),
				statusicon: 'saved',
			} );
		} else {
			setAttributes( {
				status: __(
					'Please fill out all fields.',
					'game-review-block'
				),
				statusicon: 'hidden',
			} );
		}
	}, [ summaryMeta, attributes.game, gameMeta, setAttributes ] );

	function updateSummary( newValue ) {
		setMeta( { ...meta, _shortscore_summary: String( newValue ) } );
		setAttributes( { summary: String( newValue ) } );
	}

	function updateShortscoreMeta( newValue ) {
		setMeta( { ...meta, _shortscore_rating: String( newValue ) } );
		setAttributes( { rating: String( newValue ) } );
	}

	function updateGameMeta( newValue ) {
		const cleaned = newValue.replace( /(<([^>]+)>)/gi, '' );
		setMeta( {
			...meta,
			_shortscore_game: cleaned,
		} );
		setAttributes( { game: cleaned } );
	}

	if ( ! postId && ! postType ) {
		return (
			<div { ...blockProps }>
				<p>
					{ ' ' }
					{ __(
						'The review block works only in a post context.',
						'game-review-block'
					) }{ ' ' }
				</p>
			</div>
		);
	}

	return (
		<div { ...blockProps }>
			<TextControl
				onChange={ updateGameMeta }
				className="game"
				label={ __( 'Game title', 'game-review-block' ) }
				value={ gameMeta }
				placeholder={ __(
					'The name of the game.',
					'game-review-block'
				) }
			/>

			<TextareaControl
				onChange={ updateSummary }
				className="summary"
				label={ __( 'Summary', 'game-review-block' ) }
				value={ summaryMeta }
				placeholder={ __(
					'A short summary of the review.',
					'game-review-block'
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
				label={ __( 'Rating score', 'game-review-block' ) }
				help={ __(
					'Review score from 1 to 10. The higher the better.',
					'game-review-block'
				) }
				onChange={ updateShortscoreMeta }
				min={ 1 }
				max={ 10 }
				step={ 0.5 }
				value={ Number( shortscoreMeta ) }
			/>

			<p className={ statusClass }>
				<Dashicon { ...statusiconAttribute } />{ ' ' }
				<small>{ attributes.status }</small>
			</p>

			<div className="wp-block-game-review-box">
				<div className="shortscore-hreview">
					<p className="text">
						<span className="item">
							<strong className="fn">{ previewGame }</strong>:
						</span>{ ' ' }
						<span className="summary">{ previewSummary }</span>
						<span className="reviewer vcard">
							{ ' - ' }
							<span className="fn">Preview</span>
						</span>
					</p>
					<div className="rating">
						<div
							id="shortscore_value"
							className={ previewScoreClass }
						>
							<div className="value-wrapper">
								<span className="value">{ previewRating }</span>
							</div>
						</div>
						<div className="outof">
							von <span className="best">10</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
