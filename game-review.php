<?php
/**
 * Plugin Name:       Game Review Block	
 * Description:       Add a review rating block with a score from 1 to 10 to your post. Adds schema.org meta data for Rich Results in search engines.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           2.0.3
 * Author:            Marc Tönsing
 * Author URI: 		  https://marc.tv
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       game-review
 *
 * @package           game-review
 */

require dirname(__FILE__). '/blocks/review-box/callback.php';
require dirname(__FILE__). '/blocks/random-game/callback.php';
require dirname(__FILE__). '/blocks/game-list/callback.php';

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/writing-your-first-block-type/
 */
function game_review_block_init() {

	register_block_type( plugin_dir_path( __FILE__ ) . 'blocks/review-box/',[
		'render_callback' => 'render_review_box'
	] );

	register_block_type( plugin_dir_path( __FILE__ ) . 'blocks/random-game/',[
		'render_callback' => 'render_random_game'
	] );

	register_block_type( plugin_dir_path( __FILE__ ) . 'blocks/game-list/',[
		'render_callback' => 'render_game_list'
	] );

}

add_action( 'init', 'game_review_block_init' );
