<?php
/**
 * Class Shortcode
 *
 * @package TUTOR
 *
 * @since v.1.0.0
 */

namespace TUTOR;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Shortcode {

	private $instructor_layout = array(
		'pp-top-full',
		'pp-cp',
		'pp-top-left',
		'pp-left-middle',
		'pp-left-full',
	);

	public function __construct() {
		add_shortcode( 'tutor_student_registration_form', array( $this, 'student_registration_form' ) );
		add_shortcode( 'tutor_dashboard', array( $this, 'tutor_dashboard' ) );
		add_shortcode( 'tutor_instructor_registration_form', array( $this, 'instructor_registration_form' ) );
		add_shortcode( 'tutor_course', array( $this, 'tutor_course' ) );

		// Check if WP version is equal to or greater than 5.9.
		global $wp_version;
		if ( version_compare( $wp_version, '5.9', '>=' ) && function_exists( 'wp_is_block_theme' ) && wp_is_block_theme() ) {
			add_shortcode( 'tutor_dashboard_menu', array( $this, 'tutor_dashboard_menu' ) );
		}

		add_shortcode( 'tutor_instructor_list', array( $this, 'tutor_instructor_list' ) );
		add_action( 'tutor_options_after_instructors', array( $this, 'tutor_instructor_layout' ) );
		add_action( 'wp_ajax_load_filtered_instructor', array( $this, 'load_filtered_instructor' ) );
		add_action( 'wp_ajax_nopriv_load_filtered_instructor', array( $this, 'load_filtered_instructor' ) );

		/**
		 * Load more categories
		 *
		 * @since 2.0.0
		 */
		add_action( 'wp_ajax_show_more', array( $this, 'show_more' ) );
		add_action( 'wp_ajax_nopriv_show_more', array( $this, 'show_more' ) );
	}

	/**
	 * @return mixed
	 *
	 * Instructor Registration Shortcode
	 *
	 * @since v.1.0.0
	 */
	public function student_registration_form() {
		ob_start();
		if ( is_user_logged_in() ) {
			tutor_load_template( 'dashboard.logged-in' );
		} else {
			tutor_load_template( 'dashboard.registration' );
		}
		return apply_filters( 'tutor/student/register', ob_get_clean() );
	}

	/**
	 * @return mixed
	 *
	 * Tutor Dashboard for students
	 *
	 * @since v.1.0.0
	 */
	public function tutor_dashboard() {
		global $wp_query;

		ob_start();
		if ( is_user_logged_in() ) {
			/**
			 * Added isset() Condition to avoid infinite loop since v.1.5.4
			 * This has cause error by others plugin, Such AS SEO
			 */

			if ( ! isset( $wp_query->query_vars['tutor_dashboard_page'] ) ) {
				tutor_load_template( 'dashboard', array( 'is_shortcode' => true ) );
			}
		} else {
			$login_url = tutor_utils()->get_option('enable_tutor_native_login', null, true, true) ? '' : wp_login_url(tutor()->current_url);
			echo sprintf( __('Please %sSign-In%s to view this page', 'tutor'), '<a data-login_url="'.$login_url.'" href="#" class="tutor-open-login-modal">', '</a>');
		}
		return apply_filters( 'tutor_dashboard/index', ob_get_clean() );
	}

	/**
	 * @return mixed
	 *
	 * Instructor Registration Shortcode
	 *
	 * @since v.1.0.0
	 */
	public function instructor_registration_form() {
		ob_start();
		if ( is_user_logged_in() ) {
			tutor_load_template( 'dashboard.instructor.logged-in' );
		} else {
			tutor_load_template( 'dashboard.instructor.registration' );
		}
		return apply_filters( 'tutor_dashboard/student/index', ob_get_clean() );
	}

	/**
	 * @return mixed
	 *
	 * Dashboard Menu Shortcode
	 *
	 * @since v.2.0.0
	 */
	public function tutor_dashboard_menu() {
		ob_start();
		if ( is_user_logged_in() ) {
			tutor_load_template( 'dashboard.dashboard-menu' );
		}
		return apply_filters( 'tutor_dashboard/header/menu', ob_get_clean() );
	}

	/**
	 * @param $atts
	 *
	 * @return string
	 *
	 * Shortcode for getting course
	 */
	public function tutor_course( $atts ) {
		$course_post_type = tutor()->course_post_type;

		$a = shortcode_atts(
			array(
				'post_type'   => $course_post_type,
				'post_status' => 'publish',

				'id'          => '',
				'exclude_ids' => '',
				'category'    => '',

				'orderby'     => 'ID',
				'order'       => 'DESC',
				'count'       => 6,
				'paged'       => get_query_var( 'paged' ) ? get_query_var( 'paged' ) : 1,
			),
			$atts
		);

		if ( ! empty( $a['id'] ) ) {
			$ids           = (array) explode( ',', $a['id'] );
			$a['post__in'] = $ids;
		}

		if ( ! empty( $a['exclude_ids'] ) ) {
			$exclude_ids       = (array) explode( ',', $a['exclude_ids'] );
			$a['post__not_in'] = $exclude_ids;
		}
		if ( ! empty( $a['category'] ) ) {
			$category = (array) explode( ',', $a['category'] );

			$a['tax_query'] = array(
				array(
					'taxonomy' => 'course-category',
					'field'    => 'term_id',
					'terms'    => $category,
					'operator' => 'IN',
				),
			);
		}
		$a['posts_per_page'] = (int) $a['count'];

		wp_reset_query();
		$the_query = new \WP_Query( $a );
		ob_start();

		$GLOBALS['the_custom_query'] = $the_query;

		$GLOBALS['tutor_shortcode_arg'] = array(
			'shortcode_enabled' => true,
			'include_course_filter' => isset( $atts['course_filter'] ) ? $atts['course_filter'] === 'on' : null,
			'column_per_row'        => isset( $atts['column_per_row'] ) ? $atts['column_per_row'] : null,
			'course_per_page'       => $a['posts_per_page'],
			'show_pagination'       => isset( $atts['show_pagination'] ) ? $atts['show_pagination'] : 'off',
		);

		tutor_load_template( 'shortcode.tutor-course' );
		$output = ob_get_clean();
		wp_reset_postdata();

		return $output;
	}

	private function prepare_instructor_list( $current_page, $atts, $cat_ids = array(), $keyword = '' ) {

		$limit         = (int) sanitize_text_field( tutor_utils()->array_get( 'count', $atts, 9 ) );
		$page          = $current_page - 1;
		$rating_filter = isset( $_POST['rating_filter'] ) ? $_POST['rating_filter'] : '';
		/**
		 * Short by Relevant | New | Popular
		 *
		 * @since v2.0.0
		 */
		$short_by = '';
		if ( isset( $_POST['short_by'] ) && $_POST['short_by'] === 'new' ) {
			$short_by = 'new';
		} elseif ( isset( $_POST['short_by'] ) && $_POST['short_by'] === 'popular' ) {
			$short_by = 'popular';
		} else {
			$short_by = 'ASC';
		}
		$instructors      = tutor_utils()->get_instructors( $limit * $page, $limit, $keyword, '', '', $short_by, 'approved', $cat_ids, $rating_filter );
		$next_instructors = tutor_utils()->get_instructors( $limit * $current_page, $limit, $keyword, '', '', $short_by, 'approved', $cat_ids, $rating_filter );

		$previous_page = $page > 0 ? $current_page - 1 : null;
		$next_page     = ( is_array( $next_instructors ) && count( $next_instructors ) > 0 ) ? $current_page + 1 : null;

		$layout = sanitize_text_field( tutor_utils()->array_get( 'layout', $atts, '' ) );
		$layout = in_array( $layout, $this->instructor_layout ) ? $layout : tutor_utils()->get_option( 'instructor_list_layout', $this->instructor_layout[0] );

		$payload = array(
			'instructors'   => is_array( $instructors ) ? $instructors : array(),
			'next_page'     => $next_page,
			'previous_page' => $previous_page,
			'column_count'  => sanitize_text_field( tutor_utils()->array_get( 'column_per_row', $atts, 3 ) ),
			'layout'        => $layout,
			'limit'         => $limit,
			'current_page'  => $current_page,
		);

		return $payload;
	}

	/**
	 * @param $atts
	 *
	 * @return string
	 *
	 * Shortcode for getting instructors
	 */
	public function tutor_instructor_list( $atts ) {
		global $wpdb;
		! is_array( $atts ) ? $atts = array() : 0;

		$current_page = (int) tutor_utils()->array_get( 'instructor-page', $_GET, 1 );
		$current_page = $current_page >= 1 ? $current_page : 1;

		$show_filter = isset( $atts['filter'] ) ? $atts['filter'] == 'on' : tutor_utils()->get_option( 'instructor_list_show_filter', false );

		// Get instructor list to sow
		$payload                = $this->prepare_instructor_list( $current_page, $atts );
		$payload['show_filter'] = $show_filter;

		ob_start();
		tutor_load_template( 'shortcode.tutor-instructor', $payload );
		$content = ob_get_clean();

		if ( $show_filter ) {
			$limit           = 8;
			$course_taxonomy = 'course-category';
			$course_cats     = $wpdb->get_results($wpdb->prepare(
				"SELECT * FROM {$wpdb->terms} AS term
				INNER JOIN {$wpdb->term_taxonomy} AS taxonomy
					ON taxonomy.term_id = term.term_id AND taxonomy.taxonomy = %s
				ORDER BY term.term_id DESC
				LIMIT %d",
				$course_taxonomy,
				$limit
			));

			$all_cats = $wpdb->get_var(
				$wpdb->prepare(
					" SElECT COUNT(*) as total FROM {$wpdb->terms} AS term
					INNER JOIN {$wpdb->term_taxonomy} AS taxonomy
						ON taxonomy.term_id = term.term_id AND taxonomy.taxonomy = %s
					ORDER BY term.term_id DESC
				",
					$course_taxonomy
				)
			);

			$attributes = $payload;
			unset( $attributes['instructors'] );

			$payload = array(
				'show_filter' => $show_filter,
				'content'     => $content,
				'categories'  => $course_cats,
				'all_cats'    => $all_cats,
				'attributes'  => array_merge( $atts, $attributes ),
			);

			ob_start();

			tutor_load_template( 'shortcode.instructor-filter', $payload );

			$content = ob_get_clean();
		}

		return $content;
	}

	/**
	 * Load more categories
	 * handle ajax request
	 *
	 * @package Instructor List
	 * @return string
	 * @since v2.0.0
	 */
	public function show_more() {
		global $wpdb;
		tutor_utils()->checking_nonce();
		$term_id         = isset( $_POST['term_id'] ) ? sanitize_text_field( $_POST['term_id'] ) : 0;
		$limit           = 8;
		$course_taxonomy = 'course-category';

		$remaining_categories = $wpdb->get_var(
			$wpdb->prepare(
				" SElECT COUNT(*) AS total FROM {$wpdb->terms} AS term
					INNER JOIN {$wpdb->term_taxonomy} AS taxonomy
						ON taxonomy.term_id = term.term_id AND taxonomy.taxonomy = %s
				WHERE term.term_id < %d
				ORDER BY term.term_id DESC
			",
				$course_taxonomy,
				$term_id
			)
		);

		$add_categories = $wpdb->get_results(
			$wpdb->prepare(
				" SElECT * FROM {$wpdb->terms} term
					INNER JOIN {$wpdb->term_taxonomy} as taxonomy
						ON taxonomy.term_id = term.term_id AND taxonomy.taxonomy = %s
				WHERE term.term_id < %d
				ORDER BY term.term_id DESC
				LIMIT %d
			",
				$course_taxonomy,
				$term_id,
				$limit
			)
		);
		$show_more      = false;
		if ( $remaining_categories > $limit ) {
			$show_more = true;
		}
		$response = array(
			'categories' => $add_categories,
			'show_more'  => $show_more,
			'remaining'  => $remaining_categories,
		);
		wp_send_json_success( $response );
		exit;
	}

	/**
	 * Filter instructor
	 */
	public function load_filtered_instructor() {
		tutor_utils()->checking_nonce();

		$_post 		  = tutor_sanitize_data($_POST);
		$attributes   = (array) tutor_utils()->array_get( 'attributes', $_post, array() );
		$current_page = (int) sanitize_text_field( tutor_utils()->array_get( 'current_page', $attributes, 1 ) );
		$keyword      = (string) sanitize_text_field( tutor_utils()->array_get( 'keyword', $_post, '' ) );

		$category = (array) tutor_utils()->array_get( 'category', $_post, array() );
		$category = array_filter(
			$category,
			function( $cat ) {
				return is_numeric( $cat );
			}
		);

		$payload = $this->prepare_instructor_list( $current_page, $attributes, $category, $keyword );

		tutor_load_template( 'shortcode.tutor-instructor', $payload );
		exit;
	}

	/**
	 * Show layout selection dashboard in instructor setting
	 */
	public function tutor_instructor_layout() {
		tutor_load_template( 'instructor-setting', array( 'templates' => $this->instructor_layout ) );
	}
}
