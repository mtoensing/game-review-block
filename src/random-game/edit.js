import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';
import {
	FontSizePicker,
	ToggleControl,
	Panel,
	RangeControl,
	PanelBody,
	PanelRow,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
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
							<FontSizePicker
								fontSizes={ [
									{
										name: 'small',
										slug: 'small',
										size: 26,
									},
									{
										name: 'big',
										slug: 'big',
										size: 40,
									},
								] }
								value={ parseInt( attributes.fontsize ) }
								fallbackFontSize={ 26 }
								onChange={ ( newFontSize ) =>
									setAttributes( { fontsize: newFontSize } )
								}
								withSlider
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
					</PanelBody>
				</Panel>
			</InspectorControls>

			<ServerSideRender
				block="game-review/random-game"
				attributes={ attributes }
			/>
		</div>
	);
}
