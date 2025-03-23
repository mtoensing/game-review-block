<?php

function render_random_game($attributes)
{
    $html = '<p class="wp-block-random-game">';
    $random_game_html = '';

    $is_backend = defined('REST_REQUEST') && true === REST_REQUEST && 'edit' === filter_input(INPUT_GET, 'context');

    if ($attributes['use_cache'] === true && !$is_backend) {
        if (false === ($random_game_html = get_transient('shortscore_transient_link'))) {
            // It wasn't there, so regenerate the data and save the transient
            $random_game_html = getGameLink($attributes);
            set_transient('shortscore_transient_link', $random_game_html, 3600);
        }
    } else {
        $random_game_html = getGameLink($attributes);
    }

    if (!empty($attributes['prefix'])) {
        $html .= '<span class="random-game-prefix">' . esc_html($attributes['prefix']) . '</span>';
    }

    $html .= '<span class="random-game-link">' . $random_game_html . '</span>';

    if (!empty($attributes['postfix'])) {
        $html .= '<span class="random-game-postfix">' . esc_html($attributes['postfix']) . '</span>';
    }

    $html .= '</p>';

    return $html;
}

function getGameLink($attributes)
{
    $post = getRandomGame($attributes["min_rating"]);
    $post_id = $post->ID;
    $url = get_permalink($post_id);
    $tag = 'a';
    $is_backend = defined('REST_REQUEST') && true === REST_REQUEST && 'edit' === filter_input(INPUT_GET, 'context');

    $game_title = get_post_meta($post_id, '_shortscore_game', true);

    if ($game_title === '') {
        $game_title = get_the_title($post_id);
    }

    if ($is_backend) {
        $tag = "span";
    }

    $link = '<' . $tag . ' href="' . $url . '" target="_self">' . $game_title . '</' . $tag . '>';

    return $link;
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
