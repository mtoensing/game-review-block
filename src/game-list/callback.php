<?php

function render_game_list($attributes)
{
    $args = array(
        'post_type'      => 'post',
        'orderby'        => array( 'meta_value_num' => 'DESC', 'date' => 'DESC' ),
        'meta_key'       => '_shortscore_rating',
        'meta_type'      => 'NUMERIC',
        'meta_query'     => array(
            array(
                'key'     => '_shortscore_rating',
                'value'   => 0,
                'type'    => 'NUMERIC',
                'compare' => '>',
            ),
        ),
        'posts_per_page' => 1000,
        'order'          => 'DESC',
        'ignore_sticky_posts' => 1
    );

    $the_query = new WP_Query($args);
    $html = '';
    $prev_rating = null;
    $list_open = false;
    $count = 0;

    while ($the_query->have_posts()) :
        $the_query->the_post();
        $post_id 	= get_the_ID();
        $game = get_post_meta($post_id, '_shortscore_game', true);
        $current_rating = (float) get_post_meta($post_id, "_shortscore_rating", true);
        $url = get_permalink($post_id);

        if (($game != '') and $current_rating > 0) {
            $current_rating_group = (int) floor($current_rating);

            if (null === $prev_rating || $current_rating_group < $prev_rating) {
                if ($list_open) {
                    $html .= "\n</ul>\n";
                }
                $html .= "<h2>" . esc_html($current_rating_group) . "/10</h2>\n";
                $html .= "\n<ul>\n";
                $list_open = true;
            }

            $html .= "\t<li>[" .  esc_html($current_rating) . '/10] - <a href="' . esc_url($url) . '">' . esc_html($game) . "</a></li>\n";
            $count++;
            $prev_rating = $current_rating_group;
        }
    endwhile;

    if ($list_open) {
        $html .= "\n</ul><!-- SUM: ". intval($count) . " -->\n";
    }

    wp_reset_postdata();
    return $html;
}
