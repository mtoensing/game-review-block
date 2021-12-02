import { __ } from '@wordpress/i18n';
import { BlockControls } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';
import { ToolbarGroup, ToolbarButton} from '@wordpress/components';
import { useBlockProps } from '@wordpress/block-editor';

export default function Edit( { attributes, setAttributes } ) {

    const blockProps = useBlockProps();

    return (
        <div { ...blockProps  } >
        <BlockControls>
        <ToolbarGroup>
            <ToolbarButton
            className="components-icon-button components-toolbar__control"
            label={__('Update game list', 'game-review')}
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
