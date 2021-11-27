<?php

function render_random_game($attributes, $content) {

    $html = '<div class="wp-block-game-review-box">';

    $random_game_html = '';

    if($attributes['use_cache'] == true){
    if ( false === ( $random_game_html = get_transient( 'shortscore_transient_link' ) ) ) {
        // It wasn't there, so regenerate the data and save the transient
        $random_game_html = getGameLink();
        set_transient( 'shortscore_transient_link', $random_game_html, 3600 );
    }
    } else {
        $random_game_html = getGameLink();
    }

    $html .= $random_game_html;

    $html .= '</div>';

    return $html;
}

function getGameLink() {

    $post = getRandomGame();
    $post_id = $post->ID;
    $game_title = get_post_meta( $post_id, '_shortscore_game', true );

    if ( $game_title == '' ) {
    $game_title = "error".get_the_title( $post_id );
    }

    if ( defined( 'REST_REQUEST' ) && REST_REQUEST ) {
        $url = "#";
    } else {
        $url = get_permalink( $post_id );
    };

    $link = '<a href="' . $url . '">' . $game_title . '</a>';

    return $link;
}

function getRandomGame() {

    $args = array(
    'numberposts' => 1,
    'meta_query'  => [
        [
        'key'     => '_shortscore_rating',
        'value'   => 1,
        'type'    => 'numeric',
        'compare' => '>',
        ],
    ],
    'orderby'     => 'rand'
    );

    $games = get_posts( $args );

    return $games[0];
}
