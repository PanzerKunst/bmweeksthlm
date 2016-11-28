<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wp_bmweeksthlm');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'AcB65oRo!F');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'z+n4t5(h;ehL-+!Lx,aH%ZV&mzO#vNx?VrWR#D)`q+AGm]X.1 Oi<e>t4kzsLMTT');
define('SECURE_AUTH_KEY',  '-AY^AxNa_YjkgGygB4Rpn`(!)xY~Alg=T=6{Bu>tDZciZ!+BC#B7GO*Mh]{C0j!x');
define('LOGGED_IN_KEY',    ';U>_!=xA@1*%zKPFID~92:KhFCqwn>k+g>@Dr<wowrdJPJqHgI29Q{yo,EtGlZ>:');
define('NONCE_KEY',        ';@E*Dk8q<!E]znOcamIG8tUE?KC|~txMS8ciWydDF5`lKGp*4T!IQN65<ni[+ !4');
define('AUTH_SALT',        'FqHl8pmv:@#4.,LASwNin$0yibnNGBLt9D*KaU}]!fp6{ZW0_r7FG:cIF@rsVdJX');
define('SECURE_AUTH_SALT', '4+/v0lBAs#*<y|Mh$e>Z**mtCb:|/i&Tzy1M7jJN^udiC*~XaZe^FYKb_XNxzW]4');
define('LOGGED_IN_SALT',   'h~1`lC+ja[vr/VKfH|om4vm&S}l=;wt0L(.uaQUJR,_tzR:_L,}4DnmahXS4qiNS');
define('NONCE_SALT',       'bQN?d 1{zkik5g=3F+7A$=kx0JWIncn[+3?R5w^O{S3nj*[&AUpSG4xP]%g;b[p7');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
