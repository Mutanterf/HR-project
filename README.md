# HR Project with Docker and PostgreSQL

## Установка и запуск
1. Установите Docker и Docker Compose.
2. Клонируйте репозиторий:
   git clone https://github.com/Mutanterf/HR-Project.git
   cd HR-Project
3. 
docker-compose down -v для того чтобы остановить и удалить старые контейнеры и volume
docker-compose build  чтобы собрать образы
docker-compose up  чтобы запустить проект
4.
docker exec -it hr-project-db-1 psql -U postgres -d HR 
5.
\dt для просмотра всех таблиц
select * from countries;
