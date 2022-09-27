import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';
import {
	FontSizePicker,
	ToggleControl,
	Panel,
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
							<FontSizePicker
								fontSizes={ [
									{
										name: __( 'Small' ),
										slug: 'small',
										size: 26,
									},
									{
										name: __( 'Big' ),
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
								label={ __( 'Use cache', 'game-review' ) }
								help={ __(
									'Cache the result for one hour',
									'game-review'
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
