<?php 

function render_game_list ( $attributes ){
	$args = array(
        'post_type'      => 'post',
        'orderby'        => array( 'meta_value_num' => 'DESC', 'date' => 'DESC' ),
        'meta_key'       => '_shortscore_rating',
		'meta_type'		 => 'NUMERIC',
		'compare' => '>=',
        'posts_per_page' => '300',
        'order'          => 'DESC',
		'ignore_sticky_posts' => 1
    );

    $the_query = new WP_Query ( $args );
    $html = '';
	$prev_rating = 11;

    while ($the_query->have_posts()) :
		$the_query->the_post();
		$post_id 	= get_the_ID();
		$game = get_post_meta( $post_id, '_shortscore_game', true );
		$current_rating = get_post_meta( $post_id, "_shortscore_rating", true);
		$url = get_permalink($post_id);

		if ( ( $game != '' ) AND $current_rating > 0 ) {

			if (floor ( $current_rating ) < floor ( $prev_rating )){
				$html .= '<h2>' . floor($current_rating) . '/10</h2>';
			}
			$html .= '<p>[' .  $current_rating . '/10] - <a href="' . $url . '">' . $game . '</a></p>';	
		}

	$prev_rating = $current_rating;
    endwhile;
    wp_reset_postdata();

    return $html;
  }

  