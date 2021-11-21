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

function render_review_box(){
	$game  = get_post_meta( get_the_ID(), '_shortscore_game', true );

	if ( defined( 'REST_REQUEST' ) && REST_REQUEST ) {
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

function getShortscoreJSON(){
	$blogimage_url = '';
	$blogimage_width = '';
	$blogimage_height = '';
	$post_id = get_the_ID();
	$result = get_post_meta( $post_id, '_shortscore_result', true );
	$domain = get_site_url();
	$pid = $post_id;
	$game_title = $result->game->title;
	$post_title = get_the_title($post_id);
	$author_id = get_post_field( 'post_author', $post_id );
	$author_name = $result->shortscore->author;
	$author_url = get_author_posts_url($author_id);
	$shortscore = $result->shortscore->userscore;
	$url = get_permalink($post_id);
	$date_zulu = $result->shortscore->date;
	$shortscore_summary = nl2br( $result->shortscore->summary );
	$arr_plattforms = getPlatforms($post_id);
	$local_code = get_locale();

	$custom_logo_id = get_theme_mod( 'custom_logo' );
	$bloglogo = wp_get_attachment_image_src( $custom_logo_id , 'full' );
	if($bloglogo !== false){
		$blogimage_url = $bloglogo[0];
		$blogimage_width = $bloglogo[1];
		$blogimage_height = $bloglogo[2];
	}

  $featuredimage_id = get_post_thumbnail_id($pid);
	$gameimage = wp_get_attachment_image_src($featuredimage_id, 'full' );
	$gameimage_url = '';
	$gameimage_width = '';
	$gameimage_height = '';

	if($gameimage !== false){
		$gameimage_url = $gameimage[0];
		$gameimage_width = $gameimage[1];
		$gameimage_height = $gameimage[2];
	}

	$blogname = get_bloginfo( 'name' );

	$arr = array(
	'@context' => 'https://schema.org',
	'@graph' => array(
		'itemReviewed' => array(
			'name' => $game_title,
			'@type' => 'VideoGame',
			'applicationCategory' => 'Game',
			'operatingSystem' => $arr_plattforms,
			'logo' => array(
				'@type' => 'ImageObject',
				'url' => $gameimage_url,
				'width' => $gameimage_width,
				'height' => $gameimage_height,
			),
		),
	  '@type' => 'Review',
	  '@id' => $domain.'/?p='.$pid,
	  'name' => $post_title,
	  'author' => array(
			'@type' => 'Person',
	    '@id' => $domain.'/?author='.$author_id,
	    'name' => $author_name,
	    'sameAs' => $author_url
	  ),
		'publisher' => array (
			'@type' => 'Organisation',
			'name' => $blogname,
			'sameAs' => $domain,
			'logo' => array(
				'@type' => 'ImageObject',
				'url' => $blogimage_url,
				'width' => $blogimage_width,
				'height' => $blogimage_height,
			),
		),
	  'reviewRating' => array(
	    '@type' => 'Rating',
	    'ratingValue' => $shortscore,
	    'bestRating' => '10',
	    'worstRating' => '1'
	  ),
	  'url' => $url,
	  'datePublished' => $date_zulu,
	  'description' => $shortscore_summary,
		'inLanguage' => $local_code
	)
	);
	$json = json_encode($arr,JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT)."\n";
	$json_markup = '<script type="application/ld+json">' . $json . '</script>';

	return $json_markup;

}

function getPlatforms($post_id){
    $platforms = array();
    $tags = wp_get_post_tags($post_id);
    $whitelist = array(
		"Dreamcast",
		"Switch",
		"GameBoy",
		"iOS",
		"Android",
		"GameCube",
		"Wii",
		"Super Nintendo",
		"Mega Drive",
		"NES",
		"Vita",
		"GameBoy",
		"GBA",
		"SNES",
		"PlayStation",
		"macOS",
		"Windows",
		"XBOX",
		"PC",
		"PSP"
	);

    foreach ($tags as $tag) {
        foreach ($whitelist as $os) {
            if ( stripos($tag->name,$os) !== false ) {
                $platforms[] = $tag->name;
            }
        }
    }

    return $platforms;

}


function render_reviewbox(){

	$summary = "";
	$rating = 0;
	$game = "";

	$post_id = get_the_ID();
	$permalink = get_permalink($post_id);
	$date = get_the_date( DateTime::ISO8601 );
	$rating  = intval(get_post_meta( get_the_ID(), '_shortscore_rating', true ));
	$game  = get_post_meta( get_the_ID(), '_shortscore_game', true );
	$summary  = get_post_meta( get_the_ID(), '_shortscore_summary', true );
	$author = get_the_author_meta( 'nickname', get_post_field( 'post_author', $post_id ) );

	if( $rating < 1 AND $summary == "" AND $game != "" ) {
		return false;
	} 

	$html =	'<div class="wp-block-create-block-game-review">
		<div class="shortscore-hreview">
			<div class="text"><span class="item"> <a class="score"
						href="' . $permalink . '"><strong class="fn">' . $game . '</strong></a>: </span><span class="summary">' . $summary . '</span><span class="reviewer vcard"> – <span
						class="fn">' . $author . '</span></span></div>
			<div class="rating">
				<div id="shortscore_value" class="shortscore shortscore-' . round( $rating ) . '"><span class="value">' . $rating . '</span></div>
				<div class="outof">von <span class="best">10</span></div><span
					class="dtreviewed">' . $date . '</span>
			</div>
		</div>
	</div>';

	return $html;

}
