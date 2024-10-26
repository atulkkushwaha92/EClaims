package com.bpm.workflow.worker;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.logging.Logger;

import org.camunda.bpm.client.spring.annotation.ExternalTaskSubscription;
import org.camunda.bpm.client.task.ExternalTask;
import org.camunda.bpm.client.task.ExternalTaskHandler;
import org.camunda.bpm.client.task.ExternalTaskService;
import org.camunda.bpm.engine.variable.VariableMap;
import org.camunda.bpm.engine.variable.Variables;
import org.springframework.context.annotation.Configuration;

@Configuration
@ExternalTaskSubscription("CLAIM_PRECHECK")
public class ClaimPreCheck implements ExternalTaskHandler {

    private final static Logger LOGGER = Logger.getLogger(ClaimPreCheck.class.getName());

    // Logic to check if Policy is Valid & Any existing claims is not raised already
    @Override
    public void execute(ExternalTask externalTask, ExternalTaskService externalTaskService) {
        // Get Business Key
        String businessKey = externalTask.getBusinessKey();

        // Get Input Variables
        String policyNo = externalTask.getVariable("PolicyNo");
        String customerName = externalTask.getVariable("CustomerName");
        String policyEndDate = externalTask.getVariable("PolicyEndDate");
        boolean validcase = false;
        Map<String, Object> result = new HashMap<>();
        VariableMap variables = Variables.createVariables();
        if (null != policyNo && null != policyEndDate) {
            result = Map.of("businessKey", businessKey, "PolicyNo", policyNo, "CustomerName",
                    customerName, "PolicyEndDate", policyEndDate, "policy_valid", true);
        } else {
            result.put("policy_valid", false);
        }
        variables.putAll(result);
        // Complete the task
        externalTaskService.complete(externalTask, result);
    }

    public boolean checkifPolicyEndateisValid(String policyEndDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd", Locale.ENGLISH);
        LocalDate date1 = LocalDate.parse(policyEndDate, formatter);
        LocalDate date2 = LocalDate.now();
        if (!date1.isAfter(date2)) {
            return false;
        }
        return true;
    }

}
