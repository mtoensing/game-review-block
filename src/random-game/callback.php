<?php

function is_random_game_backend_context()
{
    return defined('REST_REQUEST') && true === REST_REQUEST && 'edit' === filter_input(INPUT_GET, 'context');
}

function get_random_game_transient_key($attributes)
{
    $cache_args = array(
        'min_rating' => isset($attributes['min_rating']) ? (int) $attributes['min_rating'] : 1,
        'updated' => isset($attributes['updated']) ? (int) $attributes['updated'] : 0,
    );

    return 'shortscore_random_game_' . md5(wp_json_encode($cache_args));
}

function render_random_game($attributes)
{
    $random_game_html = '';
    $is_backend = is_random_game_backend_context();
    $use_cache = ! empty($attributes['use_cache']);

    if ($use_cache && ! $is_backend) {
        $transient_key = get_random_game_transient_key($attributes);
        $random_game_html = get_transient($transient_key);

        if (false === $random_game_html) {
            // It wasn't there, so regenerate the data and save the transient
            $random_game_html = getGameLink($attributes);
            set_transient($transient_key, $random_game_html, HOUR_IN_SECONDS);
        }
    } else {
        $random_game_html = getGameLink($attributes);
    }

    if ('' === $random_game_html) {
        if ($is_backend) {
            return '<p class="wp-block-random-game">' . esc_html__('No game found matching the current rating filter.', 'game-review-block') . '</p>';
        }

        return '';
    }

    $html = '<p class="wp-block-random-game">';

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
    $post = getRandomGame(isset($attributes['min_rating']) ? $attributes['min_rating'] : 1);

    if (! $post) {
        return '';
    }

    $post_id = $post->ID;
    $url = get_permalink($post_id);
    $tag = 'a';
    $is_backend = is_random_game_backend_context();

    $game_title = get_post_meta($post_id, '_shortscore_game', true);

    if ($game_title === '') {
        $game_title = get_the_title($post_id);
    }

    if ($is_backend) {
        $tag = "span";
        return '<' . $tag . '>' . esc_html($game_title) . '</' . $tag . '>';
    }

    return '<' . $tag . ' href="' . esc_url($url) . '" target="_self">' . esc_html($game_title) . '</' . $tag . '>';
}

function getRandomGame($min_rating = 1)
{
    $min_rating = max(1, min(10, (int) $min_rating));

    $args = array(
        'numberposts' => 1,
        'post_type'   => 'post',
        'post_status' => 'publish',
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

    if (empty($games)) {
        return null;
    }

    return $games[0];
}
