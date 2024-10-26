package com.bpm.workflow.worker;

import java.util.Collections;
import java.util.logging.Logger;
import org.camunda.bpm.client.spring.annotation.ExternalTaskSubscription;
import org.camunda.bpm.client.task.ExternalTask;
import org.camunda.bpm.client.task.ExternalTaskHandler;
import org.camunda.bpm.client.task.ExternalTaskService;
import org.springframework.context.annotation.Configuration;

@Configuration
@ExternalTaskSubscription("REJECT_APPLICATION")
public class ClaimReject implements ExternalTaskHandler {

    private final static Logger LOGGER = Logger.getLogger(ClaimReject.class.getName());

    // Rejected Claim Inform User
    @Override
    public void execute(ExternalTask externalTask, ExternalTaskService externalTaskService) {
        // Get Business Key
        String businessKey = externalTask.getBusinessKey();
        externalTaskService.complete(externalTask, Collections.singletonMap("businessKey", businessKey));
    }
}
