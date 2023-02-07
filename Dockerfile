FROM node as build
WORKDIR /app

# Instalar Git
RUN apt-get update && apt-get install -y git

# Configurar credenciales de Git
# ENV GIT_USERNAME=user
# ENV GIT_PASSWORD=password

# Clonar el repositorio usando HTTPS
#RUN git clone https://$GIT_USERNAME:$GIT_PASSWORD@gitlab.advenio.com.ar/advenio/medere/webappointmentsreact.git repo

# Descargar el repositorio
RUN git clone https://tadeorimoli:6JHz1HsU9rXmqyPdeBtn@gitlab.advenio.com.ar/advenio/medere/webappointmentsreact.git repo

WORKDIR /app/repo

# Hacer un git pull para actualizar el código
RUN git pull

RUN npm install
COPY . .
ARG REACT_APP_MEDERE_ADDRESS
ENV REACT_APP_MEDERE_ADDRESS=${REACT_APP_MEDERE_ADDRESS}
RUN npm run build

FROM nginx
COPY --from=build /app/repo/build /usr/share/nginx/html
