<?php
/*
 if ( empty( $field['options'] ) ) {
	$default = isset( $field['default'] ) ? $field['default'] : '';
	$option_value = $this->get( $field['field_key'], $default );
	$label_title = isset( $field['label_title'] ) ? sanitize_text_field( $field['label_title'] ) : sanitize_text_field( $field['label'] );
	?>
	<label>
		<input type="checkbox" name="tutor_option[<?php echo esc_attr( $field['field_key'] ) ?>]" value="1" <?php checked($option_value, '1') ?> />
		<?php echo esc_html( $label_title ); ?>
	</label>
	<?php
} else {
	// Check if multi option exists
	foreach ( $field['options'] as $field_option_key => $field_option ) {
		?>
		<label>
			<input type="checkbox" name="tutor_option[<?php echo esc_attr( $field['field_key'] ); ?>][<?php echo esc_attr( $field_option_key ); ?>]" value="1" <?php checked($this->get($field['field_key'].'.'.$field_option_key), '1') ?> />
			<?php echo esc_html( $field_option ); ?>
		</label>
		<br />
		<?php
	}
} */
?><label class="tutor-form-toggle">
	<span class="label-before"> Logged Only </span>
	<input type="checkbox" class="tutor-form-toggle-input" />
	<span class="tutor-form-toggle-control"></span>
</label>
