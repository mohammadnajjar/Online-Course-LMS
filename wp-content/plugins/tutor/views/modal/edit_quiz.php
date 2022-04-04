<input type="hidden" name="quiz_id" value="<?php echo $quiz_id; ?>"/>
<div id="quiz-builder-tab-quiz-info">
    <div class="tutor-mb-32">
        <label class="tutor-form-label"><?php _e('Quiz Title', 'tutor'); ?></label>
        <div class="tutor-input-group tutor-mb-16">
            <input type="text" name="quiz_title" class="tutor-form-control tutor-mb-12" placeholder="<?php _e('Type your quiz title here', 'tutor'); ?>" value="<?php echo $quiz ? htmlspecialchars( stripslashes($quiz->post_title) ) : ''; ?>"/>
        </div>
    </div>
    <div>
        <label class="tutor-form-label"><?php _e('Summary', 'tutor'); ?></label>
        <div class="tutor-input-group tutor-mb-16">
            <textarea name="quiz_description" class="tutor-form-control tutor-mb-12" rows="5"><?php echo $quiz ? stripslashes($quiz->post_content) : ''; ?></textarea>
        </div>
    </div>
    <?php do_action('tutor_quiz_edit_modal_info_tab_after', $quiz) ?>
</div>

<div id="quiz-builder-tab-questions" class="quiz-builder-tab-container">
    <div class="quiz-builder-questions-wrap">
        <?php
        $questions = ($quiz_id && $quiz_id>0) ? tutor_utils()->get_questions_by_quiz($quiz_id) : array();

        if ($questions) {
            foreach ($questions as $question) {
                $id_target = 'quiz-popup-menu-' . $question->question_id;
                ?>
                <div class="tutor-quiz-item quiz-builder-question-wrap" data-question-id="<?php echo $question->question_id; ?>">
                    <div class="tutor-quiz-item-label">
                        <span class="tutor-quiz-item-draggable tutor-icon-drag-line tutor-icon-24 question-sorting"></span>
                        <h6 class="tutor-quiz-item-name">
                            <?php echo stripslashes($question->question_title); ?>
                        </h6>
                    </div>
                    <div class="tutor-quiz-item-action tutor-align-items-center">
                        <div class="tutor-quiz-item-type">
                            <?php
                                $type = tutor_utils()->get_question_types($question->question_type);
                                echo $type['icon'] . ' ' . $type['name'];
                            ?>
                        </div>
                        <div class="tutor-popup-opener">
                            <button type="button" class="popup-btn" data-tutor-popup-target="<?php echo $id_target; ?>">
                                <span class="toggle-icon"></span>
                            </button>
                            <ul class="popup-menu" id="<?php echo $id_target; ?>">
                                <li>
                                    <a href="#" class="tutor-quiz-open-question-form" data-question-id="<?php echo $question->question_id; ?>">
                                        <span class="tutor-icon-edit-filled tutor-icon-24 tutor-mr-4 tutor-color-design-white"></span>
                                        <span class="text-regular-body tutor-color-white"><?php _e('Edit', 'tutor'); ?></span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="tutor-quiz-question-trash" data-question-id="<?php echo $question->question_id; ?>">
                                        <span class="tutor-icon-delete-fill-filled tutor-icon-24 tutor-mr-4 tutor-color-design-white"></span>
                                        <span class="text-regular-body tutor-color-white"><?php _e('Delete', 'tutor'); ?></span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <?php
            }
        }
        ?>
    </div>

    <div class="">
        <a href="javascript:;" class="tutor-quiz-open-question-form tutor-btn tutor-is-outline tutor-is-sm">
            <i class="tutor-icon-plus-square-filled tutor-icon-24 tutor-mr-12"></i>
            <?php _e('Add Question', 'tutor'); ?>
        </a>
    </div>
</div>

<div id="quiz-builder-tab-settings" class="quiz-builder-tab-container">
    <div class="tutor-mb-32">
        <label class="tutor-form-label"><?php _e('Time Limit', 'tutor'); ?></label>
        <div class="tutor-input-group">
            <div class="tutor-row tutor-align-items-center">
                <div class="tutor-col-sm-4 tutor-col-md-3">
                    <input type="number" class="tutor-form-control" min="0" name="quiz_option[time_limit][time_value]" value="<?php echo tutor_utils()->get_quiz_option($quiz_id, 'time_limit.time_value', 0) ?>">
                </div>
                <div class="tutor-col-sm-5 tutor-col-md-4">
                    <?php $limit_time_type = tutor_utils()->get_quiz_option($quiz_id, 'time_limit.time_type', 'minutes') ?>
                    <select name="quiz_option[time_limit][time_type]" class="tutor-form-select">
                        <option value="seconds" <?php selected('seconds', $limit_time_type); ?>><?php _e('Seconds', 'tutor'); ?></option>
                        <option value="minutes" <?php selected('minutes', $limit_time_type); ?>><?php _e('Minutes', 'tutor'); ?></option>
                        <option value="hours" <?php selected('hours', $limit_time_type); ?>><?php _e('Hours', 'tutor'); ?></option>
                        <option value="days" <?php selected('days', $limit_time_type); ?>><?php _e('Days', 'tutor'); ?></option>
                        <option value="weeks" <?php selected('weeks', $limit_time_type); ?>><?php _e('Weeks', 'tutor'); ?></option>
                    </select>
                </div>
                <div class="tutor-col-sm-12 tutor-col-md-5 tutor-mt-4 tutor-mb-4">
                    <label class="tutor-form-toggle">
                        <input type="checkbox" class="tutor-form-toggle-input" value="1" name="quiz_option[hide_quiz_time_display]" <?php checked('1', tutor_utils()->get_quiz_option($quiz_id, 'hide_quiz_time_display')); ?> />
                        <span class="tutor-form-toggle-control"></span> <?php _e('Hide quiz time - display', 'tutor'); ?>
                    </label>
                </div>
            </div>
            <p class="text-regular-small tutor-color-muted tutor-mt-12">
                <?php _e('Time limit for this quiz. 0 means no time limit.', 'tutor'); ?>
            </p>
        </div>
    </div>

    <div class="tutor-mb-32">
        <label class="tutor-form-label"><?php _e('Quiz Feedback Mode', 'tutor'); ?></label>
        <div class="tutor-input-group">
            <div class="text-regular-small tutor-color-muted tutor-mb-12">
                (<?php _e('Pick the quiz system"s behaviour on choice based questions.', 'tutor'); ?>)
            </div>

            <label class="tutor-radio-select tutor-bg-white tutor-mb-8">
                <input class="tutor-form-check-input" type="radio" name="quiz_option[feedback_mode]" value="default" <?php checked('default', tutor_utils()->get_quiz_option($quiz_id, 'feedback_mode')); ?>>
                <div class="tutor-radio-select-content">
                    <span class="tutor-radio-select-title"><?php _e('Default', 'tutor'); ?></span>
                    <?php _e('Answers shown after quiz is finished', 'tutor'); ?>
                </div>
            </label>

            <label class="tutor-radio-select tutor-bg-transparent tutor-my-8">
                <input class="tutor-form-check-input" type="radio" name="quiz_option[feedback_mode]" value="retry" <?php checked('retry', tutor_utils()->get_quiz_option($quiz_id, 'feedback_mode')); ?>>
                <div class="tutor-radio-select-content">
                    <span class="tutor-radio-select-title"><?php _e('Retry Mode', 'tutor'); ?></span>
                    <?php _e('Unlimited attempts on each question.', 'tutor'); ?>
                </div>
            </label>

            <label class="tutor-radio-select tutor-bg-transparent tutor-my-8">
                <input class="tutor-form-check-input" type="radio" name="quiz_option[feedback_mode]" value="reveal" <?php checked('reveal', tutor_utils()->get_quiz_option($quiz_id, 'feedback_mode')); ?>>
                <div class="tutor-radio-select-content">
                    <span class="tutor-radio-select-title"><?php _e('Reveal Mode', 'tutor'); ?></span>
                    <?php _e('Show result after the attempt.', 'tutor'); ?>
                </div>
            </label>
        </div>
    </div>
    
    <div class="tutor-mb-32 tutor-quiz-slider">
        <label class="tutor-form-label"><?php _e('Attempts Allowed', 'tutor'); ?></label>
        <div class="tutor-input-group">
            <?php
                $default_attempts_allowed = tutor_utils()->get_option('quiz_attempts_allowed');
                $attempts_allowed = (int) tutor_utils()->get_quiz_option($quiz_id, 'attempts_allowed', $default_attempts_allowed);
            ?>
            <div class="tutor-field-type-slider tutor-p-0" data-min="0" data-max="20">
                <p class="tutor-field-type-slider-value"><?php echo $attempts_allowed; ?></p>
                <div class="tutor-field-slider"></div>
                <input type="hidden" value="<?php echo $attempts_allowed; ?>" name="quiz_option[attempts_allowed]" />
            </div>
            <p class="tutor-input-feedback">
                <?php _e('Restriction on the number of attempts a student is allowed to take for this quiz. 0 for no limit', 'tutor'); ?>
            </p>
        </div>
    </div>

    <div class="tutor-mb-32">
        <label class="tutor-form-label"><?php _e('Passing Grade (%)', 'tutor'); ?></label>
        <div class="tutor-input-group">
            <input type="number" class="tutor-form-control" name="quiz_option[passing_grade]" value="<?php echo tutor_utils()->get_quiz_option($quiz_id, 'passing_grade', 80) ?>" size="10" min="0"/>
            <p class="tutor-input-feedback">
                <?php _e('Set the passing percentage for this quiz', 'tutor'); ?>
            </p>
        </div>
    </div>

    <div class="tutor-mb-32">
        <label class="tutor-form-label">
            <?php _e('Max questions allowed to answer', 'tutor'); ?>
        </label>
        <div class="tutor-input-group">
            <input type="number" class="tutor-form-control" name="quiz_option[max_questions_for_answer]" value="<?php echo tutor_utils()->get_quiz_option($quiz_id, 'max_questions_for_answer', 10) ?>" min="1"/>
            <p class="tutor-input-feedback">
                <?php _e('This amount of question will be available for students to answer, and question will comes randomly from all available questions belongs with a quiz, if this amount greater than available question, then all questions will be available for a student to answer.', 'tutor'); ?>
            </p>
        </div>
    </div>

    <?php do_action('tutor_quiz_edit_modal_settings_tab_after_max_allowed_questions', $quiz); ?>

    <div class="tutor-quiz-advance-settings tutor-bg-white tutor-cursor-pointer tutor-mb-32">
        <!-- Header -->
        <div class="tutor-row tutor-align-items-center tutor-quiz-advance-header tutor-g-0">
            <div class="tutor-col">
                <div class="tutor-row tutor-align-items-center">
                    <div class="tutor-col-auto">
                        <span><i class="tutor-icon-settings-filled"></i></span>
                    </div>
                    <div class="tutor-col tutor-p-0 tutor-text-medium-h6 tutor-color-black-70">
                        <?php _e('Advance Settings', 'tutor'); ?>
                    </div>
                </div>
            </div>
            <div class="tutor-col-auto">
                <i class="tutor-icon-angle-down-filled"></i>
            </div>
        </div>

        <!-- Fields -->
        <div class="tutor-quiz-advance-content tutor-p-32">
            <div class="tutor-quiz-advance-settings-fields tutor-row">
                <div class="tutor-col-12 tutor-mb-32">
                    <label class="tutor-form-toggle">
                        <input type="checkbox" class="tutor-form-toggle-input" value="1" name="quiz_option[quiz_auto_start]" <?php checked('1', tutor_utils()->get_quiz_option($quiz_id, 'quiz_auto_start')); ?> />
                        <span class="tutor-form-toggle-control"></span> <?php _e('Quiz Auto Start', 'tutor'); ?>
                    </label>
                    <p class="help">
                        <?php _e('If you enable this option, the quiz will start automatically after the page is loaded.', 'tutor'); ?>
                    </p>
                </div>

                <div class="tutor-col-12 tutor-col-sm-6 tutor-mb-32">
                    <h4><?php _e('Question Layout', 'tutor'); ?></h4>
                    <select class="tutor-form-select" name="quiz_option[question_layout_view]">
                        <option value=""><?php _e('Set question layout view', 'tutor'); ?></option>
                        <option value="single_question" <?php selected('single_question', tutor_utils()->get_quiz_option($quiz_id, 'question_layout_view')); ?>> <?php _e('Single Question', 'tutor'); ?> </option>
                        <option value="question_pagination" <?php selected('question_pagination', tutor_utils()->get_quiz_option($quiz_id, 'question_layout_view')); ?>> <?php _e('Question Pagination', 'tutor'); ?> </option>
                        <option value="question_below_each_other" <?php selected('question_below_each_other', tutor_utils()->get_quiz_option($quiz_id, 'question_layout_view')); ?>> <?php _e('Question below each other', 'tutor'); ?> </option>
                    </select>
                </div>

                <div class="tutor-col-12 tutor-col-sm-6 tutor-mb-32">
                    <h4><?php _e('Questions Order', 'tutor'); ?></h4>
                    <select class="tutor-form-select" name="quiz_option[questions_order]">
                        <option value="rand" <?php selected('rand', tutor_utils()->get_quiz_option($quiz_id, 'questions_order')); ?>> <?php _e('Random', 'tutor'); ?> </option>
                        <option value="sorting" <?php selected('sorting', tutor_utils()->get_quiz_option($quiz_id, 'questions_order')); ?>> <?php _e('Sorting', 'tutor'); ?> </option>
                        <option value="asc" <?php selected('asc', tutor_utils()->get_quiz_option($quiz_id, 'questions_order')); ?>> <?php _e('Ascending', 'tutor'); ?> </option>
                        <option value="desc" <?php selected('desc', tutor_utils()->get_quiz_option($quiz_id, 'questions_order')); ?>> <?php _e('Descending', 'tutor'); ?> </option>
                    </select>
                </div>

                <div class="tutor-col-12 tutor-mb-32">
                    <label class="tutor-form-toggle">
                        <input type="checkbox" class="tutor-form-toggle-input" value="1" name="quiz_option[hide_question_number_overview]" <?php checked('1', tutor_utils()->get_quiz_option($quiz_id, 'hide_question_number_overview')); ?> />
                        <span class="tutor-form-toggle-control"></span> <?php _e('Hide question number', 'tutor'); ?></span>
                    </label>
                    <p class="help"><?php _e('Show/hide question number during attempt.', 'tutor'); ?></p>
                </div>

                <div class="tutor-col-12 tutor-mb-32">
                    <h4><?php _e('Short answer characters limit', 'tutor'); ?></h4>
                    <input style="max-width: 135px;" class="tutor-form-control" type="number" name="quiz_option[short_answer_characters_limit]" value="<?php echo tutor_utils()->get_quiz_option($quiz_id, 'short_answer_characters_limit', 200); ?>" min="0">
                    <p class="help"><?php _e('Student will place answer in short answer question type within this characters limit.', 'tutor'); ?></p>
                </div>

                <div class="tutor-col-12">
                    <h4><?php _e('Open-Ended/Essay questions answer character limit', 'tutor'); ?></h4>
                    <input style="max-width: 135px;" class="tutor-form-control" type="number" name="quiz_option[open_ended_answer_characters_limit]" value="<?php echo tutor_utils()->get_quiz_option($quiz_id, 'open_ended_answer_characters_limit', 500); ?>" min="0">
                    <p class="help"><?php _e('Students will place the answer in the Open-Ended/Essay question type within this character limit.', 'tutor'); ?></p>
                </div>
            </div>
        </div>
    </div>

    <?php do_action('tutor_quiz_edit_modal_settings_tab_after', $quiz); ?>
</div>

