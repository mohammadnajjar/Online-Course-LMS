<?php

/**
 * Display Video HTML5
 *
 * @since v.1.0.0
 * @author themeum
 * @url https://themeum.com
 *
 * @package TutorLMS/Templates
 * @version 1.4.3
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$video_info = tutor_utils()->get_video_info();

do_action( 'tutor_lesson/single/before/video/shortcode' );
?>
	<div class="course-players-parent">
		<div class="course-players">
			<div class="loading-spinner"></div>
			<?php echo do_shortcode( tutor_utils()->array_get( 'source_shortcode', $video_info ) ) ; ?>
		</div>
	</div>
<?php
do_action( 'tutor_lesson/single/after/video/shortcode' ); ?>
