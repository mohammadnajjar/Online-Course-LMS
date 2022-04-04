<?php
/**
 * Template for displaying course benefits
 *
 * @since v.1.0.0
 *
 * @author Themeum
 * @url https://themeum.com
 *
 * @package TutorLMS/Templates
 * @version 1.4.3
 */



do_action( 'tutor_course/single/before/benefits' );


$course_benefits = tutor_course_benefits();
if ( empty( $course_benefits ) ) {
	return;
}
?>

<?php if (is_array($course_benefits) && count($course_benefits)): ?>
	<div class="tutor-course-details-widget tutor-course-details-widget-col-2 tutor-mt-lg-50 tutor-mt-32">
		<div class="tutor-course-details-widget-title tutor-mb-16">
			<span class="tutor-color-black tutor-fs-6 tutor-fw-medium">
				<?php echo esc_html( apply_filters( 'tutor_course_benefit_title', __( 'What Will I Learn?', 'tutor' ) ) ); ?>
			</span>
		</div>
		<ul class="tutor-course-details-widget-list tutor-m-0 tutor-mt-16">
			<?php foreach ($course_benefits as $benefit): ?>
				<li class="tutor-d-flex tutor-color-black tutor-fs-6 tutor-fw-normal tutor-mb-12">
					<span class="tutor-icon-mark-filled tutor-color-design-brand tutor-mr-4"></span>
					<span><?php echo $benefit; ?></span>
				</li>
			<?php endforeach; ?>
		</ul>
	</div>
<?php endif; ?>

<?php do_action('tutor_course/single/after/benefits'); ?>
