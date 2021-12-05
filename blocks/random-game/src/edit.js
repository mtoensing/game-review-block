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
            name: __( 'Big' ),
            slug: 'big',
            size: 45,
        },
        {
            name: __( 'Bigger' ),
            slug: 'bigger',
            size: 60,
        }
        
    ];
    const fallbackFontSize = 16;
    
    const MyFontSizePicker = () => {
        const [ fontSize, setFontSize ] = useState( 16 );
        return (
            <FontSizePicker
                fontSizes={ fontSizes }
                value={ attributes.fontsize }
                fallbackFontSize={ fallbackFontSize }
                onChange={ ( newFontSize ) => {
                    setFontSize( newFontSize );
                    setAttributes( { fontsize: newFontSize } );
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
            <MyFontSizePicker />
            <ToggleControl
                    label={__('Use cache', 'game-review')}
                    help={__('Cache the result for one hour', 'game-review')}
                    checked={ attributes.use_cache }
                    onChange={ () => setAttributes( {  use_cache: ! attributes.use_cache } ) }
                />
            </PanelRow>
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
