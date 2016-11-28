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
    $markup = "<div role='main'></div>

    <script type='text/javascript' src='/wp-content/themes/themify-bmws/dist/scripts/libs.js'></script>
    <script type='text/javascript'>
        BM = {};
        window.$ = jQuery;
    </script>

    <script type='text/javascript' src='/wp-content/themes/themify-bmws/dist/scripts/common.js'></script>

    <script type='text/javascript'>
        BM.ControllerData = {
          fbEventShotNameAndId1: '" . get_field("fb_event_short_name_and_id_1", get_the_ID()) . "'
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
