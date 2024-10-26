package com.bpm.workflow.assignment;

import org.camunda.bpm.engine.delegate.DelegateTask;
import org.camunda.bpm.engine.delegate.TaskListener;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class SurevyorAssignmentHandler implements TaskListener {

    private static final Logger logger = LoggerFactory.getLogger(SurevyorAssignmentHandler.class);

    @Override
    public void notify(DelegateTask delegateTask) {
        // Retrieve the group ID
        String groupId = "Surveyor";
        String userId = "Surveyor1";
        // Assign the task to the group
        logger.info("Assigning task '{}' to group '{}'", delegateTask.getName(), groupId);
        delegateTask.addCandidateUser(userId);
        delegateTask.addCandidateGroup(groupId);
        delegateTask.setAssignee(userId);
    }
}