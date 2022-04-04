<?php
/**
 * Course progress template
 *
 * @package ETLMSCourseProgress
 */

$course_progress = tutor_utils()->get_course_completed_percent( get_the_ID(), 0, true );
$is_editor       = \Elementor\Plugin::instance()->editor->is_edit_mode();

if ( is_array( $course_progress ) && count( $course_progress ) ) : ?>
	<div class="tutor-course-progress-wrapper tutor-mb-30" style="width: 100%;">
		<span class="tutor-color-text-primary tutor-text-medium-h6">
			<?php echo esc_html( $settings['course_progress_title_text'], 'tutor' ); ?>
		</span>
		<div class="list-item-progress tutor-mt-16">
			<div class="text-regular-body tutor-color-text-subsued tutor-d-flex tutor-align-items-center tutor-justify-content-between">
				<span class="progress-steps">
					<?php echo esc_html( $is_editor ? 5 : $course_progress['completed_count'] ); ?>/
					<?php echo esc_html( $is_editor ? 10 : $course_progress['total_count'] ); ?>
				</span>
				<span class="progress-percentage"> 
					<?php echo esc_html( $is_editor ? '50%' : $course_progress['completed_percent'] . '%' ); ?>
					<?php esc_html_e( 'Complete', 'tutor' ); ?>
				</span>
			</div>
			<div class="progress-bar tutor-mt-12" style="--progress-value:<?php echo esc_attr( $is_editor ? '50' : $course_progress['completed_percent'] ); ?>%;">
				<span class="progress-value"></span>
			</div>
		</div>
	</div>
<?php endif; ?>
<?php
do_action( 'tutor_course/single/enrolled/after/lead_info/progress_bar' );
?>
