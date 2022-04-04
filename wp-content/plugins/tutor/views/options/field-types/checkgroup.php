<?php
/**
 * Checkgroup for settings.
 *
 * @package Tutor LMS
 * @since 2.0
 */

if ( ! empty( $field['group_options'] ) ) {
	$field_key = esc_attr( $field['key'] );
	$field_id  = esc_attr( 'field_' . $field_key );
	?>
	<div class="tutor-option-field-input" id="<?php echo esc_attr( $field_id ); ?>">
		<div class="type-toggle-grid">
			<?php
			foreach ( $field['group_options'] as $key => $option ) :
				$default      = isset( $option['default'] ) && 0 !== $option['default'] ? esc_attr( $option['default'] ) : 'off';
				$option_value = $this->get( $option['key'], $default );
				?>

				<div class="toggle-item">
					<label class="tutor-form-toggle">
						<input type="hidden" name="tutor_option[<?php echo esc_attr( $option['key'] ); ?>]" value="<?php echo esc_attr( $option_value ); ?>">
						<input type="checkbox" <?php checked( esc_attr( $option_value ), 'on' ); ?> class="tutor-form-toggle-input">
						<span class="tutor-form-toggle-control"></span>
						<span class="label-after"> <?php echo esc_attr( $option ['label'] ); ?> </span>
					</label>
					<div class="tooltip-wrap tooltip-icon">
						<span class="tooltip-txt tooltip-right"><?php echo esc_attr( $option ['desc'] ); ?></span>
					</div>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
<?php } ?>
