<?php
/**
 * Course About
 *
 * @since 1.0.0
 */

namespace TutorLMS\Elementor\Addons;

use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

class CourseAbout extends BaseAddon {

	use \TutorLMS\Elementor\AddonsTrait;

	private static $prefix_class_layout    = 'elementor-layout-';
	private static $prefix_class_alignment = 'elementor-align-';

	public function get_title() {
		return __( 'Course About', 'tutor-lms-elementor-addons' );
	}

	protected function register_content_controls() {

		$this->start_controls_section(
			'course_about_content_section',
			array(
				'label' => 'General Settings',
				'tab'   => Controls_Manager::TAB_CONTENT,
			)
		);

		$this->add_control(
			'about_section_title_text',
			array(
				'label'       => __( 'Title', 'tutor-lms-elementor-addons' ),
				'type'        => Controls_Manager::TEXTAREA,
				'default'     => __( 'About Course', 'tutor-lms-elementor-addons' ),
				'placeholder' => __( 'Type your title here', 'tutor-lms-elementor-addons' ),
				'rows'        => 3,
			)
		);

		$this->add_responsive_control(
			'course_about_align',
			$this->etlms_align_with_justify()
		);

		$this->end_controls_section();
	}

	protected function register_style_controls() {
		$paragraph_selector  = '{{WRAPPER}} .showmore-text';
		$short_text_selector = '{{WRAPPER}} .showmore-short-text';
		$heading_selector    = '{{WRAPPER}} .tutor-showmore-content .text-medium-h6';

		/* Heading Section */
		$this->start_controls_section(
			'course_about_heading_section',
			array(
				'label' => __( 'Heading', 'tutor-lms-elementor-addons' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);
		$this->add_control(
			'course_about_heading_color',
			array(
				'label'     => __( 'Color', 'tutor-lms-elementor-addons' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					$heading_selector => 'color: {{VALUE}};',
				),
				'default'   => '#161616',
			)
		);
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'course_about_heading_typo',
				'label'    => __( 'Typography', 'tutor-lms-elementor-addons' ),
				'selector' => $heading_selector,
			)
		);

		$this->add_responsive_control(
			'etlms_heading_gap',
			array(
				'label'      => __( 'Gap', 'tutor-lms-elementor-addons' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array(
					'px' => array(
						'min' => 0,
						'max' => 50,
					),
				),
				'selectors'  => array(
					$heading_selector => 'margin-bottom: {{SIZE}}{{UNIT}};',
				),
				'default'    => array(
					'size' => 10,
				),
			)
		);

		$this->end_controls_section();

		// short text controls start.
		$this->start_controls_section(
			'course_about_short_text_section',
			array(
				'label' => __( 'Short Text', 'tutor-lms-elementor-addons' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);
		$this->add_control(
			'course_about_short_text_color',
			array(
				'label'     => __( 'Color', 'tutor-lms-elementor-addons' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					$short_text_selector => 'color: {{VALUE}}',
				),
			)
		);
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'course_about_short_text_typo',
				'label'    => __( 'Typography', 'tutor-lms-elementor-addons' ),
				'selector' => $short_text_selector,
			)
		);
		$this->end_controls_section();
		// short text controls end.
		/* Paragraph  Section */
		$this->start_controls_section(
			'course_about_paragraph_section',
			array(
				'label' => __( 'Full Text', 'tutor-lms-elementor-addons' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);
		$this->add_control(
			'course_about_paragraph_color',
			array(
				'label'     => __( 'Color', 'tutor-lms-elementor-addons' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					$paragraph_selector => 'color: {{VALUE}}',
				),
			)
		);
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'course_about_paragraph_typo',
				'label'    => __( 'Typography', 'tutor-lms-elementor-addons' ),
				'selector' => $paragraph_selector,
			)
		);
		$this->end_controls_section();
	}

	protected function render( $instance = array() ) {
		$disable_about = (bool) get_tutor_option( 'disable_course_about' );

		if ( $disable_about ) {
			if ( \Elementor\Plugin::instance()->editor->is_edit_mode() ) {
				echo __( 'Please enable course about from tutor settings', 'tutor-lms-elementor-addons' );
			}
			return;
		}

		$course = etlms_get_course();
		if ( $course ) {
			ob_start();
			$settings = $this->get_settings_for_display();
			include etlms_get_template( 'course/about' );
			echo ob_get_clean();
		}
	}
}
