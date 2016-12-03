<?php
/**
* Enqueues child theme stylesheet, loading first the parent theme stylesheet.
*/
function themify_custom_enqueue_child_theme_styles() {
    wp_enqueue_style( 'parent-theme-css', get_template_directory_uri() . '/style.css' );
}
add_action( 'wp_enqueue_scripts', 'themify_custom_enqueue_child_theme_styles', 11 );

session_start();

// [fb-events]
function fb_events(){
    $markup = "<div role='main' />

    <script type='text/javascript' src='/wp-content/themes/themify-bmws/dist/scripts/libs.js'></script>
    <script type='text/javascript'>
        BM = {};
        window.$ = jQuery;
    </script>

    <script type='text/javascript' src='/wp-content/themes/themify-bmws/dist/scripts/common.js'></script>

    <script type='text/javascript'>
        BM.ControllerData = {
          fbEventShortNameAndId1: '" . get_field("fb_event_short_name_and_id_1", get_the_ID()) . "',
          fbEventShortNameAndId2: '" . get_field("fb_event_short_name_and_id_2", get_the_ID()) . "',
          fbEventShortNameAndId3: '" . get_field("fb_event_short_name_and_id_3", get_the_ID()) . "',
          fbEventShortNameAndId4: '" . get_field("fb_event_short_name_and_id_4", get_the_ID()) . "',
          fbEventShortNameAndId5: '" . get_field("fb_event_short_name_and_id_5", get_the_ID()) . "',
          fbEventShortNameAndId6: '" . get_field("fb_event_short_name_and_id_6", get_the_ID()) . "',
          fbEventShortNameAndId7: '" . get_field("fb_event_short_name_and_id_7", get_the_ID()) . "',
          fbEventShortNameAndId8: '" . get_field("fb_event_short_name_and_id_8", get_the_ID()) . "',
          fbEventShortNameAndId9: '" . get_field("fb_event_short_name_and_id_9", get_the_ID()) . "',
          fbEventShortNameAndId10: '" . get_field("fb_event_short_name_and_id_10", get_the_ID()) . "',
          fbEventShortNameAndId11: '" . get_field("fb_event_short_name_and_id_11", get_the_ID()) . "',
          fbEventShortNameAndId12: '" . get_field("fb_event_short_name_and_id_12", get_the_ID()) . "',
          fbEventShortNameAndId13: '" . get_field("fb_event_short_name_and_id_13", get_the_ID()) . "',
          fbEventShortNameAndId14: '" . get_field("fb_event_short_name_and_id_14", get_the_ID()) . "',
          fbEventShortNameAndId15: '" . get_field("fb_event_short_name_and_id_15", get_the_ID()) . "',
          fbEventShortNameAndId16: '" . get_field("fb_event_short_name_and_id_16", get_the_ID()) . "',
          fbEventShortNameAndId17: '" . get_field("fb_event_short_name_and_id_17", get_the_ID()) . "',
          fbEventShortNameAndId18: '" . get_field("fb_event_short_name_and_id_18", get_the_ID()) . "',
          fbEventShortNameAndId19: '" . get_field("fb_event_short_name_and_id_19", get_the_ID()) . "',
          fbEventShortNameAndId20: '" . get_field("fb_event_short_name_and_id_20", get_the_ID()) . "',
          fbEventShortNameAndId21: '" . get_field("fb_event_short_name_and_id_21", get_the_ID()) . "',
          fbEventShortNameAndId22: '" . get_field("fb_event_short_name_and_id_22", get_the_ID()) . "',
          fbEventShortNameAndId23: '" . get_field("fb_event_short_name_and_id_23", get_the_ID()) . "',
          fbEventShortNameAndId24: '" . get_field("fb_event_short_name_and_id_24", get_the_ID()) . "',
          fbEventShortNameAndId25: '" . get_field("fb_event_short_name_and_id_25", get_the_ID()) . "',
          fbEventShortNameAndId26: '" . get_field("fb_event_short_name_and_id_26", get_the_ID()) . "',
          fbEventShortNameAndId27: '" . get_field("fb_event_short_name_and_id_27", get_the_ID()) . "',
          fbEventShortNameAndId28: '" . get_field("fb_event_short_name_and_id_28", get_the_ID()) . "',
          fbEventShortNameAndId29: '" . get_field("fb_event_short_name_and_id_29", get_the_ID()) . "',
          fbEventShortNameAndId30: '" . get_field("fb_event_short_name_and_id_30", get_the_ID()) . "'
        };
    </script>

    <script type='text/javascript' src='/wp-content/themes/themify-bmws/dist/scripts/fbEvents.js'></script>

    <script>
      window.fbAsyncInit = function() {
        FB.init({
          appId      : '1833011923649309',
          xfbml      : true,
          version    : 'v2.8'
        });

        FB.AppEvents.logPageView();

        $(window).trigger('facebook:init');
      };

      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = '//connect.facebook.net/en_US/sdk.js';
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
    </script>";

    return $markup;
}
add_shortcode( 'fb-events', 'fb_events' );
