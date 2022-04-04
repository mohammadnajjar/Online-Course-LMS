<?php
/**
 * Template for displaying course tags
 *
 * @since v.1.0.0
 *
 * @author Themeum
 * @url https://themeum.com
 *
 * @package TutorLMS/Templates
 * @version 1.4.3
 */

do_action( 'tutor_course/single/before/tags' );

$course_tags = get_tutor_course_tags();
if(is_array($course_tags) && count($course_tags)){ ?>
    <div class="tutor-course-details-widget tutor-mt-40">
        <div class="widget-title tutor-m-0">
            <span class="tutor-color-black tutor-fs-6 tutor-fw-medium"><?php _e('Tags', 'tutor'); ?></span>
        </div>
        <div class="tutor-course-details-widget-tags tutor-pt-16">
          <ul class="tutor-tag-list">
                <?php
                    foreach ($course_tags as $course_tag){
                        $tag_link = get_term_link($course_tag->term_id);
                        echo "<li><a href='$tag_link'> $course_tag->name </a></li>";
                    }
                ?>
          </ul>
        </div>
    </div>
<?php
}

do_action( 'tutor_course/single/after/tags' ); ?>
