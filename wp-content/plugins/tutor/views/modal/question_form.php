<?php
global $wpdb;
$settings = maybe_unserialize($question->question_settings);
?>

<div id="tutor-quiz-question-wrapper" data-question-id="<?php echo $question_id; ?>">
    <div class="question-form-header tutor-mb-12">
        <a href="javascript:;" class="back-to-quiz-questions-btn tutor-back-btn" data-quiz-id="<?php echo isset($quiz_id) ? $quiz_id : ''; ?>" data-topic-id="<?php echo isset($topic_id) ? $topic_id : ''; ?>">
            <span class="tutor-icon-previous-line tutor-color-design-dark"></span>
            <span class="text text tutro-text-regular-caption tutor-color-black"><?php _e('Back', 'tutor'); ?></span>
        </a>
    </div>
    <input type="hidden" name="quiz_id" value="<?php echo $quiz_id; ?>" />

    <!-- Question title -->
    <div class="tutor-mb-32">
        <label class="tutor-form-label"><?php _e('Write your question here', 'tutor'); ?></label>
        <div class="tutor-input-group tutor-mb-16">
            <input type="text" name="tutor_quiz_question[<?php echo $question_id; ?>][question_title]" class="tutor-form-control" placeholder="<?php _e('Type your question here', 'tutor'); ?>" value="<?php echo htmlspecialchars(stripslashes($question->question_title)); ?>">
        </div>
    </div>

    <!-- Question Type Dropdown -->
    <div class="tutor-mb-32">
        <label class="tutor-form-label"><?php _e('Select your question type', 'tutor'); ?></label>
        <div class="tutor-input-group tutor-mb-16">
            <div class="tutor-w-100">
                <div class="tutor-row tutor-align-items-center">
                    <div class="tutor-col-12 tutor-col-md-12">
                        <div class="question-type-select">
                            <?php
                            $question_types = tutor_utils()->get_question_types();
                            $current_type = $question->question_type ? $question->question_type : 'true_false';
                            ?>

                            <div class="select-header">
                                <span class="lead-option">
                                    <?php echo $question_types[$current_type]['icon'];
                                    echo $question_types[$current_type]['name']; ?> 
                                </span>
                                <span class="select-dropdown">
                                    <i class="tutor-icon-icon-light-down-line tutor-icon-18"></i> 
                                </span>
                                <input type="hidden" class="tutor_select_value_holder" name="tutor_quiz_question[<?php echo $question_id; ?>][question_type]" value="<?php echo $question->question_type; ?>">
                            </div>

                            <div class="tutor-select-options" style="display: none;">
                                <?php
                                $has_tutor_pro = tutor()->has_pro;

                                foreach ($question_types as $type => $question_type) {
                                ?>
                                    <p class="tutor-select-option" data-value="<?php echo $type; ?>" <?php echo $question->question_type === $type ? ' data-selected="selected"' : ''; ?> data-is-pro="<?php echo (!$has_tutor_pro &&  $question_type['is_pro']) ? 'true' : 'false' ?>">
                                        <?php echo $question_type['icon'] . ' ' . $question_type['name']; ?>

                                        <?php
                                        if (!$has_tutor_pro && $question_type['is_pro']) {
                                            $svg_lock = '<svg width="12" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M11.667 6h-1V4.667A4.672 4.672 0 0 0 6 0a4.672 4.672 0 0 0-4.667 4.667V6h-1A.333.333 0 0 0 0 6.333v8.334C0 15.402.598 16 1.333 16h9.334c.735 0 1.333-.598 1.333-1.333V6.333A.333.333 0 0 0 11.667 6zm-4.669 6.963a.334.334 0 0 1-.331.37H5.333a.333.333 0 0 1-.331-.37l.21-1.89A1.319 1.319 0 0 1 4.667 10c0-.735.598-1.333 1.333-1.333S7.333 9.265 7.333 10c0 .431-.204.824-.545 1.072l.21 1.891zM8.667 6H3.333V4.667A2.67 2.67 0 0 1 6 2a2.67 2.67 0 0 1 2.667 2.667V6z" fill="#E2E2E2" fill-rule="nonzero"/></svg>';
                                            printf("<span class='question-type-pro' title='%s'>%s</span>", __('Pro version required', 'tutor'), $svg_lock);
                                        }
                                        ?>
                                    </p>
                                <?php
                                }
                                ?>
                            </div>
                        </div>
                    </div>
                    <div class="tutor-col-12 tutor-col-md-12 tutor-mt-20">
                        <div class="tutor-row tutor-align-items-center">
                            <div class="tutor-col-sm-4 tutor-col-md-4 tutor-mt-4 tutor-mb-4">
                                <label class="tutor-form-toggle tutor-text-nowrap">
                                    <input type="checkbox" class="tutor-form-toggle-input" value="1" name="tutor_quiz_question[<?php echo $question_id; ?>][answer_required]" <?php checked('1', tutor_utils()->avalue_dot('answer_required', $settings)); ?> />
                                    <span class="tutor-form-toggle-control"></span> <?php _e('Answer Required', 'tutor'); ?>
                                </label>
                            </div>
                            <div class="tutor-col-sm-4 tutor-col-md-4 tutor-mt-4 tutor-mb-4">
                                <label class="tutor-form-toggle tutor-text-nowrap">
                                    <input type="checkbox" class="tutor-form-toggle-input" value="1" name="tutor_quiz_question[<?php echo $question_id; ?>][randomize_question]" <?php checked('1', tutor_utils()->avalue_dot('randomize_question', $settings)); ?> />
                                    <span class="tutor-form-toggle-control"></span> <?php _e('Randomize', 'tutor'); ?>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Points for the question -->
    <div class="tutor-mb-32">
        <label class="tutor-form-label"><?php _e('Point(s) for this answer', 'tutor'); ?></label>
        <div class="tutor-input-group tutor-mb-16">
            <div class="tutor-row tutor-align-items-center">
                <div class="tutor-col-sm-6 tutor-col-md-4">
                    <input type="text" name="tutor_quiz_question[<?php echo $question_id; ?>][question_mark]" class="tutor-form-control" placeholder="<?php _e('set the mark ex. 10', 'tutor'); ?>" value="<?php echo $question->question_mark; ?>">
                </div>
                <div class="tutor-col-sm-6 tutor-col-md-4 tutor-mt-4 tutor-mb-4">
                    <label class="tutor-form-toggle tutor-text-nowrap">
                        <input type="checkbox" class="tutor-form-toggle-input" value="1" name="tutor_quiz_question[<?php echo $question_id; ?>][show_question_mark]" <?php checked('1', tutor_utils()->avalue_dot('show_question_mark', $settings)); ?> />
                        <span class="tutor-form-toggle-control"></span> <?php _e('Display Points', 'tutor'); ?>
                    </label>
                </div>
            </div>
        </div>
    </div>

    <!-- Question description -->
    <div class="tutor-mb-32">
        <label class="tutor-form-label"><?php _e('Description', 'tutor'); ?> <span>(<?php _e('Optional', 'tutor'); ?>)</span></label>
        <div class="tutor-input-group tutor-mb-16">
            <textarea name="tutor_quiz_question[<?php echo $question_id; ?>][question_description]" class="tutor-form-control"><?php echo stripslashes($question->question_description); ?></textarea>
        </div>
    </div>

    <div class="tutor-mb-16">
        <label class="tutor-form-label">
            <?php _e('Input options for the question and select the correct answer.', 'tutor'); ?>
        </label>
    </div>

    <div id="tutor_quiz_builder_answer_wrapper">
        <?php
        $question_type = $question->question_type;
        $question_id = $question_id;

        require __DIR__ . '/question_answer_list.php';
        ?>
    </div>
</div>