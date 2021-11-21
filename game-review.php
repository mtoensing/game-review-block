<?php
/**
 * Plugin Name:       Game Review
 * Description:       Add a review rating block with a score from 1 to 10 to your post. Adds schema.org meta data for Rich Results in search engines.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       game-review
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/writing-your-first-block-type/
 */
function create_block_game_review_block_init() {

	register_block_type( __DIR__ ,[
		'render_callback' => 'render_review_box'
	] );

}

add_action( 'init', 'create_block_game_review_block_init' );

function savePostMeta( $post_ID, $meta_name, $meta_value ) {
	add_post_meta( $post_ID, $meta_name, $meta_value, true ) || update_post_meta( $post_ID, $meta_name, $meta_value );
}

function render_review_box(){
	$game  = get_post_meta( get_the_ID(), '_shortscore_game', true );

	if ( defined( 'REST_REQUEST' ) && REST_REQUEST ) {

		/** migration from SHORTSCORE to-do **/
		$result = get_post_meta ( get_the_ID(), '_shortscore_result', true );
		if ( isset( $result->shortscore ) AND isset( $result->shortscore->summary ) ) {

			$summary = ( get_post_meta( get_the_ID(), '_shortscore_summary', true ));
	
			if ($summary == '' or $summary == false ){
				savePostMeta( get_the_ID(), '_shortscore_summary', $result -> shortscore ->summary );
			}
		}
		
		if ( property_exists ( $result ,'game' ) AND property_exists ( $result->game,'title' ) ){

			$game = ( get_post_meta( get_the_ID(), '_shortscore_game', true ));

			if ($game == '' or $game == false ){
				savePostMeta( get_the_ID(), '_shortscore_game', $result->game->title );
			}
		}

		if ( isset( $result->shortscore ) AND isset( $result->shortscore->userscore ) ) {
			$rating = ( get_post_meta( get_the_ID(), '_shortscore_rating', true ));

			if ($rating == '' or $rating == false or $rating < 2 ){
				savePostMeta( get_the_ID(), '_shortscore_rating', $result->shortscore->userscore );
			}
		}

		
		return "";
	} else {
		$html = render_reviewbox();
		return $html;
	};
}

register_post_meta( 'post', '_shortscore_rating', array(
    'show_in_rest' => true,
    'single' => true,
    'type' => 'string',
    'auth_callback' => function() {
        return current_user_can( 'edit_posts' );
    }
) );

register_post_meta( 'post', '_shortscore_game', array(
    'show_in_rest' => true,
    'single' => true,
    'type' => 'string',
    'auth_callback' => function() {
        return current_user_can( 'edit_posts' );
    }
) );

register_post_meta( 'post', '_shortscore_summary', array(
    'show_in_rest' => true,
    'single' => true,
    'type' => 'string',
    'auth_callback' => function() {
        return current_user_can( 'edit_posts' );
    }
) );

function render_reviewbox(){

	$post_id = get_the_ID();
	$summary = "";
	$rating = 0;
	$game = "";

	$rating  = intval(get_post_meta( $post_id, '_shortscore_rating', true ));
	$game  = get_post_meta( $post_id, '_shortscore_game', true );
	$summary  = get_post_meta( $post_id, '_shortscore_summary', true );

	if ( $rating < 1 OR $summary == "" OR $game == "" ) {
		return false;
	} 

	$permalink = get_permalink($post_id);
	$date = get_the_date( DateTime::ISO8601 );
	$author_nickname = get_the_author_meta( 'nickname', get_post_field( 'post_author', $post_id ) );

	$html =	'
	<div class="wp-block-create-block-game-review">
		<div class="shortscore-hreview">
			<p class="text">
				<span class="item">
					<a class="score" href="' . $permalink . '"><strong class="fn">' . $game . '</strong></a>:
				</span>
				<span class="summary">' . $summary . '</span>
				<span class="reviewer vcard"> – <span class="fn">' . $author_nickname . '</span></span>
			</p>
			<div class="rating">
				<div id="shortscore_value" class="shortscore shortscore-' . round( $rating ) . '">
					<span class="value">' . $rating . '</span>
				</div>
				<div class="outof">von <span class="best">10</span></div>
				<span class="dtreviewed">' . $date . '</span>
			</div>
		</div>
	</div>';

	$domain = get_site_url();
	$post_title = get_the_title($post_id);
	$author_id = get_post_field( 'post_author', $post_id );
	$author_url = get_author_posts_url($author_id);
	$local_code = get_locale();
	$blogname = get_bloginfo( 'name' );

	$arr = array(
	'@context' => 'https://schema.org',
	'@graph' => array(
		'itemReviewed' => array(
			'name' => $game,
			'@type' => 'VideoGame',
			'applicationCategory' => 'Game',
		),
	  '@type' => 'Review',
	  '@id' => $domain.'/?p=' . $post_id,
	  'name' => $post_title,
	  'author' => array(
			'@type' => 'Person',
	    '@id' => $domain.'/?author=' . $author_id,
	    'name' => $author_nickname,
	    'sameAs' => $author_url
	  ),
		'publisher' => array (
			'@type' => 'Organisation',
			'name' => $blogname,
			'sameAs' => $domain,
		),
	  'reviewRating' => array(
	    '@type' => 'Rating',
	    'ratingValue' => $rating,
	    'bestRating' => '10',
	    'worstRating' => '1'
	  ),
	  'url' => $permalink,
	  'datePublished' => $date, // Zulu
	  'description' => $summary,
		'inLanguage' => $local_code
	)
	);
	$json = json_encode($arr,JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT)."\n";
	$json_markup = '<script type="application/ld+json">' . $json . '</script>';

	return $html . $json_markup;
}
