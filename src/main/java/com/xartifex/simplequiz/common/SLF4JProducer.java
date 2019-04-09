package com.xartifex.simplequiz.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.enterprise.inject.Produces;
import javax.enterprise.inject.spi.InjectionPoint;

public class SLF4JProducer {
    @Produces
    public Logger producer(InjectionPoint ip){
        return LoggerFactory.getLogger(
                ip.getMember().getDeclaringClass().getName());
    }
}