<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * @param null $template
 * @param bool $tutor_pro
 *
 * @return bool|string
 *
 * Load template with override file system
 *
 * @since v.1.0.0
 * @updated v.1.4.2
 * @updated v.1.4.3
 */

if ( ! function_exists( 'tutor_get_template' ) ) {
	function tutor_get_template( $template = null, $tutor_pro = false ) {
		if ( ! $template ) {
			return false;
		}
		$template = str_replace( '.', DIRECTORY_SEPARATOR, $template );

		/**
		 * Get template first from child-theme if exists
		 * If child theme not exists, then get template from parent theme
		 */
		$template_location = trailingslashit( get_stylesheet_directory() ) . "tutor/{$template}.php";
		if ( ! file_exists( $template_location ) ) {
			$template_location = trailingslashit( get_template_directory() ) . "tutor/{$template}.php";
		}
		$file_in_theme = $template_location;
		if ( ! file_exists( $template_location ) ) {
			$template_location = trailingslashit( tutor()->path ) . "templates/{$template}.php";

			if ( $tutor_pro && function_exists( 'tutor_pro' ) ) {
				$pro_template_location = trailingslashit( tutor_pro()->path ) . "templates/{$template}.php";
				if ( file_exists( $pro_template_location ) ) {
					$template_location = trailingslashit( tutor_pro()->path ) . "templates/{$template}.php";
				}
			}

			if ( ! file_exists( $template_location ) ) {
				echo '<div class="tutor-notice-warning"> ' . __( sprintf( 'The file you are trying to load does not exist in your theme or Tutor LMS plugin location. If you are extending the Tutor LMS plugin, please create a php file here: %s ', '<code>' . $file_in_theme . '</code>' ), 'tutor' ) . ' </div>';
			}
		}

		return apply_filters( 'tutor_get_template_path', $template_location, $template );
	}
}

/**
 * @param null $template
 * @param bool $tutor_pro
 *
 * @return bool|mixed|void
 *
 * Get only template path without any warning...
 *
 * @since v.1.4.2
 */
if ( ! function_exists( 'tutor_get_template_path' ) ) {
	function tutor_get_template_path( $template = null, $tutor_pro = false ) {
		if ( ! $template ) {
			return false;
		}
		$template = str_replace( '.', DIRECTORY_SEPARATOR, $template );

		/**
		 * Get template first from child-theme if exists
		 * If child theme not exists, then get template from parent theme
		 */
		$template_location = trailingslashit( get_stylesheet_directory() ) . "tutor/{$template}.php";
		if ( ! file_exists( $template_location ) ) {
			$template_location = trailingslashit( get_template_directory() ) . "tutor/{$template}.php";
		}
		if ( ! file_exists( $template_location ) ) {
			$template_location = trailingslashit( tutor()->path ) . "templates/{$template}.php";
		}
		if ( ! file_exists( $template_location ) && $tutor_pro && function_exists( 'tutor_pro' ) ) {
			$template_location = trailingslashit( tutor_pro()->path ) . "templates/{$template}.php";
		}

		return apply_filters( 'tutor_get_template_path', $template_location, $template );
	}
}

/**
 * @param null $template
 *
 * @param array $variables
 *
 * Load template for TUTOR
 *
 * @since v.1.0.0
 *
 * @updated v.1.1.2
 */

if ( ! function_exists( 'tutor_load_template' ) ) {
	function tutor_load_template( $template = null, $variables = array(), $tutor_pro = false ) {
		$variables = (array) $variables;
		$variables = apply_filters( 'get_tutor_load_template_variables', $variables );
		extract( $variables );

		$isLoad = apply_filters( 'should_tutor_load_template', true, $template, $variables );
		if ( ! $isLoad ) {
			return;
		}

		do_action( 'tutor_load_template_before', $template, $variables );
		include tutor_get_template( $template, $tutor_pro );
		do_action( 'tutor_load_template_after', $template, $variables );
	}
}

/**
 * @param null $template
 * @param array $variables
 * @param bool $tutor_pro
 *
 * @since v.1.4.3
 */

if ( ! function_exists( 'tutor_load_template_part' ) ) {
	function tutor_load_template_part( $template = null, $variables = array(), $tutor_pro = false ) {
		$variables = (array) $variables;
		$variables = apply_filters( 'get_tutor_load_template_variables', $variables );
		extract( $variables );

		/**
		 * Get template first from child-theme if exists
		 * If child theme not exists, then get template from parent theme
		 */
		$template_location = trailingslashit( get_stylesheet_directory() ) . 'tutor/template.php';
		if ( ! file_exists( $template_location ) ) {
			$template_location = trailingslashit( get_template_directory() ) . 'tutor/template.php';
		}

		if ( ! file_exists( $template_location ) ) {
			$template_location = trailingslashit( tutor()->path ) . 'templates/template.php';
			if ( ! file_exists( $template_location ) && $tutor_pro && function_exists( 'tutor_pro' ) ) {
				$template_location = trailingslashit( tutor_pro()->path ) . 'templates/template.php';
			}
		}

		include apply_filters( 'tutor_get_template_part_path', $template_location, $template );
	}
}

/**
 * @param $template_name
 * @param array $variables
 *
 * @return string
 *
 * @since v.1.4.3
 */

if ( ! function_exists( 'tutor_get_template_html' ) ) {
	function tutor_get_template_html( $template_name, $variables = array(), $tutor_pro = false ) {
		ob_start();
		tutor_load_template( $template_name, $variables, $tutor_pro );

		return ob_get_clean();
	}
}

if ( ! function_exists( 'tutor_course_loop_start' ) ) {
	function tutor_course_loop_start( $echo = true ) {
		ob_start();
		tutor_load_template( 'loop.loop-start' );
		$output = apply_filters( 'tutor_course_loop_start', ob_get_clean() );

		if ( $echo ) {
			echo tutor_kses_html( $output );
		}
		return $output;
	}
}

if ( ! function_exists( 'tutor_course_loop_end' ) ) {
	function tutor_course_loop_end( $echo = true ) {
		ob_start();
		tutor_load_template( 'loop.loop-end' );

		$output = apply_filters( 'tutor_course_loop_end', ob_get_clean() );
		if ( $echo ) {
			echo tutor_kses_html( $output );
		}

		return $output;
	}
}

if ( ! function_exists( 'tutor_course_archive_pagination' ) ) {
	function tutor_course_archive_pagination( $echo = true ) {
		ob_start();
		tutor_load_template( 'loop.tutor-pagination' );

		$output = apply_filters( 'tutor_course_archive_pagination', ob_get_clean() );
		if ( $echo ) {
			echo tutor_kses_html( $output );
		}

		return $output;
	}
}

function tutor_course_loop_before_content() {
	ob_start();
	tutor_load_template( 'loop.loop-before-content' );

	$output = apply_filters( 'tutor_course_loop_before_content', ob_get_clean() );
	echo tutor_kses_html( $output );
}

function tutor_course_loop_after_content() {
	ob_start();
	tutor_load_template( 'loop.loop-after-content' );

	$output = apply_filters( 'tutor_course_loop_after_content', ob_get_clean() );
	echo tutor_kses_html( $output );
}

if ( ! function_exists( 'tutor_course_loop_title' ) ) {
	function tutor_course_loop_title() {
		ob_start();
		tutor_load_template( 'loop.title' );
		$output = apply_filters( 'tutor_course_loop_title', ob_get_clean() );

		echo tutor_kses_html( $output );
	}
}


if ( ! function_exists( 'tutor_course_loop_header' ) ) {
	function tutor_course_loop_header() {
		ob_start();
		tutor_load_template( 'loop.header' );
		$output = apply_filters( 'tutor_course_loop_header', ob_get_clean() );

		echo tutor_kses_html( $output );
	}
}

if ( ! function_exists( 'tutor_course_loop_footer' ) ) {
	function tutor_course_loop_footer() {
		ob_start();
		tutor_load_template( 'loop.footer' );
		$output = apply_filters( 'tutor_course_loop_footer', ob_get_clean() );

		echo tutor_kses_html( $output );
	}
}

// tutor_course_loop_footer


if ( ! function_exists( 'tutor_course_loop_start_content_wrap' ) ) {
	function tutor_course_loop_start_content_wrap() {
		ob_start();
		tutor_load_template( 'loop.start_content_wrap' );
		$output = apply_filters( 'tutor_course_loop_start_content_wrap', ob_get_clean() );

		echo tutor_kses_html( $output );
	}
}

if ( ! function_exists( 'tutor_course_loop_end_content_wrap' ) ) {
	function tutor_course_loop_end_content_wrap() {
		ob_start();
		tutor_load_template( 'loop.end_content_wrap' );
		$output = apply_filters( 'tutor_course_loop_end_content_wrap', ob_get_clean() );

		echo tutor_kses_html( $output );
	}
}

if ( ! function_exists( 'tutor_course_loop_thumbnail' ) ) {
	function tutor_course_loop_thumbnail( $echo = true ) {
		ob_start();
		tutor_load_template( 'loop.thumbnail' );
		$output = apply_filters( 'tutor_course_loop_thumbnail', ob_get_clean() );

		if ( $echo ) {
			echo tutor_kses_html( $output );
		} else {
			return $output;
		}
	}
}

if ( ! function_exists( 'tutor_course_loop_wrap_classes' ) ) {
	function tutor_course_loop_wrap_classes( $echo = true ) {
		$courseID = get_the_ID();
		$classes  = apply_filters(
			'tutor_course_loop_wrap_classes',
			array(
				'tutor-course',
				'tutor-course-loop',
				'tutor-course-loop-' . $courseID,
			)
		);

		$class = implode( ' ', $classes );
		if ( $echo ) {
			echo esc_attr( $class );
		}

		return esc_attr( $class );
	}
}

if ( ! function_exists( 'tutor_course_loop_col_classes' ) ) {
	function tutor_course_loop_col_classes( $echo = true ) {
		$course_filter = (bool) tutor_utils()->get_option( 'course_archive_filter', false );
		$shortcode_arg = isset( $GLOBALS['tutor_shortcode_arg'] ) ? $GLOBALS['tutor_shortcode_arg']['column_per_row'] : null;
		$course_cols   = $shortcode_arg === null ? tutor_utils()->get_option( 'courses_col_per_row', 3 ) : $shortcode_arg;
		$classes       = apply_filters(
			'tutor_course_loop_col_classes',
			array(
				'tutor-course-col-' . $course_cols,
			)
		);

		$class = implode( ' ', $classes );
		if ( $echo ) {
			echo esc_attr( $class );
		}

		return esc_attr( $class );
	}
}


if ( ! function_exists('tutor_container_classes')) {
    function tutor_container_classes( $echo = true ) {

        $classes = apply_filters( 'tutor_container_classes', array(
            'tutor-wrap tutor-courses-wrap',
            'tutor-container'
        ) );

		$classes = apply_filters(
			'tutor_container_classes',
			array(
				'tutor-wrap tutor-courses-wrap',
				'tutor-container',
			)
		);

		$class = implode( ' ', $classes );

		if ( $echo ) {
			echo esc_attr( $class );
		}

		return esc_attr( $class );
	}
}
if ( ! function_exists( 'tutor_post_class' ) ) {
	function tutor_post_class( $default = '' ) {
		$classes = apply_filters(
			'tutor_post_class',
			array(
				'tutor-wrap',
				$default,
			)
		);

		post_class( $classes );
	}
}

if ( ! function_exists( 'tutor_course_archive_filter_bar' ) ) {
	function tutor_course_archive_filter_bar() {
		ob_start();
		tutor_load_template( 'global.course-archive-filter-bar' );
		$output = apply_filters( 'tutor_course_archive_filter_bar', ob_get_clean() );

		echo $output;
	}
}

/**
 *
 * Get classes for widget loop single course wrap
 *
 * @param bool $echo
 *
 * @return string
 *
 * @since v.1.3.1
 */
if ( ! function_exists( 'tutor_widget_course_loop_classes' ) ) {
	function tutor_widget_course_loop_classes( $echo = true ) {

		$classes = apply_filters(
			'tutor_widget_course_loop_classes',
			array(
				'tutor-widget-course-loop',
				'tutor-widget-course',
				'tutor-widget-course-' . get_the_ID(),
			)
		);

		$class = implode( ' ', $classes );
		if ( $echo ) {
			echo esc_attr( $class );
		}

		return esc_attr( $class );
	}
}

/**
 * Get the post thumbnail
 */
if ( ! function_exists('get_tutor_course_thumbnail')) {
    function get_tutor_course_thumbnail($size = 'post-thumbnail', $url = false) {
        $post_id           = get_the_ID();
        $size              = apply_filters( 'tutor_course_thumbnail_size', $size, $post_id );
        $post_thumbnail_id = (int) get_post_thumbnail_id( $post_id );
        $placeHolderUrl    = tutor()->url . 'assets/images/placeholder.png';
        $thumb_url         = $post_thumbnail_id ? wp_get_attachment_image_url($post_thumbnail_id, $size) : $placeHolderUrl;

        if($url) {
            return $thumb_url;
        }

        echo '<div class="tutor-course-thumbnail-bg tutor-text-center">
            <img src="'.$thumb_url.'"/>
        </div>';
    }
}
/**
 * Get the course/post thumbnail src
 */
if ( ! function_exists( 'get_tutor_course_thumbnail_src' ) ) {
	function get_tutor_course_thumbnail_src( $size = 'post-thumbnail' ) {
		$post_id           = get_the_ID();
		$post_thumbnail_id = (int) get_post_thumbnail_id( $post_id );

        if ( $post_thumbnail_id ) {
            $size = apply_filters( 'tutor_course_thumbnail_size', $size, $post_id );
            $src = wp_get_attachment_image_url( $post_thumbnail_id, $size, false );
        } else {
            $src = tutor()->url . 'assets/images/placeholder.png';
        }

		return $src;
	}
}

if ( ! function_exists( 'tutor_course_loop_meta' ) ) {
	function tutor_course_loop_meta() {
		ob_start();
		tutor_load_template( 'loop.meta' );
		$output = apply_filters( 'tutor_course_loop_meta', ob_get_clean() );

		echo tutor_kses_html( $output );
	}
}

/**
 * Get course author name in loop
 *
 * @since: v.1.0.0
 */

if ( ! function_exists( 'tutor_course_loop_author' ) ) {
	function tutor_course_loop_author() {
		ob_start();
		tutor_load_template( 'loop.course-author' );
		$output = apply_filters( 'tutor_course_loop_author', ob_get_clean() );

		echo $output;
	}
}

/**
 * Get formatted price with cart form
 */

if ( ! function_exists('tutor_course_loop_price')) {
    function tutor_course_loop_price() {
        ob_start();

        if(tutor_utils()->is_course_added_to_cart(get_the_ID())){
            tutor_load_template( 'loop.course-in-cart' );
        }
        else if(tutor_utils()->is_enrolled(get_the_ID())){
            tutor_load_template( 'loop.course-continue' );
        }
        else{
            $tutor_course_sell_by = apply_filters('tutor_course_sell_by', null);
            if ($tutor_course_sell_by){
                tutor_load_template( 'loop.course-price-'.$tutor_course_sell_by );
            }else{
                tutor_load_template( 'loop.course-price' );
            }
        }

        echo apply_filters( 'tutor_course_loop_price', ob_get_clean() );
    }
}

/**
 * Get Course rating
 *
 * @since v.1.0.0
 * @updated v.1.4.5
 */

if ( ! function_exists( 'tutor_course_loop_rating' ) ) {
	function tutor_course_loop_rating() {

        $disable = !get_tutor_option('enable_course_review');
        if ($disable){
            return;
        }

		ob_start();
		tutor_load_template( 'loop.rating' );
		$output = apply_filters( 'tutor_course_loop_rating', ob_get_clean() );

		echo tutor_kses_html( $output );
	}
}

/**
 * @param bool $echo
 *
 * @return mixed|void
 *
 * Get add to cart form
 */

if ( ! function_exists( 'tutor_course_loop_add_to_cart' ) ) {
	function tutor_course_loop_add_to_cart( $echo = true ) {
		ob_start();
		$tutor_course_sell_by = apply_filters( 'tutor_course_sell_by', null );

		if ( $tutor_course_sell_by ) {
			tutor_load_template( 'loop.add-to-cart-' . $tutor_course_sell_by );
		}

		$output = apply_filters( 'tutor_course_loop_add_to_cart_link', ob_get_clean() );

		if ( $echo ) {
			echo wp_kses_post($output);
		}
		return $output;
	}
}

if ( ! function_exists( 'tutor_course_price' ) ) {
	function tutor_course_price() {
		ob_start();
		tutor_load_template( 'single.course.wc-price-html' );
		$output = apply_filters( 'tutor_course_price', ob_get_clean() );

		echo $output;
	}
}

/**
 * @param int $post_id
 *
 * echo the excerpt of TUTOR post type
 *
 * @since: v.1.0.0
 */
if ( ! function_exists( 'tutor_the_excerpt' ) ) {
	function tutor_the_excerpt( $post_id = 0 ) {
		if ( ! $post_id ) {
			$post_id = get_the_ID();
		}
		echo tutor_get_the_excerpt( $post_id );
	}
}
/**
 * @param int $post_id
 *
 * @return mixed
 *
 * Return excerpt of TUTOR post type
 *
 * @since: v.1.0.0
 */
if ( ! function_exists( 'tutor_get_the_excerpt' ) ) {
	function tutor_get_the_excerpt( $post_id = 0 ) {
		if ( ! $post_id ) {
			$post_id = get_the_ID();
		}

		$get_post = get_post( $post_id );
		return apply_filters( 'tutor_get_the_excerpt', $get_post->post_excerpt );
	}
}

/**
 * @return mixed
 *
 * return course author
 *
 * @since: v.1.0.0
 */

if ( ! function_exists( 'get_tutor_course_author' ) ) {
	function get_tutor_course_author() {
		global $post;
		return apply_filters( 'get_tutor_course_author', get_the_author_meta( 'display_name', $post->post_author ) );
	}
}

function get_tutor_course_author_id() {
	global $post;
	return (int) $post->post_author;
}

/**
 * @param int $course_id
 *
 * @return mixed
 * Course benefits return array
 *
 * @since: v.1.0.0
 */

if ( ! function_exists( 'tutor_course_benefits' ) ) {
	function tutor_course_benefits( $course_id = 0 ) {
		if ( ! $course_id ) {
			$course_id = get_the_ID();
		}
		$benefits = get_post_meta( $course_id, '_tutor_course_benefits', true );

		$benefits_array = array();
		if ( $benefits ) {
			$benefits_array = explode( "\n", $benefits );
		}

		$array = array_filter( array_map( 'trim', $benefits_array ) );

		return apply_filters( 'tutor_course/single/benefits', $array, $course_id );
	}
}

/**
 * @param bool $echo
 *
 * @return mixed
 *
 * Course single page benefits
 *
 * @since: v.1.0.0
 */

if ( ! function_exists( 'tutor_course_benefits_html' ) ) {
	function tutor_course_benefits_html( $echo = true ) {
		ob_start();
		tutor_load_template( 'single.course.course-benefits' );
		$output = apply_filters( 'tutor_course/single/benefits_html', ob_get_clean() );

		if ( $echo ) {
			echo wp_kses_post($output);
		}
		return $output;
	}
}

/**
 * @param bool $echo
 *
 * @return mixed|void
 *
 * Return Topics HTML
 *
 * @since: v.1.0.0
 */
if ( ! function_exists( 'tutor_course_topics' ) ) {
	function tutor_course_topics( $echo = true ) {
		ob_start();
		tutor_load_template( 'single.course.course-topics' );
		$output = apply_filters( 'tutor_course/single/topics', ob_get_clean() );
		wp_reset_postdata();

		if ( $echo ) {
			echo tutor_kses_html( $output );
		}

		return $output;
	}
}

/**
 * @param int $course_id
 *
 * @return mixed|void
 *
 * return course requirements in array
 *
 * @since: v.1.0.0
 */
if ( ! function_exists( 'tutor_course_requirements' ) ) {
	function tutor_course_requirements( $course_id = 0 ) {
		if ( ! $course_id ) {
			$course_id = get_the_ID();
		}
		$requirements = get_post_meta( $course_id, '_tutor_course_requirements', true );

		$requirements_array = array();
		if ( $requirements ) {
			$requirements_array = explode( "\n", $requirements );
		}

		$array = array_filter( array_map( 'trim', $requirements_array ) );
		return apply_filters( 'tutor_course/single/requirements', $array, $course_id );
	}
}

/**
 * @param bool $echo
 *
 * @return mixed|void
 *
 * Return course requirements in course single page
 *
 * @since: v.1.0.0
 */
if ( ! function_exists('tutor_course_requirements_html')) {
    function tutor_course_requirements_html($echo = true) {
        ob_start();
        tutor_course_material_includes_html();
        tutor_load_template( 'single.course.course-requirements' );
        $output = apply_filters( 'tutor_course/single/requirements_html', ob_get_clean() );

		if ( $echo ) {
			echo tutor_kses_html( $output );
		}
		return $output;
	}
}


/**
 * @param int $course_id
 *
 * @return mixed|void
 *
 * Return target audience in course single page
 *
 * @since: v.1.0.0
 */
if ( ! function_exists( 'tutor_course_target_audience' ) ) {
	function tutor_course_target_audience( $course_id = 0 ) {
		if ( ! $course_id ) {
			$course_id = get_the_ID();
		}
		$target_audience = get_post_meta( $course_id, '_tutor_course_target_audience', true );

		$target_audience_array = array();
		if ( $target_audience ) {
			$target_audience_array = explode( "\n", $target_audience );
		}

		$array = array_filter( array_map( 'trim', $target_audience_array ) );
		return apply_filters( 'tutor_course/single/target_audience', $array, $course_id );
	}
}

/**
 * @param bool $echo
 *
 * @return mixed|void
 *
 * Return target audience in course single page
 *
 * @since: v.1.0.0
 */
if ( ! function_exists( 'tutor_course_target_audience_html' ) ) {
	function tutor_course_target_audience_html( $echo = true ) {
		ob_start();
		tutor_load_template( 'single.course.course-target-audience' );
		$output = apply_filters( 'tutor_course/single/audience_html', ob_get_clean() );

		if ( $echo ) {
			echo tutor_kses_html( $output );
		}
		return $output;
	}
}


if ( ! function_exists( 'tutor_course_material_includes' ) ) {
	function tutor_course_material_includes( $course_id = 0 ) {
		if ( ! $course_id ) {
			$course_id = get_the_ID();
		}
		$target_audience = get_post_meta( $course_id, '_tutor_course_material_includes', true );

		$target_audience_array = array();
		if ( $target_audience ) {
			$target_audience_array = explode( "\n", $target_audience );
		}

		$array = array_filter( array_map( 'trim', $target_audience_array ) );
		return apply_filters( 'tutor_course/single/material_includes', $array, $course_id );
	}
}

if ( ! function_exists( 'tutor_course_material_includes_html' ) ) {
	function tutor_course_material_includes_html( $echo = true ) {
		ob_start();
		tutor_load_template( 'single.course.material-includes' );
		$output = apply_filters( 'tutor_course/single/material_includes', ob_get_clean() );

		if ( $echo ) {
			echo tutor_kses_html( $output );
		}
		return $output;
	}
}

// tutor_course_material_includes_html


if ( ! function_exists( 'tutor_course_instructors_html' ) ) {
	function tutor_course_instructors_html( $echo = true ) {
		$display_course_instructors = tutor_utils()->get_option( 'display_course_instructors' );
		if ( ! $display_course_instructors ) {
			return null;
		}

		ob_start();
		tutor_load_template( 'single.course.instructors' );
		$output = apply_filters( 'tutor_course/single/instructors_html', ob_get_clean() );

		if ( $echo ) {
			echo tutor_kses_html( $output );
		}
		return $output;
	}
}

if ( ! function_exists('tutor_course_target_reviews_html')) {
    function tutor_course_target_reviews_html($echo = true) {
        ob_start();
        tutor_load_template( 'single.course.reviews' );

        $output = apply_filters( 'tutor_course/single/reviews_html', ob_get_clean() );

		if ( $echo ) {
			echo tutor_kses_html( $output );
		}
		return $output;
	}
}

/**
 * @param bool $echo
 *
 * @return mixed
 *
 * Course single page main content / description
 *
 * @since: v.1.0.0
 */
if ( ! function_exists( 'tutor_course_content' ) ) {
	function tutor_course_content( $echo = true ) {
		ob_start();
		tutor_load_template( 'single.course.course-content' );
		$output = apply_filters( 'tutor_course/single/content', ob_get_clean() );

		if ( $echo ) {
			echo tutor_kses_html( $output );
		}

		return $output;
	}
}

/**
 * Course single page lead info
 *
 * @since: v.1.0.0
 */
if ( ! function_exists( 'tutor_course_lead_info' ) ) {
	function tutor_course_lead_info( $echo = true ) {
		ob_start();

		// exit('failed');

		$course_id        = get_the_ID();
		$course_post_type = tutor()->course_post_type;
		$queryCourse      = new WP_Query(
			array(
				'p'         => $course_id,
				'post_type' => $course_post_type,
			)
		);

		if ( $queryCourse->have_posts() ) {
			while ( $queryCourse->have_posts() ) {
				$queryCourse->the_post();
				tutor_load_template( 'single.course.lead-info' );
			}
			wp_reset_postdata();
		}

		$output = apply_filters( 'tutor_course/single/lead_info', ob_get_clean() );

		if ( $echo ) {
			echo tutor_kses_html( $output );
		}
		return $output;
	}
}

/**
 * @param bool $echo
 *
 * @return mixed|void
 */

if ( ! function_exists('tutor_course_enrolled_lead_info')) {
    function tutor_course_enrolled_lead_info( $echo = true ) {
        ob_start();

        $course_id        = get_the_ID();
        $course_post_type = tutor()->course_post_type;
        $queryCourse      = new WP_Query( array( 'p' => $course_id, 'post_type' => $course_post_type ) );

        if ( $queryCourse->have_posts() ) {
            while ( $queryCourse->have_posts() ) {
                $queryCourse->the_post();
                tutor_load_template( 'single.course.lead-info' );
            }
            wp_reset_postdata();
        }

        $output = apply_filters( 'tutor_course/single/enrolled/lead_info', ob_get_clean() );

		if ( $echo ) {
			echo tutor_kses_html( $output );
		}

        return $output;
    }
}

if ( ! function_exists('tutor_lesson_lead_info')) {
    function tutor_lesson_lead_info( $lesson_id = 0, $echo = true ) {
        if ( ! $lesson_id ) {
            $lesson_id = get_the_ID();
        }

        ob_start();
        $course_id = tutor_utils()->get_course_id_by( 'lesson', $lesson_id );
        $course_post_type = tutor()->course_post_type;
        $queryCourse      = new WP_Query( array( 'p' => $course_id, 'post_type' => $course_post_type ) );

        if ( $queryCourse->have_posts() ) {
            while ( $queryCourse->have_posts() ) {
                $queryCourse->the_post();
                tutor_load_template( 'single.course.lead-info' );
            }
            wp_reset_postdata();
        }
        $output = apply_filters( 'tutor_course/single/enrolled/lead_info', ob_get_clean() );

        if ( $echo ) {
            echo $output;
        }

        return $output;

    }
}

if ( ! function_exists( 'tutor_course_video' ) ) {
	function tutor_course_video( $echo = true ) {
		ob_start();
		tutor_load_template( 'single.video.video' );
		$output = apply_filters( 'tutor_course/single/video', ob_get_clean() );

		if ( $echo ) {
			echo $output;
		}
		return $output;
	}
}

if ( ! function_exists( 'tutor_lesson_video' ) ) {
	function tutor_lesson_video( $echo = true ) {
		ob_start();
		tutor_load_template( 'single.video.video' );
		$output = apply_filters( 'tutor_lesson/single/video', ob_get_clean() );

		if ( $echo ) {
			echo tutor_kses_html( $output );
		}
		return $output;
	}
}

/**
 *
 * Get all lessons attachments
 *
 * @param bool $echo
 *
 * @return mixed
 *
 * @since v.1.0.0
 */
if ( ! function_exists( 'get_tutor_posts_attachments' ) ) {
	function get_tutor_posts_attachments( $echo = true ) {
		ob_start();
		tutor_load_template( 'global.attachments' );
		$output = apply_filters( 'tutor_lesson/single/attachments', ob_get_clean() );

		if ( $echo ) {
			echo tutor_kses_html( $output );
		}
		return $output;
	}
}

/**
 * @param bool $echo
 *
 * @return mixed
 *
 * Render Lesson Main Content
 * @since v.1.0.0
 */
if ( ! function_exists( 'tutor_lesson_content' ) ) {
	function tutor_lesson_content( $echo = true ) {
		ob_start();
		tutor_load_template( 'single.lesson.content' );
		$output = apply_filters( 'tutor_lesson/single/content', ob_get_clean() );

		if ( $echo ) {
			echo $output;
		}

		return $output;
	}
}

if ( ! function_exists( 'tutor_lesson_mark_complete_html' ) ) {
	function tutor_lesson_mark_complete_html( $echo = true ) {
		ob_start();
		tutor_load_template( 'single.lesson.complete_form' );
		$output = apply_filters( 'tutor_lesson/single/complete_form', ob_get_clean() );

		if ( $echo ) {
			echo tutor_kses_html( $output );
		}

		return $output;
	}
}

function tutor_course_question_and_answer( $echo = true ) {
	ob_start();
	tutor_load_template( 'single.course.enrolled.question_and_answer' );
	$output = apply_filters( 'tutor_course/single/question_and_answer', ob_get_clean() );

	if ( $echo ) {
		echo $output;
	}

	return $output;
}

/**
 * @param bool $echo
 *
 * @return mixed
 *
 * @show progress bar about course complete
 *
 * @since v.2.0.0
 */

function tutor_course_info_tab() {
    tutor_course_content();
    tutor_course_benefits_html();
    tutor_course_instructors_html();
}


function tutor_course_announcements( $echo = true ) {
	ob_start();
	tutor_load_template( 'single.course.enrolled.announcements' );
	$output = apply_filters( 'tutor_course/single/announcements', ob_get_clean() );

	if ( $echo ) {
		echo $output;
	}

	return $output;
}

function tutor_single_quiz_top( $echo = true ) {
	ob_start();
	tutor_load_template( 'single.quiz.top' );
	$output = apply_filters( 'tutor_single_quiz/top', ob_get_clean() );

	if ( $echo ) {
		echo $output;
	}
	return $output;
}

function tutor_single_quiz_body( $echo = true ) {
	ob_start();
	tutor_load_template( 'single.quiz.body' );
	$output = apply_filters( 'tutor_single_quiz/body', ob_get_clean() );

	if ( $echo ) {
		echo $output;
	}
	return $output;
}

/**
 * @param bool $echo
 *
 * @return mixed|void
 *
 * Get the quiz description
 */
function tutor_single_quiz_content( $echo = true ) {
	ob_start();
	tutor_load_template( 'single.quiz.content' );
	$output = apply_filters( 'tutor_single_quiz/content', ob_get_clean() );

	if ( $echo ) {
		echo $output;
	}
	return $output;
}


function tutor_single_quiz_no_course_belongs( $echo = true ) {
	ob_start();
	tutor_load_template( 'single.quiz.no_course_belongs' );
	$output = apply_filters( 'tutor_single_quiz/no_course_belongs', ob_get_clean() );

	if ( $echo ) {
		echo $output;
	}
	return $output;
}

function single_quiz_contents( $echo = true ) {

	ob_start();
	tutor_load_template( 'single.quiz.single_quiz_contents' );
	$output = apply_filters( 'tutor_single_quiz/single_quiz_contents', ob_get_clean() );

	if ( $echo ) {
		echo $output;
	}
	return $output;
}

function get_tutor_course_level( $course_id = 0 ) {
	if ( ! $course_id ) {
		$course_id = get_the_ID();
	}
	if ( ! $course_id ) {
		return '';
	}

	$course_level = get_post_meta( $course_id, '_tutor_course_level', true );

	if ( $course_level ) {
		return tutor_utils()->course_levels( $course_level );
	}
	return false;
}

if ( ! function_exists('get_tutor_course_duration_context')) {
    function get_tutor_course_duration_context( $course_id = 0, $short_form = false ) {
        if ( ! $course_id ) {
            $course_id = get_the_ID();
        }
        if ( ! $course_id ) {
            return '';
        }
        $duration        = get_post_meta( $course_id, '_course_duration', true );
        $durationHours   = tutor_utils()->avalue_dot( 'hours', $duration );
        $durationMinutes = tutor_utils()->avalue_dot( 'minutes', $duration );
        $durationSeconds = tutor_utils()->avalue_dot( 'seconds', $duration );

        $hour_format   = $short_form ? __( 'h', 'tutor' ) : ' '.($durationHours>1 ? __('hours', 'tutor') : __( 'hour', 'tutor' ));
        $minute_format = $short_form ? __( 'm', 'tutor' ) : ' '.($durationMinutes>1 ? __('minutes', 'tutor') : __( 'minute', 'tutor' ));
        $second_format = $short_form ? __( 's', 'tutor' ) : ' '.($durationSeconds>1 ? __('seconds', 'tutor') : __( 'second', 'tutor' ));

        if ( $duration ) {
            $output = '';
            if ( $durationHours > 0 ) {
                $output .= '<span class="tutor-meta-level">' . ' ' . $durationHours . '</span><span class="tutor-meta-value color-text-subsued tutor-mr-4">' . $hour_format . '</span>';
            }

            if ( $durationMinutes > 0 ) {
                $output .= '<span class="tutor-meta-level">' . ' ' . $durationMinutes . '</span><span class="tutor-meta-value color-text-subsued tutor-mr-4">' . $minute_format . '</span>';
            }

            if ( !$durationHours && !$durationMinutes && $durationSeconds > 0 ) {
                $output .= '<span class="tutor-meta-level">' . ' ' . $durationSeconds . '</span><span class="tutor-meta-value color-text-subsued tutor-mr-4">' . $second_format . '</span>';
            }

			return $output;
		}

		return false;
	}
}
if ( ! function_exists( 'get_tutor_course_categories' ) ) {
	function get_tutor_course_categories( $course_id = 0 ) {
		if ( ! $course_id ) {
			$course_id = get_the_ID();
		}
		$terms = get_the_terms( $course_id, 'course-category' );

		return $terms;
	}
}

/**
 * @param int $course_id
 *
 * @return array|false|WP_Error
 *
 * Get course tags
 */

if ( ! function_exists( 'get_tutor_course_tags' ) ) {
	function get_tutor_course_tags( $course_id = 0 ) {
		if ( ! $course_id ) {
			$course_id = get_the_ID();
		}
		$terms = get_the_terms( $course_id, 'course-tag' );

		return $terms;
	}
}

/**
 * @param bool $echo
 *
 * @return mixed|void
 *
 * Template for course tags html
 */

if ( ! function_exists( 'tutor_course_tags_html' ) ) {
	function tutor_course_tags_html( $echo = true ) {
		ob_start();
		tutor_load_template( 'single.course.tags' );
		$output = apply_filters( 'tutor_course/single/tags_html', ob_get_clean() );

		if ( $echo ) {
			echo tutor_kses_html( $output );
		}

		return $output;
	}
}

/**
 * @param bool $echo
 *
 * @return mixed
 *
 * Get Q&A in lesson sidebar
 */

if ( ! function_exists( 'tutor_lesson_sidebar_question_and_answer' ) ) {
	function tutor_lesson_sidebar_question_and_answer( $echo = true ) {
		ob_start();
		tutor_load_template( 'single.lesson.sidebar_question_and_answer' );
		$output = apply_filters( 'tutor_lesson/single/sidebar_question_and_answer', ob_get_clean() );

		if ( $echo ) {
			echo tutor_kses_html( $output );
		}

		return $output;
	}
}

/**
 * @param bool $echo
 *
 * @return mixed
 *
 * Get Assignment content
 *
 * @since  v.1.3.3
 */

if ( ! function_exists( 'tutor_assignment_content' ) ) {
	function tutor_assignment_content( $echo = true ) {
		ob_start();
		tutor_load_template( 'single.assignment.content' );
		$output = apply_filters( 'tutor_assignment/single/content', ob_get_clean() );

		if ( $echo ) {
			echo tutor_kses_html( $output );
		}

		return $output;
	}
}

/**
 * @param string $msg
 * @param string $title
 * @param string $type
 *
 * @return string
 *
 * @since v.1.4.0
 */

if ( ! function_exists( 'get_tnotice' ) ) {
	function get_tnotice( $msg = '', $title = 'Success', $type = 'success' ) {

		$output = '<div class="tnotice tnotice--' . $type . '">
        <div class="tnotice__icon">&iexcl;</div>
        <div class="tnotice__content">';

		if ( $title ) {
			$output .= '<p class="tnotice__type">' . $title . '</p>';
		}
		$output .= '<p class="tnotice__message">' . $msg . '</p>
        </div>
    	</div>';

		return $output;
	}
}

/**
 * @param int  $course_content_id
 * @param bool $echo
 *
 * @return mixed|void
 *
 * Next Previous Pagination
 *
 * @since v.1.4.7
 */

function tutor_next_previous_pagination($course_content_id = 0, $echo = true){
    $content_id = tutor_utils()->get_post_id($course_content_id);
    $contents = tutor_utils()->get_course_prev_next_contents_by_id($content_id);
    $previous_id = $contents->previous_id;
    $next_id = $contents->next_id;

	ob_start();
	do_action( 'tutor_lesson_next_previous_pagination_before' );
	tutor_load_template( 'single.next-previous-pagination', compact( 'previous_id', 'next_id' ) );
	do_action( 'tutor_lesson_next_previous_pagination_after' );
	$output = apply_filters( 'tutor/single/next_previous_pagination', ob_get_clean() );

	if ( $echo ) {
		echo tutor_kses_html( $output );
	}

	return $output;
}

/**
 * Load custom template from any given file
 *
 * Pass parameter as wish
 *
 * @since 1.9.8
 */
if ( ! function_exists('tutor_load_template_from_custom_path')) {
    function tutor_load_template_from_custom_path( $template = null, $data = array(), $once = true ) {
        do_action('tutor_load_template_from_custom_path_before', $template, $data);
        if ( file_exists($template) ) {
            if($once) {
                include_once $template;
            }
            else {
                include $template;
            }
        }
        do_action('tutor_load_template_from_custom_path_after', $template, $data);
    }
}

/**
 * Load enrolled course progress template
 *
 * This template will be used on only dashboard enrolled course page
 *
 * @since v2.0.0
 */
if ( ! function_exists( 'tutor_enrolled_course_progress' ) ) {
    function tutor_enrolled_course_progress() {
        global $wp_query;
        $query_vars     = $wp_query->query_vars;
        if ( isset( $query_vars[ 'tutor_dashboard_page' ] ) && 'enrolled-courses' === $query_vars['tutor_dashboard_page'] ) {
            tutor_load_template_from_custom_path( tutor()->path . 'templates/loop/enrolled-course-progress.php', '', false );
        }
    }
}
