<?php

/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'Online-Course-LMS' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

if ( !defined('WP_CLI') ) {
    define( 'WP_SITEURL', $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] );
    define( 'WP_HOME',    $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] );
}



/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'KewrohWfZaMOP2ZBOaEno1RFSlr3rA2HYBHwxmjpcAUGpY0VfSCs6helHAiDPJRf' );
define( 'SECURE_AUTH_KEY',  'ForFoKmKRzT5ebNMdHtdG8SaCt81HEVQt15BtbjzYuvc7F2NxiyzcRPifd4lKbXN' );
define( 'LOGGED_IN_KEY',    '2DdDdzBtNaWCMpoJuUlplwiflaKyO4OWxFMnj8PyHYIrhA8vWpO9UU3To5GOiC72' );
define( 'NONCE_KEY',        '8fg2Qd7uhvQo0T9GbSNDPV1tJK9thRmeisQ3YwNApAM78ndfQJTTj5JDyslYmhad' );
define( 'AUTH_SALT',        'fGEuSurJQu0Ljz7gjfNescjziuiXcQAfsI9d3SYI8ylloWb8HUB9DA8KYiCV8FB4' );
define( 'SECURE_AUTH_SALT', 'n83XUMMYour9sg5QrBNP6uBFRdss9QNgDZpo7d9RPxVzEw0Zy6knX7uQn8URS34S' );
define( 'LOGGED_IN_SALT',   'zK3Pu5NmKN7LOoZETOBZHtVR6AaDtJIWQLC8CvS7DEce66UWh97MhXi19DgGX1D5' );
define( 'NONCE_SALT',       '8YRdIL7l1kvSYWZlSsNoe8S5O6tFhmBonlx1O5yPnhxTLAhnjmfcsbCIK6ATDM75' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
