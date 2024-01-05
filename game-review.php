<?php
/**
 * Plugin Name:       Game Review Block
 * Description:       Add a review rating block with a score from 1 to 10 to your post. Adds schema.org meta data for Rich Results in search engines.
 * Requires PHP:      7.0
 * Version:           4.0.8
 * Author:            Marc Tönsing
 * Author URI: 		  https://toensing.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       game-review-block
 */

require dirname(__FILE__). '/src/review-box/callback.php';
require dirname(__FILE__). '/src/random-game/callback.php';
require dirname(__FILE__). '/src/game-list/callback.php';
require dirname(__FILE__). '/src/game-table/callback.php';

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/writing-your-first-block-type/
 */
function game_review_block_init()
{

    register_block_type(plugin_dir_path(__FILE__) . 'build/review-box/', [
        'render_callback' => 'render_review_box'
    ]);

    register_block_type(plugin_dir_path(__FILE__) . 'build/random-game/', [
        'render_callback' => 'render_random_game'
    ]);

    register_block_type(plugin_dir_path(__FILE__) . 'build/game-list/', [
        'render_callback' => 'render_game_list'
    ]);

    register_block_type(plugin_dir_path(__FILE__) . 'build/game-table/', [
        'render_callback' => 'render_game_table'
    ]);

}

add_action('init', 'game_review_block_init');
