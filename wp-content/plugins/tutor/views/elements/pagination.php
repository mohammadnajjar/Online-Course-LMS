<?php

/**
 * Global Pagination Template for Backend Pages
 *
 * @package Pagination
 * @since v2.0.0
 */

if (isset($data['total_items']) && $data['total_items']) : ?>
	<nav class="tutor-ui-pagination tutor-ui-pagination-<?php echo is_admin() ? 'wp' : 'fd'; ?>">
		<div classs="tutor-pagination-hints">
			<div class="text-regular-caption tutor-color-black-60">
				<?php esc_html_e('Page', 'tutor'); ?>
				<span class="tutor-fs-7 tutor-fw-medium tutor-color-black">
					<?php echo esc_html($data['paged']); ?>
				</span>
				<?php esc_html_e('of', 'tutor'); ?>
				<span class="tutor-fs-7 tutor-fw-medium tutor-color-black">
					<?php echo esc_html(ceil(0 < $data['per_page']) ? ceil($data['total_items'] / $data['per_page']) : ''); ?>
				</span>
			</div>
		</div>
		<ul class="tutor-pagination-numbers">
			<?php
			// Pagination.
			$paged    = $data['paged'];
			$per_page = (int)$data['per_page'];
			$big      = 999999999;
			$base     = str_replace($big, '%#%', esc_url(admin_url($big) . 'admin.php?paged=%#%'));

			echo paginate_links(
				array(
					'base'      => !empty($data['base']) ? $data['base'] : $base,
					'format'    => '?paged=%#%',
					'current'   => $paged,
					'total'     => $per_page ? ceil($data['total_items'] / $per_page) : 1,
					'prev_text' => '<span class="tutor-icon-angle-left-filled"></span>',
					'next_text' => '<span class="tutor-icon-angle-right-filled"></span>',
				)
			);
			?>
		</ul>
	</nav>
<?php endif; ?>