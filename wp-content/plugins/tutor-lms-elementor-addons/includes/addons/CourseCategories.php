<?php
/**
 * Course Categories Addon
 *
 * @since 1.0.0
 */

namespace TutorLMS\Elementor\Addons;

use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/**
 * Course Categories addons
 * Handle all categories addon controls
 */
class CourseCategories extends BaseAddon {

	use \TutorLMS\Elementor\AddonsTrait;

	/**
	 * Layout prefix class
	 *
	 * @var $prefix_class_layout
	 */
	private static $prefix_class_layout = 'elementor-layout-';

	/**
	 * Alignment prefix class
	 *
	 * @var $prefix_class_alignment
	 */
	private static $prefix_class_alignment = 'elementor-align-';

	/**
	 * Categories label
	 */
	public function get_title() {
		return __( 'Course Categories', 'tutor-lms-elementor-addons' );
	}

	/**
	 * Register addon controls
	 */
	protected function register_content_controls() {
		// layout.
		$this->start_controls_section(
			'course_category_content_settings',
			array(
				'label' => __( 'General Settings', 'tutor-lms-elementor-addons' ),
				'tab'   => Controls_Manager::TAB_CONTENT,

			)
		);

		$this->add_responsive_control(
			'course_category_layout',
			// layout options.
			array(
				'label'        => __( 'Layout', 'tutor-lms-elementor-addons' ),
				'type'         => \Elementor\Controls_Manager::CHOOSE,
				'options'      => array(
					'row'    => array(
						'title' => __( 'Left', 'tutor-lms-elementor-addons' ),
						'icon'  => 'eicon-h-align-left',
					),
					'column' => array(
						'title' => __( 'Up', 'tutor-lms-elementor-addons' ),
						'icon'  => 'eicon-v-align-top',
					),
				),
				'prefix_class' => self::$prefix_class_layout . '%s',
				'default'      => 'row',
				'toggle'       => false,
				'selectors'    => array(
					'{{WRAPPER}} .etlms-single-course-meta-categories' => 'flex-direction: {{VALUE}};',
				),
				'return_value' => 'yes',
			)
		);
		$this->add_responsive_control(
			'course_category_alignment',
			// alignment.
			array(
				'label'        => __( 'Alignment', 'tutor-lms-elementor-addons' ),
				'type'         => \Elementor\Controls_Manager::CHOOSE,
				'options'      => array(
					'flex-start' => array(
						'title' => __( 'Left', 'tutor-lms-elementor-addons' ),
						'icon'  => 'eicon-text-align-left',
					),
					'center'     => array(
						'title' => __( 'Center', 'tutor-lms-elementor-addons' ),
						'icon'  => 'eicon-text-align-center',
					),
					'flex-end'   => array(
						'title' => __( 'Right', 'tutor-lms-elementor-addons' ),
						'icon'  => 'eicon-text-align-right',
					),
				),
				'prefix_class' => self::$prefix_class_alignment . '%s',
				'default'      => 'flex-start',
				'selectors'    => array(
					'.elementor-layout-row .etlms-single-course-meta-categories' => 'justify-content: {{VALUE}};',
					'.elementor-layout-column .etlms-single-course-meta-categories' => 'align-items: {{VALUE}};',
				),
			)
		);

		$this->add_responsive_control(
			'course_category_gap',
			// array(
			// 'label'      => __( 'Gap', 'tutor-lms-elementor-addons' ),
			// 'type'       => Controls_Manager::SLIDER,
			// 'size_units' => array( 'px' ),
			// 'range'      => array(
			// 'px' => array(
			// 'min' => 0,
			// 'max' => 50,

			// ),
			// ),
			// 'prefix_class' => 'etlms-course-category-gap-',
			// 'default'    => array(
			// 'unit' => 'px',
			// 'size' => 10,
			// ),
			// 'selectors'  => array(
			// '.elementor-layout-row .etlms-single-course-meta-categories' => 'column-gap: {{VALUE}}{{UNIT}};',
			// '.elementor-layout-column .etlms-single-course-meta-categories' => 'row-gap: {{VALUE}}{{UNIT}};',
			// ),
			// )
			array(
				'label'      => __( 'Gap', 'tutor-lms-elementor-addons' ),
				'type'       => \Elementor\Controls_Manager::SLIDER,
				'size_units' => array( 'px', '%' ),
				'range'      => array(
					'px' => array(
						'min'  => 0,
						'max'  => 100,
						'step' => 1,
					),
					'%'  => array(
						'min' => 0,
						'max' => 100,
					),
				),
				'default'    => array(
					'unit' => 'px',
					'size' => 10,
				),
				'selectors'  => array(
					'.elementor-layout-row .etlms-single-course-meta-categories' => 'column-gap: {{SIZE}}{{UNIT}};',
					'.elementor-layout-column .etlms-single-course-meta-categories' => 'row-gap: {{SIZE}}{{UNIT}};',
				),
			)
		);
		$this->end_controls_section();
	}

	protected function register_style_controls() {
		$selector       = '{{WRAPPER}} .etlms-single-course-meta-categories a';
		$label_selector = '{{WRAPPER}} .etlms-single-course-meta-categories span';
		$this->start_controls_section(
			'course_categories_style_section',
			array(
				'label' => __( 'Style', 'tutor-lms-elementor-addons' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);
		// * Start Tabs */
		$this->start_controls_tabs( 'course_thumbnail_style_tabs' );
			/* Normal Tab */
			$this->start_controls_tab(
				'course_categories_normal_style_tab',
				array(
					'label' => __( 'Normal', 'tutor-lms-elementor-addons' ),
				)
			);
				// label controls.
				$this->add_control(
					'course_categories_label_color',
					array(
						'label'     => __( 'Label Color', 'tutor-lms-elementor-addons' ),
						'type'      => Controls_Manager::COLOR,
						'selectors' => array(
							$label_selector => 'color: {{VALUE}};',
						),
					)
				);
				$this->add_group_control(
					Group_Control_Typography::get_type(),
					array(
						'name'     => 'course_categories_label_typo',
						'label'    => __( 'Label ypography', 'tutor-lms-elementor-addons' ),
						'selector' => $label_selector,
					)
				);
				// value controls.
				$this->add_control(
					'course_categories_original_color',
					array(
						'label'     => __( 'Value Color', 'tutor-lms-elementor-addons' ),
						'type'      => Controls_Manager::COLOR,
						'selectors' => array(
							$selector => 'color: {{VALUE}}',
						),
					)
				);
				$this->add_group_control(
					Group_Control_Typography::get_type(),
					array(
						'name'     => 'course_categories_original_typo',
						'label'    => __( 'Typography', 'tutor-lms-elementor-addons' ),
						'selector' => $selector,
					)
				);
			$this->end_controls_tab();

			/* Hovered Icon */
			$this->start_controls_tab(
				'course_categories_hover_style_tab',
				array(
					'label' => __( 'Hover', 'tutor-lms-elementor-addons' ),
				)
			);
				// label hover controls.
				$this->add_control(
					'course_categories_label_hovered_color',
					array(
						'label'     => __( 'Label Color', 'tutor-lms-elementor-addons' ),
						'type'      => Controls_Manager::COLOR,
						'selectors' => array(
							$label_selector . ':hover' => 'color: {{VALUE}};',
						),
					)
				);
				$this->add_group_control(
					Group_Control_Typography::get_type(),
					array(
						'name'     => 'course_categories_label_hovered_typo',
						'label'    => __( 'Label Typography', 'tutor-lms-elementor-addons' ),
						'selector' => $label_selector . ':hover',
					)
				);

				// value controls.
				$this->add_control(
					'course_categories_hovered_color',
					array(
						'label'     => __( 'Value Color', 'tutor-lms-elementor-addons' ),
						'type'      => Controls_Manager::COLOR,
						'selectors' => array(
							$selector . ':hover' => 'color: {{VALUE}}',
						),
					)
				);
				$this->add_group_control(
					Group_Control_Typography::get_type(),
					array(
						'name'     => 'course_categories_hovered_typo',
						'label'    => __( 'Value Typography', 'tutor-lms-elementor-addons' ),
						'selector' => $selector . ':hover',
					)
				);
				$this->end_controls_tab();
			$this->end_controls_tabs();

		$this->end_controls_section();
	}

	/**
	 * Render addon, responsible for the editor and front end view
	 */
	protected function render() {
		$course            = etlms_get_course();
		$settings          = $this->get_settings_for_display();
		$course_categories = array();
		if ( $course ) {
			$course_categories = get_tutor_course_categories();
		}
		if ( is_array( $course_categories ) && count( $course_categories ) ) {
			$item = 1;
			?>
			<div class="etlms-single-course-meta-categories tutor-d-flex">
				<div>
					<span class="text-regular-body tutor-color-text-hints">
						<?php esc_html_e( 'Categories:' ); ?>
					</span>
				</div>
				<div>
				<?php
				foreach ( $course_categories as $course_category ) :
					$category_name = $course_category->name;
					$category_link = get_term_link( $course_category->term_id );
					$comma         = ( $item < count( $course_categories ) ) ? ',' : '';
					$item++;
					?>
					<a href="<?php echo esc_url( $category_link ); ?>">
						<?php echo esc_html( $category_name . $comma ); ?>
					</a>
				<?php endforeach; ?>
				</div>
			</div>
			<?php
		} else {
			if ( $this->is_elementor_editor() ) {
				esc_html_e( 'Please add category from Tutor course builder', 'tutor-lms-elementor-addons' );
			}
		}
	}

}
