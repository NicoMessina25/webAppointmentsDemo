FROM node as build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ARG REACT_APP_MEDERE_ADDRESS
ENV REACT_APP_MEDERE_ADDRESS=${REACT_APP_MEDERE_ADDRESS}
RUN npm run build

FROM nginx
COPY --from=build /app/build /usr/share/nginx/html
