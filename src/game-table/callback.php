<?php

function render_game_table($attributes)
{   
    $alignclass = !empty($attributes['align']) ? 'align' . $attributes['align'] : '';
    $className = !empty($attributes['className']) ? strip_tags($attributes['className']) : '';
    $html_class = '';

    if (!empty($alignclass)) {
        $html_class .= " $alignclass";
    }

    if (!empty($className)) {
        $html_class .= " $className";
    }

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
    
    $html = "<table width=\"100%\" class=\"wp-block-table is-style-stripes $html_class\" id=\"game-table\">";

    // Add table headers
    $html .= '<thead><tr><th class="th-sort-desc">' . __( 'Rating', 'game-review-block' ) . '</th><th class="th-sort-desc">' . __( 'Game title', 'game-review-block' ) . '</th><th class="th-sort-desc">' . __( 'Review published', 'game-review-block' ) . '</th></tr></thead><tbody>';

    // Loop through the posts
    while ($the_query->have_posts()) :
        $the_query->the_post();
        $post_id = get_the_ID();
        $game = get_post_meta($post_id, '_shortscore_game', true);
        $current_rating = get_post_meta($post_id, "_shortscore_rating", true);
        $publish_date = get_the_date('', $post_id); 
        $publish_date_unix = get_the_date('U', $post_id); // Format date as desired
        $url = get_permalink($post_id);

        // Check if game name is not empty and current rating is greater than 0
        if (($game != '') and $current_rating > 0) {
            // Add a row to the table for each game
            $html .= "<tr><td>" . $current_rating . "/10</td><td><a href='" . $url . "'>" . $game . "</a></td><td data-time=" . $publish_date_unix . ">" . $publish_date . "</td></tr>";
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
        '4.0.2',
        true
    );

    wp_enqueue_style(
        'game-table',
        plugin_dir_url(__FILE__) . 'table-sort.css',
        array(),
        '4.0.2'
    );
}