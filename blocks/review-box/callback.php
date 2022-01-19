<?php 

function savePostMeta( $post_ID, $meta_name, $meta_value ) {
	add_post_meta( $post_ID, $meta_name, $meta_value, true ) || update_post_meta( $post_ID, $meta_name, $meta_value );
}

function render_review_box($attributes, $content, $block ) {

	if ( ! isset( $block->context['postId'] ) ) {
		return '';
	}
	
	if ( defined( 'REST_REQUEST' ) && REST_REQUEST ) {

		/* migration from SHORTSCORE to-do
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
		*/
	} else {
		$html = getReviewboxHTML();
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

function getPlatformsJSON( $post_id ) {
	$whitelist = array(
		"Dreamcast" => "Sega Dreamcast",
		"Dreamcast" => "Sega Dreamcast",
		"Switch" => "Nintendo Switch",
		"GameBoy" => "GameBoy",
		"iOS" => "iOS",
		"Android" => "Android",
		"GameCube" => "GameCube",
		"Wii" => "Wii",
		"Super Nintendo" => "Super Nintendo",
		"SNES" => "Super Nintendo",
		"Mega Drive" => "SEGA Mega Drive",
		"Genesis" => "SEGA Genesis",
		"NES" => "Nintendo Entertainment System",
		"Nintendo Entertainment System" => "Nintendo Entertainment System",
		"Vita" => "PlayStation Vita",
		"GBA" => "Gameboy Advance",
		"Gameboy Advance" => "Gameboy Advance",
		"PlayStation 1" => "PlayStation",
		"PlayStation 2" => "PlayStation 2",
		"PlayStation 3" => "PlayStation 3",
		"PlayStation 4" => "PlayStation 4",
		"PlayStation 5" => "PlayStation 5",
		"PSX" => "PlayStation",
		"PS2" => "PlayStation 2",
		"PS3" => "PlayStation 3",
		"PS4" => "PlayStation 4",
		"PS5" => "PlayStation 5",
		"PSVR" => "PlayStation VR",
		"macOS" => "macOS",
		"Windows" => "Windows",
		"Steam" => "Windows",
		"Linux" => "Linux",
		"Xbox 360" => "Xbox 360",
		"Series S/X" => "Xbox Series S/X",
		"Xbox Series" => "Xbox Series S/X",
		"Xbox" => "Original Xbox",
		"PSP" => "PlayStation Portable"
	);

	$platforms = array();
	$tags = wp_get_post_tags($post_id);
	$i = 0;

	foreach ($tags as $tag) {
		foreach ($whitelist as $system => $os) {
			if ( (strcasecmp($tag->name, $system) == 0 ) OR ( strcasecmp($tag->name, $os) == 0 )) {
				$platforms[] = $os;
				$i++;
			}
		}
	}

	$platforms = array_values(array_unique( $platforms ));

	return $platforms;

}

function getGameImageJSON($post_id){

	$img_array = wp_get_attachment_image_src( get_post_thumbnail_id( $post_id) , 'large' ) ;
 
	if ( $img_array OR $img_array != '' ) {
   
	   $url = $img_array[0];
	   $width = $img_array[1];
	   $height = $img_array[2];
   
	} else {
		return false;
	}
	
	$arr = array(
		   '@type' => 'ImageObject',
		   'url' => $url,
		   'width' => $width,
		   'height' => $height
	);
   
	return $arr;
}

function getThemeLogoJSON(){		
 $img_array = wp_get_attachment_image_src( get_theme_mod( 'custom_logo' ), "medium" ) ;
 
 if ( $img_array OR $img_array != '' ) {

	$url = $img_array[0];
	$width = $img_array[1];
	$height = $img_array[2];

 } else {
	 return false;
 }
 
 $arr = array(
		'@type' => 'ImageObject',
	    'url' => $url,
	    'width' => $width,
	    'height' => $height
 );

 return $arr;

}

function getReviewboxHTML(){

	$post_id = get_the_ID();

	$summary = "";
	$rating = 0;
	$game = "";

	$rating  = esc_html( get_post_meta( $post_id, '_shortscore_rating', true ) );
	$game  = esc_html( get_post_meta( $post_id, '_shortscore_game', true ) );
	$summary  = esc_html( get_post_meta( $post_id, '_shortscore_summary', true ) );

	if ( $rating < 1 OR $summary == "" OR $game == "" ) {
		return false;
	} 

	$permalink = get_permalink($post_id);
	$date_published = get_the_date( DateTime::ISO8601 );
	$date_modified = get_the_modified_date( DateTime::ISO8601 );
	$author_nickname = get_the_author_meta( 'nickname', get_post_field( 'post_author', $post_id ) );

	$html =	'
	<div class="wp-block-game-review-box">
		<div class="shortscore-hreview">
			<p class="text">
				<span class="item">
					<a class="score" href="' . $permalink . '"><strong class="fn">' . $game . '</strong></a>:
				</span>
				<span class="summary">' . $summary . '</span>
				<span class="reviewer vcard"> – <span class="fn">' . $author_nickname . '</span></span>
			</p>
			<div class="rating">
				<div id="shortscore_value" class="shortscore shortscore-' . floor( $rating ) . '">
					<span class="value">' . $rating . '</span>
				</div>
				<div class="outof">von <span class="best">10</span></div>
				<span class="dtreviewed">' . $date_published . '</span>
			</div>
		</div>
	</div>';

	$domain = get_site_url();
	$post_title = get_the_title($post_id);
	$author_id = get_post_field( 'post_author', $post_id );
	$author_url = get_author_posts_url($author_id);
	$local_code = get_locale();
	$blogname = get_bloginfo( 'name' );
	$gameimagejson = getGameImageJSON($post_id);
	$platforms = getPlatformsJSON($post_id);
	$logojson = getThemeLogoJSON();

	$arr_review = array(
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
			'@type' => 'Organization',
			'name' => $blogname,
			'url' => $domain,
			'sameAs' => $domain
		),
	  	'reviewRating' => array(
			'@type' => 'Rating',
			'ratingValue' => $rating,
			'bestRating' => '10',
			'worstRating' => '1'
	  	),
		'url' => $permalink,
		'datePublished' => $date_published, // Zulu
		'dateModified' => $date_modified,
		'description' => $summary,
		'inLanguage' => $local_code
	)
	);

	if ($platforms) {
		$arr_review['@graph']['itemReviewed']['operatingSystem'] = $platforms;
	}

	if ($gameimagejson) {
		$arr_review['@graph']['itemReviewed']['image'] = $gameimagejson;
	}

	if ($logojson) {
		$arr_review['@graph']['publisher']['logo'] = $logojson;
	}

	$json_review = json_encode($arr_review,JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT)."\n";
	$json_review_markup = '<script type="application/ld+json">' . $json_review . '</script>';

	$arr_videogame = array(
		'@context' => 'https://schema.org',
		'@type' => 'VideoGame',
		'url' => $permalink,
		'name' => $game,
		'applicationCategory' => 'Game',
		'datePublished' => $date_published, // Zulu
		'dateModified' => $date_modified,
		'description' => $summary,
		'inLanguage' => $local_code
	);

	if ($gameimagejson) {
		$arr_videogame['image'] = $gameimagejson;
	}

	if ($platforms) {
		$arr_videogame['operatingSystem'] = $platforms;
	}

	$json_videogame = json_encode($arr_videogame,JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT)."\n";
	$json_videogame_markup = '<script type="application/ld+json">' . $json_videogame . '</script>';

	return $html . $json_review_markup . $json_videogame_markup;
}
