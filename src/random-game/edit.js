import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';
import {
	ToggleControl,
	Panel,
	RangeControl,
	PanelBody,
	PanelRow,
	TextControl,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps();

	return (
		<p { ...blockProps }>
			<InspectorControls>
				<Panel>
					<PanelBody>
						<PanelRow>
							<RangeControl
								label={ __(
									'Minimum Rating score',
									'game-review-block'
								) }
								help={ __(
									'Show only games higher than this score.',
									'game-review-block'
								) }
								onChange={ ( rating ) =>
									setAttributes( {
										min_rating: Number( rating ),
									} )
								}
								min={ 1 }
								max={ 10 }
								step={ 1 }
								value={ Number( attributes.min_rating ) }
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label={ __( 'Use cache', 'game-review-block' ) }
								help={ __(
									'Cache the result for one hour',
									'game-review-block'
								) }
								checked={ attributes.use_cache }
								onChange={ () =>
									setAttributes( {
										use_cache: ! attributes.use_cache,
									} )
								}
							/>
						</PanelRow>
						<PanelRow>
							<TextControl
								label={ __(
									'Prefix Text',
									'game-review-block'
								) }
								help={ __(
									'Text to display before the random game.',
									'game-review-block'
								) }
								value={ attributes.prefix }
								onChange={ ( value ) =>
									setAttributes( { prefix: value } )
								}
							/>
						</PanelRow>
						<PanelRow>
							<TextControl
								label={ __(
									'Postfix Text',
									'game-review-block'
								) }
								help={ __(
									'Text to display after the random game.',
									'game-review-block'
								) }
								value={ attributes.postfix }
								onChange={ ( value ) =>
									setAttributes( { postfix: value } )
								}
							/>
						</PanelRow>
					</PanelBody>
				</Panel>
			</InspectorControls>

			<ServerSideRender
				block="game-review/random-game"
				attributes={ attributes }
			/>
		</p>
	);
}
