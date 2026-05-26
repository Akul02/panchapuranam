package com.akulprojects.firstproj.features.enrolments;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.akulprojects.firstproj.apidto.ApiResponses.SuccessResponse;
import com.akulprojects.firstproj.features.enrolments.EnrolmentsDtos.StudentProgramEnrolmentDto;

import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("enrolment")
public class EnrolmentsController {
    private final EnrolmentsService enrolmentsService;

    public EnrolmentsController (EnrolmentsService enrolmentsService) {
        this.enrolmentsService = enrolmentsService;
    }

    @PostMapping("/enrol-student")
    public SuccessResponse enrolStudent(@RequestBody StudentProgramEnrolmentDto enrolInfo, @CookieValue(name = "AUTH_TOKEN", required = false) String authCookie) {

        return enrolmentsService.enrolStudent(authCookie, enrolInfo.programNames(), enrolInfo.studentId());
    }
    

}
