import { __ } from '@wordpress/i18n';
import { BlockControls, useBlockProps } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						className="components-icon-button components-toolbar__control"
						label={ __( 'Update game list', 'game-review-block' ) }
						onClick={ () =>
							setAttributes( { updated: Date.now() } )
						}
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
