<?php


function render_game_list($attributes)
{
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

    $the_query = new WP_Query($args);
    $html = '';
    $prev_rating = 11;
    $i = 0;
    $num = $the_query->found_posts;

    while ($the_query->have_posts()) :
        $the_query->the_post();
        $post_id 	= get_the_ID();
        $game = get_post_meta($post_id, '_shortscore_game', true);
        $current_rating = get_post_meta($post_id, "_shortscore_rating", true);
        $url = get_permalink($post_id);

        if (($game != '') and $current_rating > 0) {

            if (floor($current_rating) < floor($prev_rating)) {
                if ($i != 0) {
                    $html .= "\n</ul>\n";
                }
                $html .= "<h2>" . floor($current_rating) . "/10</h2>\n";
                $html .= "\n<ul>\n";
            }

            $html .= "\t<li>[" .  $current_rating . '/10] - <a href="' . $url . '">' . $game . "</a></li>\n";

            if ($i == ($num - 1)) {
                $html .= "\n</ul><!-- SUM: ". $num . " -->\n";
            }

            $i++;
        }

        $prev_rating = $current_rating;
    endwhile;
    wp_reset_postdata();
    return $html;
}
