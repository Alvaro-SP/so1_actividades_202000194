## BUILD
# docker build -t mifrontend:0.1.0 .
## RUN
# docker run -d -p 3000:3000 mifrontend:0.1.0
FROM node:18.14.0-buster-slim

LABEL developer="jesus guzman" \
      email="susguzman@gmail.com"

# Copy app
COPY . /opt/app

WORKDIR /opt/app

# Npm install
RUN npm install

RUN npm run build

RUN npm install -g serve

# Container Startup
CMD ["serve", "-s", "build"]