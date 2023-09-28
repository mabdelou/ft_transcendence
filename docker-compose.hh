version: '3'
services:
  frontend:
    build:
      context: ./Frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    volumes:
      - ./Frontend:/usr/src/app
    depends_on:
      - backend
    env_file:
      - ./Frontend/.env.local
    networks:
      - my_net

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "1337:1337"
      - "3030:3030"
      - "1339:1339"
      - "1340:1340"
      - "1341:1341"
      - "1342:1342"
    depends_on:
      - db
    env_file:
      - ./backend/.env
    volumes:
      - ./backend:/usr/src/app
    networks:
      - my_net

  db:
    image: postgres
    restart: always
    # volumes:
    #   - ./data/db:/var/lib/postgresql/data
    ports:
      - 5432:5432
    environment:
      - POSTGRES_DB=testDB
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
    networks:
      - my_net
  adminer:
    image: adminer
    restart: always
    ports:
      - 8080:8080
    networks:
      - my_net
  
networks:
    my_net:
