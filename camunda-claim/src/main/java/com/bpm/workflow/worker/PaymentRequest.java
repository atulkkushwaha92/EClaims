package com.bpm.workflow.worker;

import java.util.Collections;
import java.util.logging.Logger;

import org.camunda.bpm.client.spring.annotation.ExternalTaskSubscription;
import org.camunda.bpm.client.task.ExternalTask;
import org.camunda.bpm.client.task.ExternalTaskHandler;
import org.camunda.bpm.client.task.ExternalTaskService;
import org.springframework.context.annotation.Configuration;

@Configuration
@ExternalTaskSubscription("PAYMENT_REQUEST_EMAIL")
public class PaymentRequest implements ExternalTaskHandler {

    private final static Logger LOGGER = Logger.getLogger(PaymentRequest.class.getName());

    @Override
    public void execute(ExternalTask externalTask, ExternalTaskService externalTaskService) {
        // Get a process variable
        String businessKey = externalTask.getBusinessKey();
        // Perform Business Logic
        // Complete the task
        externalTaskService.complete(externalTask, Collections.singletonMap("businessKey", businessKey));
    }

}
