FROM ruby:2.6-alpine

RUN apk update \
    && apk --no-cache --update add build-base nodejs mysql mysql-client mysql-bench mariadb-dev

RUN mkdir /event_point
WORKDIR /event_point

COPY Gemfile /event_point/Gemfile
COPY Gemfile.lock /event_point/Gemfile.lock

RUN bundle install

COPY . /event_point