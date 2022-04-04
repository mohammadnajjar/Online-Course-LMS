<?php
/**
 * Tutor Ratings
 *
 * @package Ratings
 * @since v2.0.0
 */

namespace TUTOR;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
/**
 * Handle ratings related logics
 */
class Reviews {

	/**
	 * Handle actions & dependencies
	 *
	 * @since v2.0.0
	 */
	public function __construct() {
		/**
		 * Delete reviews action
		 */
		add_action( 'wp_ajax_tutor_delete_review', array( $this, 'delete_review' ) );
		add_action( 'wp_ajax_tutor_single_course_reviews_load_more', array($this, 'tutor_single_course_reviews_load_more') );
		add_action( 'wp_ajax_nopriv_tutor_single_course_reviews_load_more', array($this, 'tutor_single_course_reviews_load_more') );
	}

	/**
	 * Handle ajax request for deleting review
	 *
	 * @since v2.0.0
	 */
	public function delete_review() {
		tutor_utils()->checking_nonce();
		$review_id = isset( $_POST['id'] ) ? sanitize_text_field( $_POST['id'] ) : '';
		$delete    = self::delete( $review_id );
		wp_send_json( $delete );
		exit;
	}

	/**
	 * Delete review
	 *
	 * @param int $id review id required.
	 * @return bool true or false.
	 * @since v2.0.0
	 */
	public static function delete( int $id ): bool {
		$id = sanitize_text_field( $id );
		global $wpdb;
		$comment_table = $wpdb->comments;
		$delete        = $wpdb->delete(
			$comment_table,
			array(
				'comment_ID' => $id,
			)
		);
		return $delete ? true : false;
	}

	public function tutor_single_course_reviews_load_more() {
		tutor_utils()->checking_nonce();

		ob_start();
		tutor_load_template( 'single.course.reviews' );
		$html = ob_get_clean();

		wp_send_json_success( array('html' => $html) );
	}
}
