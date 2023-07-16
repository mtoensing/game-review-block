<?php

function render_random_game($attributes, $content)
{

    $html = '<div class="wp-block-random-game">';

    $random_game_html = '';

    $is_backend = defined('REST_REQUEST') && true === REST_REQUEST && 'edit' === filter_input(INPUT_GET, 'context', FILTER_SANITIZE_STRING);


    if($attributes['use_cache'] == true && $is_backend == false) {
        if (false === ($random_game_html = get_transient('shortscore_transient_link'))) {
            // It wasn't there, so regenerate the data and save the transient
            $random_game_html = getGameLink($attributes);
            set_transient('shortscore_transient_link', $random_game_html, 3600);
        }
    } else {
        $random_game_html = getGameLink($attributes);
    }

    $html .= $random_game_html;

    $html .= '</div>';

    return $html;
}

function getGameLink($attributes)
{
    $post = getRandomGame($attributes["min_rating"]);
    $post_id = $post->ID;
    $url = get_permalink($post_id);
    $tag = 'a';
    $fontsizeattr = '';
    $is_backend = defined('REST_REQUEST') && true === REST_REQUEST && 'edit' === filter_input(INPUT_GET, 'context', FILTER_SANITIZE_STRING);

    if(isset($attributes["fontsize"])) {
        $fontsizeattr = 'style="font-size: ' . $attributes["fontsize"] . 'px"';
    }

    $game_title = get_post_meta($post_id, '_shortscore_game', true);


    if ($game_title == '') {
        $game_title = get_the_title($post_id);
    }

    if ($is_backend == true) {
        $tag = "span";
    }

    $link = '<'.$tag.' ' . $fontsizeattr . ' href="' . $url . '" target="_self">' . $game_title . '</'.$tag.'>';

    return "<p>" . $link . "</p>";
}

function getRandomGame($min_rating = 1)
{
    $args = array(
    'numberposts' => 1,
    'meta_query'  => [
        [
        'key'     => '_shortscore_rating',
        'value'   => $min_rating,
        'type'    => 'numeric',
        'compare' => '>',
        ],
    ],
    'orderby'     => 'rand'
    );

    $games = get_posts($args);

    return $games[0];
}
