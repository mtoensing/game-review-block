import { __ } from '@wordpress/i18n';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';
import { ToolbarGroup, ToolbarButton, ToggleControl, TextControl, Panel, PanelBody, PanelRow } from '@wordpress/components';
import { useBlockProps } from '@wordpress/block-editor';

export default function Edit( { attributes, setAttributes } ) {

    const blockProps = useBlockProps();

    function updateDivider( newValue ) {
		setAttributes( { divider: newValue } );
	}

    return (
        <div { ...blockProps  } >
        <InspectorControls>
        <Panel>
            <PanelBody>
            <PanelRow>
            <TextControl
                    label={__('Divider', 'game-review')}
                    help={__('The divider string between the score and maximum value', 'game-review')}
                    value={ attributes.divider }
                    onChange={updateDivider}
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
        block="game-review/game-list" 
        attributes={ attributes }
    />
    </div>
    );
}
