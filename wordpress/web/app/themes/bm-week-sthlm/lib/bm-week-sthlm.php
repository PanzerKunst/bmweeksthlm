<?php namespace Roots\Sage\BmWeekSthlm;

add_theme_support( 'custom-header' );

/**
 * Kills widows in text
 * @see http://davidwalsh.name/word-wrap-mootools-php
 * @param $text
 * @param int $minWords
 * @return string
 */
function word_wrapper($text, $minWords = 3) {
    $return = $text;
    $arr = explode(' ', $text);
    if (count($arr) >= $minWords) {
        $arr[count($arr) - 2] .= '&nbsp;' . $arr[count($arr) - 1];
        array_pop($arr);
        $return = implode(' ', $arr);
    }
    return $return;
}

/**
 * Builds data attributes for featured images used in page header
 */
function get_data_url_bg_imgs($postId, $thumbnailId) {
    $dataUrlBgImgLarge = null;
    $dataUrlBgImgSmall = null;
    if (has_post_thumbnail($postId)) {
        $featuredImageUrl = wp_get_attachment_image_src($thumbnailId, "full")[0];
        $dataUrlBgImgLarge = 'data-url-bg-img-large="' . $featuredImageUrl . '"';
        $fieldImg960px = get_field("featured_image_960px", $postId);
        if ($fieldImg960px) {
            $dataUrlBgImgSmall = 'data-url-bg-img-small="' . $fieldImg960px["url"] . '"';
        }
    }
    return $dataUrlBgImgLarge . " " . $dataUrlBgImgSmall;
}

function header_style() {
    $headerImgUrl = get_header_image();

    if (is_front_page() && $headerImgUrl != null) {
        return 'style="background-image: url(' . $headerImgUrl . ')"';
    } else {
        return null;
    }
}

class Walker_Index_All_Pages_As_Single extends \Walker_Nav_Menu {
    /**
     * Starts the element output.
     *
     * @since 3.0.0
     * @since 4.4.0 The {@see 'nav_menu_item_args'} filter was added.
     *
     * @see Walker::start_el()
     *
     * @param string   $output Passed by reference. Used to append additional content.
     * @param WP_Post  $item   Menu item data object.
     * @param int      $depth  Depth of menu item. Used for padding.
     * @param stdClass $args   An object of wp_nav_menu() arguments.
     * @param int      $id     Current item ID.
     */
    public function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
        if ( isset( $args->item_spacing ) && 'discard' === $args->item_spacing ) {
            $t = '';
            $n = '';
        } else {
            $t = "\t";
            $n = "\n";
        }
        $indent = ( $depth ) ? str_repeat( $t, $depth ) : '';

        $classes = empty( $item->classes ) ? array() : (array) $item->classes;
        $classes[] = 'menu-item-' . $item->ID;

        /**
         * Filters the arguments for a single nav menu item.
         *
         * @since 4.4.0
         *
         * @param stdClass $args  An object of wp_nav_menu() arguments.
         * @param WP_Post  $item  Menu item data object.
         * @param int      $depth Depth of menu item. Used for padding.
         */
        $args = apply_filters( 'nav_menu_item_args', $args, $item, $depth );

        /**
         * Filters the CSS class(es) applied to a menu item's list item element.
         *
         * @since 3.0.0
         * @since 4.1.0 The `$depth` parameter was added.
         *
         * @param array    $classes The CSS classes that are applied to the menu item's `<li>` element.
         * @param WP_Post  $item    The current menu item.
         * @param stdClass $args    An object of wp_nav_menu() arguments.
         * @param int      $depth   Depth of menu item. Used for padding.
         */
        $class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item, $args, $depth ) );
        $class_names = $class_names ? ' class="' . esc_attr( $class_names ) . '"' : '';
        $page_id = get_post_meta( $item->ID, '_menu_item_object_id', true );

        /**
         * Filters the ID applied to a menu item's list item element.
         *
         * @since 3.0.1
         * @since 4.1.0 The `$depth` parameter was added.
         *
         * @param string   $menu_id The ID that is applied to the menu item's `<li>` element.
         * @param WP_Post  $item    The current menu item.
         * @param stdClass $args    An object of wp_nav_menu() arguments.
         * @param int      $depth   Depth of menu item. Used for padding.
         */
        $url = esc_url(get_permalink($page_id));
        $id = str_replace("/", "", parse_url($url, PHP_URL_PATH));
        $id = $id ? ' id="' . esc_attr( $id ) . '"' : '';

        $output .= $indent . '<li' . $id . $class_names . get_data_url_bg_imgs($page_id, get_post_thumbnail_id($page_id)) . '>';

        $atts = array();
        $atts['title']  = ! empty( $item->attr_title ) ? $item->attr_title : '';
        $atts['target'] = ! empty( $item->target )     ? $item->target     : '';
        $atts['rel']    = ! empty( $item->xfn )        ? $item->xfn        : '';
        $atts['href']   = ! empty( $item->url )        ? $item->url        : '';

        /**
         * Filters the HTML attributes applied to a menu item's anchor element.
         *
         * @since 3.6.0
         * @since 4.1.0 The `$depth` parameter was added.
         *
         * @param array $atts {
         *     The HTML attributes applied to the menu item's `<a>` element, empty strings are ignored.
         *
         *     @type string $title  Title attribute.
         *     @type string $target Target attribute.
         *     @type string $rel    The rel attribute.
         *     @type string $href   The href attribute.
         * }
         * @param WP_Post  $item  The current menu item.
         * @param stdClass $args  An object of wp_nav_menu() arguments.
         * @param int      $depth Depth of menu item. Used for padding.
         */
        $atts = apply_filters( 'nav_menu_link_attributes', $atts, $item, $args, $depth );

        $attributes = '';
        foreach ( $atts as $attr => $value ) {
            if ( ! empty( $value ) ) {
                $value = ( 'href' === $attr ) ? esc_url( $value ) : esc_attr( $value );
                $attributes .= ' ' . $attr . '="' . $value . '"';
            }
        }
        $page = get_post( $page_id );

        /** This filter is documented in wp-includes/post-template.php */
        $title = apply_filters( 'the_title', $page->post_title );

        /**
         * Filters a menu item's title.
         *
         * @since 4.4.0
         *
         * @param string   $title The menu item's title.
         * @param WP_Post  $item  The current menu item.
         * @param stdClass $args  An object of wp_nav_menu() arguments.
         * @param int      $depth Depth of menu item. Used for padding.
         */
        $title = apply_filters( 'nav_menu_item_title', $title, $item, $args, $depth );

        $item_output = $args->before;
        $item_output .= '<header>';
        $item_output .= '<h2>' . $title . '</h2>';
        $item_output .= '</header>';
        $item_output .= '<article>' . apply_filters('the_content', $page->post_content) . '</article>';
        $item_output .= $args->after;

        /**
         * Filters a menu item's starting output.
         *
         * The menu item's starting output only includes `$args->before`, the opening `<a>`,
         * the menu item's title, the closing `</a>`, and `$args->after`. Currently, there is
         * no filter for modifying the opening and closing `<li>` for a menu item.
         *
         * @since 3.0.0
         *
         * @param string   $item_output The menu item's starting HTML output.
         * @param WP_Post  $item        Menu item data object.
         * @param int      $depth       Depth of menu item. Used for padding.
         * @param stdClass $args        An object of wp_nav_menu() arguments.
         */
        $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
    }
} // Walker_Index_All_Pages_As_Single

class Walker_Main_Menu extends \Walker_Nav_Menu {
    /**
     * Starts the element output.
     *
     * @since 3.0.0
     * @since 4.4.0 The {@see 'nav_menu_item_args'} filter was added.
     *
     * @see Walker::start_el()
     *
     * @param string   $output Passed by reference. Used to append additional content.
     * @param WP_Post  $item   Menu item data object.
     * @param int      $depth  Depth of menu item. Used for padding.
     * @param stdClass $args   An object of wp_nav_menu() arguments.
     * @param int      $id     Current item ID.
     */
    public function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
        if ( isset( $args->item_spacing ) && 'discard' === $args->item_spacing ) {
            $t = '';
            $n = '';
        } else {
            $t = "\t";
            $n = "\n";
        }
        $indent = ( $depth ) ? str_repeat( $t, $depth ) : '';

        $classes = empty( $item->classes ) ? array() : (array) $item->classes;
        $classes[] = 'menu-item-' . $item->ID;

        /**
         * Filters the arguments for a single nav menu item.
         *
         * @since 4.4.0
         *
         * @param stdClass $args  An object of wp_nav_menu() arguments.
         * @param WP_Post  $item  Menu item data object.
         * @param int      $depth Depth of menu item. Used for padding.
         */
        $args = apply_filters( 'nav_menu_item_args', $args, $item, $depth );

        /**
         * Filters the CSS class(es) applied to a menu item's list item element.
         *
         * @since 3.0.0
         * @since 4.1.0 The `$depth` parameter was added.
         *
         * @param array    $classes The CSS classes that are applied to the menu item's `<li>` element.
         * @param WP_Post  $item    The current menu item.
         * @param stdClass $args    An object of wp_nav_menu() arguments.
         * @param int      $depth   Depth of menu item. Used for padding.
         */
        $class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item, $args, $depth ) );
        $class_names = $class_names ? ' class="' . esc_attr( $class_names ) . '"' : '';

        /**
         * Filters the ID applied to a menu item's list item element.
         *
         * @since 3.0.1
         * @since 4.1.0 The `$depth` parameter was added.
         *
         * @param string   $menu_id The ID that is applied to the menu item's `<li>` element.
         * @param WP_Post  $item    The current menu item.
         * @param stdClass $args    An object of wp_nav_menu() arguments.
         * @param int      $depth   Depth of menu item. Used for padding.
         */
        $id = apply_filters( 'nav_menu_item_id', 'menu-item-'. $item->ID, $item, $args, $depth );
        $id = $id ? ' id="' . esc_attr( $id ) . '"' : '';

        $output .= $indent . '<li' . $id . $class_names .'>';

        $page_id = get_post_meta( $item->ID, '_menu_item_object_id', true );
        $url = esc_url(get_permalink($page_id));

        $atts = array();
        $atts['title']  = ! empty( $item->attr_title ) ? $item->attr_title : '';
        $atts['target'] = ! empty( $item->target )     ? $item->target     : '';
        $atts['rel']    = ! empty( $item->xfn )        ? $item->xfn        : '';
        $atts['href']   = "#" . str_replace("/", "", parse_url($url, PHP_URL_PATH));

        /**
         * Filters the HTML attributes applied to a menu item's anchor element.
         *
         * @since 3.6.0
         * @since 4.1.0 The `$depth` parameter was added.
         *
         * @param array $atts {
         *     The HTML attributes applied to the menu item's `<a>` element, empty strings are ignored.
         *
         *     @type string $title  Title attribute.
         *     @type string $target Target attribute.
         *     @type string $rel    The rel attribute.
         *     @type string $href   The href attribute.
         * }
         * @param WP_Post  $item  The current menu item.
         * @param stdClass $args  An object of wp_nav_menu() arguments.
         * @param int      $depth Depth of menu item. Used for padding.
         */
        $atts = apply_filters( 'nav_menu_link_attributes', $atts, $item, $args, $depth );

        $attributes = '';
        foreach ( $atts as $attr => $value ) {
            if ( ! empty( $value ) ) {
                $value = ( 'href' === $attr ) ? esc_url( $value ) : esc_attr( $value );
                $attributes .= ' ' . $attr . '="' . $value . '"';
            }
        }

        /** This filter is documented in wp-includes/post-template.php */
        $title = apply_filters( 'the_title', $item->title, $item->ID );

        /**
         * Filters a menu item's title.
         *
         * @since 4.4.0
         *
         * @param string   $title The menu item's title.
         * @param WP_Post  $item  The current menu item.
         * @param stdClass $args  An object of wp_nav_menu() arguments.
         * @param int      $depth Depth of menu item. Used for padding.
         */
        $title = apply_filters( 'nav_menu_item_title', $title, $item, $args, $depth );

        $item_output = $args->before;
        $item_output .= '<a'. $attributes .'>';
        $item_output .= $args->link_before . $title . $args->link_after;
        $item_output .= '</a>';
        $item_output .= $args->after;

        /**
         * Filters a menu item's starting output.
         *
         * The menu item's starting output only includes `$args->before`, the opening `<a>`,
         * the menu item's title, the closing `</a>`, and `$args->after`. Currently, there is
         * no filter for modifying the opening and closing `<li>` for a menu item.
         *
         * @since 3.0.0
         *
         * @param string   $item_output The menu item's starting HTML output.
         * @param WP_Post  $item        Menu item data object.
         * @param int      $depth       Depth of menu item. Used for padding.
         * @param stdClass $args        An object of wp_nav_menu() arguments.
         */
        $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
    }
} // Walker_Main_Menu

// [fb-events]
function fb_events(){
    $eventsPageId = get_page_by_path('events')->ID;

    $markup = "<div role='main'></div>

    <script type='text/javascript'>

        // TODO: remove
        console.log('Init CB.ControllerData');

        var CB = {
          ControllerData: {
              fbEventShortNameAndId1: '" . get_field("fb_event_short_name_and_id_1", $eventsPageId) . "',
              fbEventShortNameAndId2: '" . get_field("fb_event_short_name_and_id_2", $eventsPageId) . "',
              fbEventShortNameAndId3: '" . get_field("fb_event_short_name_and_id_3", $eventsPageId) . "',
              fbEventShortNameAndId4: '" . get_field("fb_event_short_name_and_id_4", $eventsPageId) . "',
              fbEventShortNameAndId5: '" . get_field("fb_event_short_name_and_id_5", $eventsPageId) . "',
              fbEventShortNameAndId6: '" . get_field("fb_event_short_name_and_id_6", $eventsPageId) . "',
              fbEventShortNameAndId7: '" . get_field("fb_event_short_name_and_id_7", $eventsPageId) . "',
              fbEventShortNameAndId8: '" . get_field("fb_event_short_name_and_id_8", $eventsPageId) . "',
              fbEventShortNameAndId9: '" . get_field("fb_event_short_name_and_id_9", $eventsPageId) . "',
              fbEventShortNameAndId10: '" . get_field("fb_event_short_name_and_id_10", $eventsPageId) . "',
              fbEventShortNameAndId11: '" . get_field("fb_event_short_name_and_id_11", $eventsPageId) . "',
              fbEventShortNameAndId12: '" . get_field("fb_event_short_name_and_id_12", $eventsPageId) . "',
              fbEventShortNameAndId13: '" . get_field("fb_event_short_name_and_id_13", $eventsPageId) . "',
              fbEventShortNameAndId14: '" . get_field("fb_event_short_name_and_id_14", $eventsPageId) . "',
              fbEventShortNameAndId15: '" . get_field("fb_event_short_name_and_id_15", $eventsPageId) . "',
              fbEventShortNameAndId16: '" . get_field("fb_event_short_name_and_id_16", $eventsPageId) . "',
              fbEventShortNameAndId17: '" . get_field("fb_event_short_name_and_id_17", $eventsPageId) . "',
              fbEventShortNameAndId18: '" . get_field("fb_event_short_name_and_id_18", $eventsPageId) . "',
              fbEventShortNameAndId19: '" . get_field("fb_event_short_name_and_id_19", $eventsPageId) . "',
              fbEventShortNameAndId20: '" . get_field("fb_event_short_name_and_id_20", $eventsPageId) . "',
              fbEventShortNameAndId21: '" . get_field("fb_event_short_name_and_id_21", $eventsPageId) . "',
              fbEventShortNameAndId22: '" . get_field("fb_event_short_name_and_id_22", $eventsPageId) . "',
              fbEventShortNameAndId23: '" . get_field("fb_event_short_name_and_id_23", $eventsPageId) . "',
              fbEventShortNameAndId24: '" . get_field("fb_event_short_name_and_id_24", $eventsPageId) . "',
              fbEventShortNameAndId25: '" . get_field("fb_event_short_name_and_id_25", $eventsPageId) . "',
              fbEventShortNameAndId26: '" . get_field("fb_event_short_name_and_id_26", $eventsPageId) . "',
              fbEventShortNameAndId27: '" . get_field("fb_event_short_name_and_id_27", $eventsPageId) . "',
              fbEventShortNameAndId28: '" . get_field("fb_event_short_name_and_id_28", $eventsPageId) . "',
              fbEventShortNameAndId29: '" . get_field("fb_event_short_name_and_id_29", $eventsPageId) . "',
              fbEventShortNameAndId30: '" . get_field("fb_event_short_name_and_id_30", $eventsPageId) . "'
            }
        };
    </script>";

    return $markup;
}
add_shortcode( 'fb-events', __NAMESPACE__ . '\fb_events' );
