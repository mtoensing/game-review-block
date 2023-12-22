<?php

function render_game_table($attributes)
{
    // Arguments for WP_Query
    $args = array(
        'post_type'      => 'post',
        'orderby'        => array( 'meta_value_num' => 'DESC', 'date' => 'DESC' ),
        'meta_key'       => '_shortscore_rating',
        'meta_type'      => 'NUMERIC',
        'compare'        => '>=',
        'posts_per_page' => '300',
        'order'          => 'DESC',
        'ignore_sticky_posts' => 1
    );

    enqueue_table_sort_frontend();

    // Create a new WP_Query
    $the_query = new WP_Query($args);
    
    // Start the HTML output with the opening of the table and add an ID for JavaScript targeting

    $script = '';
    
    $html = '<table id="gameTable">';

    // Add table headers
    $html .= '<thead><tr><th class="th-sort-desc">Rating</th><th class="th-sort-desc">Game</th><th class="th-sort-desc">Publish Date</th></tr></thead><tbody>';

    // Loop through the posts
    while ($the_query->have_posts()) :
        $the_query->the_post();
        $post_id = get_the_ID();
        $game = get_post_meta($post_id, '_shortscore_game', true);
        $current_rating = get_post_meta($post_id, "_shortscore_rating", true);
        $publish_date = get_the_date('Y-m-d', $post_id); // Format date as desired
        $url = get_permalink($post_id);

        // Check if game name is not empty and current rating is greater than 0
        if (($game != '') and $current_rating > 0) {
            // Add a row to the table for each game
            $html .= "<tr><td>" . $current_rating . "/10</td><td><a href='" . $url . "'>" . $game . "</a></td><td>" . $publish_date . "</td></tr>";
        }
    endwhile;

    // Close the table tags
    $html .= "</tbody></table>";

    // Reset WordPress post data
    wp_reset_postdata();

    // Return the HTML table
    return $html;
}

function enqueue_table_sort_frontend()
{
    wp_enqueue_script(
        'game-table',
        plugin_dir_url(__FILE__) . 'table-sort.js',
        array(),
        '4.0.0',
        true
    );

    wp_enqueue_style(
        'game-table',
        plugin_dir_url(__FILE__) . 'table-sort.css',
        array(),
        '4.0.0'
    );
}