# base image
FROM node:14

# set working directory
RUN mkdir /app
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies using yarn
ADD package.json yarn.lock /app/
RUN yarn --pure-lockfile

# Copy all frontend stuff to new "app" folder
COPY . /app/

RUN yarn clean
RUN yarn build

EXPOSE 1234

RUN chmod +x /app/script/entrypoint.sh
ENTRYPOINT ["/bin/sh", "/app/script/entrypoint.sh"]

CMD ["yarn", "serve", "-p", "1234", "-H", "0.0.0.0"]

