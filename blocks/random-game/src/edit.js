import { __ } from '@wordpress/i18n';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';
import { useState } from '@wordpress/element';
import { FontSizePicker, ToolbarGroup, ToolbarButton, ToggleControl,Panel, PanelBody, PanelRow } from '@wordpress/components';
import { useBlockProps } from '@wordpress/block-editor';

export default function Edit( { attributes, setAttributes } ) {

    const blockProps = useBlockProps();

    const fontSizes = [
        {
            name: __( 'Small' ),
            slug: 'small',
            size: 12,
        },
        {
            name: __( 'Big' ),
            slug: 'big',
            size: 26,
        },
    ];
    const fallbackFontSize = 16;
    
    const MyFontSizePicker = () => {
        const [ fontSize, setFontSize ] = useState( 12 );
    
        return (
            <FontSizePicker
                fontSizes={ fontSizes }
                value={ fontSize }
                fallbackFontSize={ fallbackFontSize }
                onChange={ ( newFontSize ) => {
                    setFontSize( newFontSize );
                } }
            />
        );
    };

    return (
        <div { ...blockProps  } >
        <InspectorControls>
        <Panel>
            <PanelBody>
            <PanelRow>
            <ToggleControl
                    label={__('Use cache', 'game-review')}
                    help={__('Cache the result for one hour', 'game-review')}
                    checked={ attributes.use_cache }
                    onChange={ () => setAttributes( {  use_cache: ! attributes.use_cache } ) }
                />
            </PanelRow>
            <MyFontSizePicker />
            </PanelBody>
        </Panel>
        </InspectorControls>
        <BlockControls>
        <ToolbarGroup>
            <ToolbarButton
            className="components-icon-button components-toolbar__control"
            label={__('Update table of contents', 'game-review')}
            onClick={ () => setAttributes( { updated: Date.now()} ) }
            icon="update"
            />
        </ToolbarGroup>
    </BlockControls>
    <ServerSideRender 
        block="game-review/random-game" 
        attributes={ attributes }
    />
    </div>
    );
}
