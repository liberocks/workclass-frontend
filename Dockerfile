# base image
FROM node:16

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

EXPOSE 9000

CMD ["yarn", "serve"]

