version: '3.1'

services:
  db:
    image: postgres
    restart: always
    volumes:
      - postgressdb:/var/lib/postgresql/data
    ports:
      - 5432:5432
    environment:
      - POSTGRES_DB=${POSTGRES_DB}
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    networks:
      - my_net
  adminer:
    image: adminer
    restart: always
    ports:
      - 8080:8080
    networks:
      - my_net
  
volumes:
  postgressdb:
networks:
    my_net: