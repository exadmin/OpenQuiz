package com.xartifex.simplequiz.rest;

import com.xartifex.simplequiz.user.UserInfo;
import com.xartifex.simplequiz.user.UserInfoProvider;

public class TestUserInfoProvider implements UserInfoProvider {
    public static final String TEST_USER_NAME = "testname";
    public static final String TEST_USER_EMAIL = "test@email.com";

    public static final UserInfo TEST_USER_INFO =
            new UserInfo(TEST_USER_NAME, TEST_USER_EMAIL);

    @Override
    public UserInfo getUserInfoByEmail(String email) {
        return TEST_USER_INFO;
    }
}
